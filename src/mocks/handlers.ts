import { http, HttpResponse } from "msw";
import {
  AUTH_ERROR,
  ACTIVITY_ERROR,
  USER_ERROR,
  POST_ERROR,
  COMMON_ERROR,
} from "@/shared/consts/errorCodes";

const BASE = import.meta.env.VITE_SERVER_API_URL;
const url = (path: string) => `${BASE}${path}`;

const err = (code: string, message: string, status: number) =>
  HttpResponse.json(
    { isSuccess: false, code, message, data: null },
    { status },
  );

/** 정상 동작 (mock 없음 — 실제 서버로 패스) */
export const scenarioNone: never[] = [];

/** 인증 에러 시나리오 */
export const scenarioAuth = {
  /** 만료된 토큰 => 인터셉터의 refresh 로직 동작 확인 */
  expired: http.get(url("/api/v1/*"), () =>
    err(AUTH_ERROR.EXPIRED, "만료된 토큰입니다.", 401),
  ),

  /** refresh 토큰 불일치 => 즉시 로그아웃 확인 */
  refreshMismatch: http.post(url("/api/v1/auth/refresh"), () =>
    err(AUTH_ERROR.REFRESH_MISMATCH, "리프레시 토큰이 일치하지 않습니다.", 401),
  ),

  /** 탈퇴 회원 접근 => 즉시 로그아웃 확인 */
  withdrawn: http.get(url("/api/v1/*"), () =>
    err(AUTH_ERROR.WITHDRAWN, "탈퇴한 회원입니다.", 403),
  ),

  /** 카카오 토큰 오류 */
  kakaoToken: http.get(url("/api/v1/*"), () =>
    err(AUTH_ERROR.KAKAO_TOKEN, "유효하지 않은 카카오 액세스 토큰입니다.", 401),
  ),
};

/** 북마크 에러 시나리오 */
export const scenarioBookmark = {
  /** 북마크 추가 => 이미 북마크한 게시글 */
  alreadyBookmarked: http.post(url("/api/v1/activities/bookmarks"), () =>
    err(ACTIVITY_ERROR.ALREADY_BOOKMARKED, "이미 북마크한 게시글입니다.", 409),
  ),

  /** 북마크 삭제 => 북마크를 찾을 수 없음 */
  bookmarkNotFound: http.delete(url("/api/v1/activities/bookmarks"), () =>
    err(ACTIVITY_ERROR.BOOKMARK_NOT_FOUND, "북마크를 찾을 수 없습니다.", 404),
  ),
};

/** 게시글 에러 시나리오 */
export const scenarioPost = {
  /** 게시글 조회 => 찾을 수 없음 */
  notFound: http.get(url("/api/v2/posts/*"), () =>
    err(POST_ERROR.NOT_FOUND, "게시글을 찾을 수 없습니다.", 404),
  ),
};

/** 유저 에러 시나리오 */
export const scenarioUser = {
  /** 관심사 수정 => 유효하지 않은 키워드 */
  invalidInterest: http.put(url("/api/v1/users/me/interests"), () =>
    err(USER_ERROR.INVALID_INTEREST, "유효하지 않은 관심사 키워드입니다.", 400),
  ),

  /** 회원 탈퇴 => 이미 탈퇴한 회원 */
  alreadyWithdrawn: http.patch(url("/api/v1/users/me/withdrawal"), () =>
    err(USER_ERROR.ALREADY_WITHDRAWN, "이미 탈퇴한 회원입니다.", 400),
  ),

  /** 사용자 프로필 => 찾을 수 없음 */
  notFound: http.get(url("/api/v1/users/me/profile"), () =>
    err(USER_ERROR.NOT_FOUND, "사용자를 찾을 수 없습니다.", 404),
  ),
};

/** 공통 에러 시나리오 */
export const scenarioCommon = {
  /** 서버 에러 */
  internalServer: http.get(url("/api/*"), () =>
    err(
      COMMON_ERROR.INTERNAL_SERVER,
      "서버 에러, 관리자에게 문의 바랍니다.",
      500,
    ),
  ),

  /** 서비스 점검 */
  serviceUnavailable: http.get(url("/api/*"), () =>
    err(
      COMMON_ERROR.SERVICE_UNAVAILABLE,
      "서버가 일시적으로 사용중지 되었습니다.",
      503,
    ),
  ),
};

/** 네트워크 에러 시나리오 */
export const scenarioNetwork = {
  /** 연결 끊김 — axios에서 ERR_NETWORK로 잡힘 */
  offline: http.all(url("/api/*"), () => HttpResponse.error()),

  /** 특정 엔드포인트만 끊김 — 북마크 API만 네트워크 에러 */
  bookmarkOffline: http.post(url("/api/v1/activities/bookmarks"), () =>
    HttpResponse.error(),
  ),
};

export const handlers = [
  // 인증
  // scenarioAuth.refreshMismatch,   // 401: refresh 불일치 => 즉시 로그아웃 확인
  // scenarioAuth.withdrawn, // 403: 탈퇴 회원 => 즉시 로그아웃 확인
  // 북마크
  // scenarioBookmark.alreadyBookmarked, // 409: 중복 북마크
  // scenarioBookmark.bookmarkNotFound,  // 404: 북마크 없음
  // 유저
  // scenarioUser.invalidInterest,   // 400: 유효하지 않은 관심사
  // scenarioUser.alreadyWithdrawn, // 400: 이미 탈퇴한 회원
  // 공통
  // scenarioCommon.internalServer,       // 500: 서버 에러
  // scenarioCommon.serviceUnavailable,   // 503: 서비스 점검
  // 네트워크
  // scenarioNetwork.offline, // 연결 끊김 (ERR_NETWORK)
  // scenarioNetwork.bookmarkOffline,// 북마크 API만 연결 끊김
];
