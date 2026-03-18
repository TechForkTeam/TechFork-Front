export type PostParamsDto = {
  sortBy: string;
  lastViewCount: number;
  lastPublishedAt?: string;
  lastPostId?: number;
  size: number;
};

export type PostResponseDto = {
  data: PostListResponse;
  code: string;
  isSuccess: boolean;
  message: string;
};

type PostListResponse = {
  hasNext: boolean;
  lastPostId: number;
  lastPublishedAt: string;
  lastViewCount: number;
  posts: CardItemProps[];
};

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
  shortSummary: string;
};

export type PageParamType = {
  lastPublishedAt?: string;
  lastPostId?: number;
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

export type PostBookmarkResponseDto = {
  data: PostListBookmarkResponse;
  code: string;
  isSuccess: boolean;
  message: string;
};

export type ReadPostType = {
  postId: number;
  readAt: string;
  readDurationSeconds: number;
};

export interface ActivityPostResponseDTO {
  readPost: number;
  postId: number;
  title: string;
  shortSummary: string;
  url: string;
  companyName: string;
  logoUrl: string;
  thumbnailUrl: string;
  publishedAt: string;
  viewCount: number;
  keywords?: string[];
  isBookmarked: boolean;
  readAt?: string;
}
