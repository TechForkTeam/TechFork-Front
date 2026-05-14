import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ActivityPostType, ReadPostType } from "./activity.types";
import api from "./api";
import { SHARED_QUERY_KEY } from "../consts/queryKeys";
import { updateBookmarkState } from "../lib/updateBookmarkState";
import { API_ENDPOINTS, getActivityPostsEndpoint } from "../consts/endpoints";
import { BOOKMARK_ERROR, POST_ERROR } from "@/shared/consts/errorCodes";
import { toast } from "react-toastify";

export type { ActivityPostType };

export const postBookmark = async (postId: number) => {
  const { data } = await api.post(API_ENDPOINTS.activities.bookmarks, {
    postId,
  });
  return data;
};

export const usePostBookmark = () => {
  const queryClient = useQueryClient();
  const postsQueryKey = [SHARED_QUERY_KEY.POSTS] as const;

  return useMutation<
    unknown,
    AxiosError<{ code: string; message: string }>,
    number,
    { previousQueries: [QueryKey, unknown][] }
  >({
    mutationFn: (postId: number) => postBookmark(postId),
    onMutate: async postId => {
      await queryClient.cancelQueries({ queryKey: postsQueryKey });

      const previousQueries = queryClient.getQueriesData({
        queryKey: postsQueryKey,
      });

      queryClient.setQueriesData(
        { queryKey: postsQueryKey, exact: false },
        (old: any) => updateBookmarkState(old, postId, true),
      );

      return { previousQueries };
    },
    onError: (e, _, context) => {
      const code = e?.response?.data?.code;
      if (
        code === BOOKMARK_ERROR.ALREADY_BOOKMARKED ||
        code === POST_ERROR.NOT_FOUND
      ) {
        toast.error(e.response?.data.message);
      }
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
    },
  });
};

export const deleteBookmark = async (postId: number) => {
  const { data } = await api.delete(API_ENDPOINTS.activities.bookmarks, {
    data: { postId },
  });
  return data;
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();
  const postsQueryKey = [SHARED_QUERY_KEY.POSTS] as const;

  return useMutation<
    unknown,
    AxiosError<{ code: string; message: string }>,
    number,
    { previousQueries: [QueryKey, unknown][] }
  >({
    mutationFn: (postId: number) => deleteBookmark(postId),
    onMutate: async postId => {
      await queryClient.cancelQueries({ queryKey: postsQueryKey });

      const previousQueries = queryClient.getQueriesData({
        queryKey: postsQueryKey,
      });
      queryClient.setQueriesData(
        { queryKey: postsQueryKey, exact: false },
        (old: any) => updateBookmarkState(old, postId, false),
      );

      return { previousQueries };
    },
    onError: (e, _, context) => {
      const code = e?.response?.data?.code;
      if (
        code === BOOKMARK_ERROR.BOOKMARK_NOT_FOUND ||
        code === POST_ERROR.NOT_FOUND
      ) {
        toast.error(e.response?.data.message);
      }
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
    },
  });
};

export type UseInfiniteActivityPostsParams = {
  lastBookmarkId?: number;
  lastReadPostId?: number;
  size: number;
};

export const getActivityPostList = async (
  type: ActivityPostType,
  { pageParam, size }: { pageParam?: number; size: number },
) => {
  const params = {
    size,
    ...(pageParam !== undefined && {
      [type === "bookmark" ? "lastBookmarkId" : "lastReadPostId"]: pageParam,
    }),
  };

  const { data } = await api.get(getActivityPostsEndpoint(type), { params });
  return data;
};

export const postReadPosts = async (body: ReadPostType) => {
  const { data } = await api.post(API_ENDPOINTS.activities.readPosts, body);
  return data;
};

export const usePostReadPost = () => {
  const queryClient = useQueryClient();
  const postsQueryKey = [SHARED_QUERY_KEY.POSTS] as const;

  return useMutation<
    unknown,
    AxiosError<{ code: string; message: string }>,
    ReadPostType
  >({
    mutationFn: (body: ReadPostType) => postReadPosts(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
    },
    onError: e => {
      const code = e?.response?.data?.code;
      if (code === POST_ERROR.NOT_FOUND) {
        toast.error(e.response?.data.message);
      }
    },
  });
};
