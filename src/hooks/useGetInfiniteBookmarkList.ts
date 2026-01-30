//북마크 리스트 무한스크롤
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getBookmarkList } from "../lib/activity";

export const useInfiniteBookmarkPosts = (size = 20) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["posts", "bookmarks"],
    queryFn: ({ pageParam }) =>
      getBookmarkList({
        lastBookmarkId: pageParam,
        size,
      }),
    initialPageParam: undefined,
    getNextPageParam: lastPage => {
      if (!lastPage.data.hasNext) return undefined;
      return lastPage.data.lastBookmarkId;
    },
    select: res => res.pages,
  });
};
