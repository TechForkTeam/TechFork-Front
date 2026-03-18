// 최근 게시글 , 인기있는 게시글

import api from "@/shared/api/api";
import { API_ENDPOINTS } from "@/shared/consts/endpoints";
import type { PostResponseDto } from "@/features/home/api/post.types";

export interface GetPostListParams {
  sortBy: "LATEST" | "POPULAR";
  size?: number;
  lastPublishedAt?: string;
  lastPostId?: number;
  lastViewCount?: number;
}
export const getPostList = async (
  params: GetPostListParams,
): Promise<PostResponseDto> => {
  const res = await api.get(API_ENDPOINTS.posts.recent, {
    params,
  });

  return res.data;
};

//기업별 게시글 조회

export interface GetCompaniesPostListParams {
  companies?: string[];
  size?: number;
  lastPublishedAt?: string;
  lastPostId?: number;
}
export const getCompaniesPostList = async (
  params: GetCompaniesPostListParams,
): Promise<PostResponseDto> => {
  const res = await api.get(API_ENDPOINTS.posts.byCompany, {
    params,
  });

  return res.data;
};
