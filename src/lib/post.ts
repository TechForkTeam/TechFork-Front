// 최근 게시글 , 인기있는 게시글

import type { PostResponseDto } from "../types/post";
import api from "./api";

export interface GetPostListParams {
  sortBy: "LATEST" | "POPULAR";
  size?: number;
  lastPublishedAt?: string;
  lastPostId?: number;
}
export const getPostList = async (
  params: GetPostListParams,
): Promise<PostResponseDto> => {
  const res = await api.get("/api/v2/posts/recent", {
    params,
  });

  return res.data;
};
