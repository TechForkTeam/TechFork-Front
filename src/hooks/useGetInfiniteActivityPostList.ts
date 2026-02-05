import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getActivityPostList, type ActivityPostType } from "../lib/activity";

export const useInfiniteActivityPosts = (type: ActivityPostType, size = 20) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["posts", "activity", type],

    queryFn: ({ pageParam }) =>
      getActivityPostList(type, {
        pageParam,
        size,
      }),

    initialPageParam: undefined,

    getNextPageParam: lastPage => {
      if (!lastPage.data.hasNext) return undefined;

      return type === "bookmark"
        ? lastPage.data.lastBookmarkId
        : lastPage.data.lastReadPostId;
    },

    select: res => res.pages,
    gcTime: 1000 * 60 * 5,
  });
};
