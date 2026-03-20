import { getPostList } from "../api/post";
import type { PageParamType, PostResponseDto } from "../api/post.types";
import { QUERY_CACHE_TIME } from "@/shared/consts/cacheTimes";
import {
  useSuspenseInfiniteQuery,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { SHARED_QUERY_KEY } from "@/shared/consts/queryKeys";

interface UseInfinitePostsParams {
  sortBy: "LATEST" | "POPULAR";
  size?: number;
}

//인기순, 최근생성된 게시글
export const useInfinitePosts = ({
  sortBy,
  size = 20,
}: UseInfinitePostsParams) => {
  return useSuspenseInfiniteQuery<
    PostResponseDto,
    Error,
    PostResponseDto[],
    readonly [typeof SHARED_QUERY_KEY.POSTS, "LATEST" | "POPULAR"],
    PageParamType
  >({
    queryKey: [SHARED_QUERY_KEY.POSTS, sortBy] as const,
    queryFn: ({
      pageParam,
    }: QueryFunctionContext<
      readonly [typeof SHARED_QUERY_KEY.POSTS, "LATEST" | "POPULAR"],
      PageParamType
    >) =>
      getPostList({
        sortBy,
        size,
        ...pageParam,
      }),

    initialPageParam: {},

    getNextPageParam: lastPage => {
      if (!lastPage.data?.hasNext) return undefined;
      if (sortBy === "POPULAR") {
        return {
          lastViewCount: lastPage.data.lastViewCount,
          lastPostId: lastPage.data.lastPostId,
        };
      }

      return {
        lastPublishedAt: lastPage.data.lastPublishedAt,
        lastPostId: lastPage.data.lastPostId,
      };
    },

    select: res => res.pages,
    staleTime: QUERY_CACHE_TIME.POSTS.staleTime,
    gcTime: QUERY_CACHE_TIME.POSTS.gcTime,
  });
};
