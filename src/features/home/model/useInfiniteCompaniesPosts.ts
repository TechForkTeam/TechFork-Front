import { SHARED_QUERY_KEY } from "@/shared/consts/queryKeys";
import { getCompaniesPostList } from "../api/post";
import { HOME_QUERY_KEY } from "../consts/queryKeys";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

interface UseInfiniteCompaniesPostsParams {
  companies: string[];
  size?: number;
}

export const useInfiniteCompaniesPosts = ({
  companies,
  size = 20,
}: UseInfiniteCompaniesPostsParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: [
      SHARED_QUERY_KEY.POSTS,
      HOME_QUERY_KEY.POSTS_BY_COMPANY,
      companies,
    ] as const,
    queryFn: ({ pageParam }) =>
      getCompaniesPostList({
        companies,
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
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
