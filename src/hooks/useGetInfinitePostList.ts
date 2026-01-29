// src/hooks/useInfinitePosts.ts
import {
  useSuspenseInfiniteQuery,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import type { PageParamType, PostResponseDto } from "../types/post";
import { getPostList } from "../lib/post";

interface UseInfinitePostsParams {
  sortBy: "LATEST" | "POPULAR";
  size?: number;
}

export const useInfinitePosts = ({
  sortBy,
  size = 20,
}: UseInfinitePostsParams) => {
  return useSuspenseInfiniteQuery<
    PostResponseDto, // queryFn return
    Error, // error
    PostResponseDto[], // select result
    ["posts", typeof sortBy], // queryKey
    PageParamType
  >({
    queryKey: ["posts", sortBy],
    queryFn: ({
      pageParam,
    }: QueryFunctionContext<["posts", typeof sortBy], PageParamType>) =>
      getPostList({
        sortBy,
        size,
        ...pageParam,
      }),

    initialPageParam: {},

    getNextPageParam: lastPage => {
      if (!lastPage.data?.hasNext) return undefined;

      return {
        lastPublishedAt: lastPage.data.lastPublishedAt,
        lastPostId: lastPage.data.lastPostId,
      };
    },

    select: res => res.pages,
  });
};
