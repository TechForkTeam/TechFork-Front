import {
  getActivityPostList,
  type ActivityPostType,
} from "@/shared/api/activity";
import { QUERY_CACHE_TIME } from "@/shared/consts/cacheTimes";
import { MYPAGE_QUERY_KEY } from "../consts/queryKeys";
import { SHARED_QUERY_KEY } from "@/shared/consts/queryKeys";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteActivityPosts = (type: ActivityPostType, size = 20) => {
  return useSuspenseInfiniteQuery({
    queryKey: [
      SHARED_QUERY_KEY.POSTS,
      MYPAGE_QUERY_KEY.POSTS_ACTIVITY,
      type,
    ] as const,

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
    staleTime: QUERY_CACHE_TIME.POSTS.staleTime,
    gcTime: QUERY_CACHE_TIME.POSTS.gcTime,
  });
};
