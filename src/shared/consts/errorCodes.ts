// 공통 error

export const COMMON_ERROR = {
  INTERNAL_SERVER: "COMMON500",
  SERVICE_UNAVAILABLE: "COMMON503",
} as const;

export const AUTH_ERROR = {
  EXPIRED: "AUTH401_EXPIRED",
  REFRESH_MISMATCH: "AUTH401_REFRESH_MISMATCH",
  KAKAO_TOKEN: "AUTH401_KAKAO_TOKEN",
  WITHDRAWN: "AUTH403_WITHDRAWN",
} as const;

export const USER_ERROR = {
  INVALID_INTEREST: "USER400_1",
  ALREADY_WITHDRAWN: "USER400_2",
  NOT_FOUND: "USER404_1",
} as const;

export const BOOKMARK_ERROR = {
  BOOKMARK_NOT_FOUND: "BOOKMARK404_1",
  ALREADY_BOOKMARKED: "BOOKMARK409_1",
} as const;

export const POST_ERROR = {
  NOT_FOUND: "POST404_1",
} as const;

export const READPOST_ERROR = {
  READ_POST: "READ_POST500_1",
} as const;

export type CommonErrorCode = (typeof COMMON_ERROR)[keyof typeof COMMON_ERROR];
export type AuthErrorCode = (typeof AUTH_ERROR)[keyof typeof AUTH_ERROR];
export type UserErrorCode = (typeof USER_ERROR)[keyof typeof USER_ERROR];
export type BookmarkErrorCode =
  (typeof BOOKMARK_ERROR)[keyof typeof BOOKMARK_ERROR];
export type PostErrorCode = (typeof POST_ERROR)[keyof typeof POST_ERROR];
export type ReadPostErrorCode =
  (typeof READPOST_ERROR)[keyof typeof READPOST_ERROR];

export type ErrorCode =
  | CommonErrorCode
  | AuthErrorCode
  | UserErrorCode
  | BookmarkErrorCode
  | PostErrorCode
  | ReadPostErrorCode;
