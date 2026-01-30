// 페이지 게시글 응답 DTO
export type PostParamsDto = {
  sortBy: string;
  lastViewCount: number;
  lastPublishedAt?: string;
  lastPostId?: number;
  size: number;
};

//페이지 단위 무한스클롤 응답
export type PostResponseDto = {
  data: PostListResponse;
  code: string;
  isSuccess: boolean;
  message: string;
};

//페이지 내부 게시글 응답 리스트 타입
type PostListResponse = {
  hasNext: boolean;
  lastPostId: number;
  lastPublishedAt: string;
  lastViewCount: number;
  posts: CardItemProps[];
};

//card Item
export type CardItemProps = {
  id?: number;
  title: string;
  company: string;
  url?: string;
  logoUrl: string;
  thumbnailUrl: string;
  publishedAt?: string;
  isBookmarked: boolean;
  viewCount: number;
  keywords?: string[];
  postId?: number;
};

export type PageParamType = {
  lastPublishedAt?: string;
  lastPostId?: number;
};

// 북마크
export type UseInfiniteBookmarkPostsParams = {
  lastBookmarkId?: number;
  size: number;
};

export type PostListBookmarkResponse = {
  bookmarkId: number;
  postId: number;
  title: string;
  url: string;
  companyName: string;
  logoUrl: string;
  publishedAt: string;
};

//북마크 단위
export type PostBookmarkResponseDto = {
  data: PostListBookmarkResponse;
  code: string;
  isSuccess: boolean;
  message: string;
};
