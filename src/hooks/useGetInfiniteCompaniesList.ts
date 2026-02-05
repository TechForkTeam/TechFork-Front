import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getCompaniesPostList } from "../lib/post";

interface UseInfiniteCompaniesPostsParams {
  companies: string[];
  size?: number;
}

export const useInfiniteCompaniesPosts = ({
  companies,
  size = 20,
}: UseInfiniteCompaniesPostsParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["posts", "companies", companies],
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
