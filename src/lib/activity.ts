//사용자 활동 api

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import type { UseInfiniteBookmarkPostsParams } from "../types/post";

//1. 북마크 추가
export const postBookmark = async (postId: number) => {
  const { data } = await api.post("/api/v1/activities/bookmarks", { postId });
  return data;
};

export const usePostBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => postBookmark(postId),
    onSuccess: async () => {
      console.log("북마크성공");
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: err => console.log(err),
  });
};

//1. 북마크 제거
export const deleteBookmark = async (postId: number) => {
  const { data } = await api.delete("/api/v1/activities/bookmarks", {
    data: { postId },
  });
  return data;
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) => deleteBookmark(postId),
    onSuccess: () => {
      console.log("북마크 삭제");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: err => console.log(err),
  });
};

//북마크 목록 조회
export const getBookmarkList = async (
  params: UseInfiniteBookmarkPostsParams,
) => {
  const { data } = await api.get("/api/v1/activities/bookmarks", { params });
  return data;
};
