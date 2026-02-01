import { useEffect, useRef, useState } from "react";
import { MYPAGE_TAP } from "../../constants/tab";
import { TabSelectList } from "../home/components/TabSelectList";
import { CardItem } from "../../shared/CardItem";
import { useInfiniteBookmarkPosts } from "../../hooks/useGetInfiniteBookmarkList";

// mypage 관심사 list
export const MyIntersListPage = () => {
  const [selectedTab, setSelected] = useState(0);
  const infiniteRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteBookmarkPosts();

  useEffect(() => {
    if (!infiniteRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(infiniteRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const posts = data?.flatMap(page => page.data.bookmarks) ?? [];

  console.log(posts);

  return (
    <div className="py-12">
      <TabSelectList
        className="mb-20"
        onChange={setSelected}
        selected={selectedTab}
        tagList={MYPAGE_TAP}
      />
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
        {posts.map(item => {
          return (
            <CardItem
              company={item.companyName}
              key={item.bookmarkId}
              logoUrl={item.logoUrl}
              viewCount={item.viewCount}
              title={item.title}
              thumbnailUrl={item.thumbnailUrl}
              url={item.url}
              id={item.postId}
              isBookmarked={item.isBookmarked}
              publishedAt={item.publishedAt}
              shortSummary={item.shortSummary}
            />
          );
        })}
      </ul>
      <div ref={infiniteRef} className="h-10 w-full" />
    </div>
  );
};
