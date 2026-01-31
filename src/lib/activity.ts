//사용자 활동 api

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import type {
  ReadPostType,
  UseInfiniteBookmarkPostsParams,
} from "../types/post";
import { updateBookmarkState } from "../utils/queryUpdata";

//1. 북마크 추가
export const postBookmark = async (postId: number) => {
  const { data } = await api.post("/api/v1/activities/bookmarks", { postId });
  return data;
};

export const usePostBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => postBookmark(postId),
    onMutate: async postId => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // ["posts"]로 시작하는 모든 쿼리(무한스크롤, 추천 등)를 업데이트
      queryClient.setQueriesData({ queryKey: ["posts"] }, old =>
        updateBookmarkState(old, postId, true),
      );
    },
    onError: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
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
    onMutate: async postId => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      queryClient.setQueriesData({ queryKey: ["posts"] }, old =>
        updateBookmarkState(old, postId, false),
      );
    },
    onError: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
};
//북마크 목록 조회
export const getBookmarkList = async (
  params: UseInfiniteBookmarkPostsParams,
) => {
  const { data } = await api.get("/api/v1/activities/bookmarks", { params });
  return data;
};

//읽은 게시글 저장

export const postReadPosts = async (body: ReadPostType) => {
  const { data } = await api.post("/api/v1/activities/read-posts", body);
  return data;
};

export const usePostReadPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ReadPostType) => postReadPosts(body),
    onSuccess: () => {
      console.log("읽은 게시글 저장");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: err => console.log(err),
  });
};
