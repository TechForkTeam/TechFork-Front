//사용자 활동 api

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import type { ReadPostType } from "../types/post";
import { updateBookmarkState } from "../utils/queryUpdata";

//무한스크롤
export type ActivityPostType = "bookmark" | "read";

// 북마크 추가
export const postBookmark = async (postId: number) => {
  const { data } = await api.post("/api/v1/activities/bookmarks", { postId });
  return data;
};

export const usePostBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => postBookmark(postId),
    onMutate: async postId => {
      //post로 시작하는 query모두 취소
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      //복구위한 데이터 백업
      const previousQueries = queryClient.getQueriesData({
        queryKey: ["posts"],
      });

      queryClient.setQueriesData(
        { queryKey: ["posts"], exact: false },
        (old: any) => updateBookmarkState(old, postId, true),
      );

      return { previousQueries };
    },
    onError: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
};

//북마크 제거
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

      const previousQueries = queryClient.getQueriesData({
        queryKey: ["posts"],
      });
      queryClient.setQueriesData(
        { queryKey: ["posts"], exact: false },
        (old: any) => updateBookmarkState(old, postId, false),
      );

      return { previousQueries };
    },
    onError: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
};

export type UseInfiniteActivityPostsParams = {
  lastBookmarkId?: number;
  lastReadPostId?: number;
  size: number;
};

//읽은게시글 + 북마크 목록 통합
export const getActivityPostList = async (
  type: ActivityPostType,
  { pageParam, size }: { pageParam?: number; size: number },
) => {
  const url =
    type === "bookmark"
      ? "/api/v1/activities/bookmarks"
      : "/api/v1/activities/read-posts";

  const params = {
    size,
    ...(pageParam !== undefined && {
      [type === "bookmark" ? "lastBookmarkId" : "lastReadPostId"]: pageParam,
    }),
  };
  const { data } = await api.get(url, { params });
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
        queryKey: ["posts", "read"],
      });
    },
    onError: err => console.log(err),
  });
};
