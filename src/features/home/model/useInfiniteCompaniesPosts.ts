import { getCompaniesPostList } from "@/features/home/api/post";
import { HOME_QUERY_KEY } from "@/features/home/consts/queryKeys";
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
      HOME_QUERY_KEY.POSTS,
      HOME_QUERY_KEY.POSTS_COMPANIES,
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
