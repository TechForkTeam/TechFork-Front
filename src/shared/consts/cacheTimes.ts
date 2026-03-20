export const MINUTE = 1000 * 60;
export const HOUR = MINUTE * 60;

export const QUERY_CACHE_TIME = {
  POSTS: {
    //최근 생성된 게시글,인기 게시글,기업별 필터링 게시글,추천 게시글,검색어 기반 게시글
    staleTime: MINUTE * 10,
    gcTime: MINUTE * 30,
  },
  COMPANIES: {
    staleTime: MINUTE * 30,
    gcTime: HOUR,
  },
  MY_PROFILE: {
    staleTime: MINUTE * 5,
    gcTime: MINUTE * 30,
  },
  MY_INTEREST: {
    staleTime: MINUTE * 10,
    gcTime: MINUTE * 30,
  },
} as const;
