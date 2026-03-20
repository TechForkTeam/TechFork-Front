import { getPostList } from "../api/post";
import type { PageParamType, PostResponseDto } from "../api/post.types";
import {
  useSuspenseInfiniteQuery,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { SHARED_QUERY_KEY } from "@/shared/consts/queryKeys";

interface UseInfinitePostsParams {
  sortBy: "LATEST" | "POPULAR";
  size?: number;
}

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
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
