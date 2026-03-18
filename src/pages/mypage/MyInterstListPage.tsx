import { MYPAGE_TAP } from "@/features/home";
import { useInfiniteActivityPosts } from "@/features/mypage";
import { CardItem } from "@/shared/ui/CardItem";
import { Loading } from "@/shared/ui/Loading";
import { TabSelectList } from "@/shared/ui/TabSelectList";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

// mypage 관심사 list
const MyIntersListPage = () => {
  const [selectedTab, setSelected] = useState(0);
  const infiniteRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteActivityPosts(selectedTab === 1 ? "read" : "bookmark", 20);

  useEffect(() => {
    if (!infiniteRef.current || !hasNextPage || isFetchingNextPage) return;
    if (!infiniteRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(infiniteRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const posts =
    data?.flatMap(page => {
      if (selectedTab === 1 && page.data.readPosts) {
        return page.data.readPosts;
      }
      if (selectedTab === 0 && page.data.bookmarks) {
        return page.data.bookmarks;
      }
      return [];
    }) ?? [];

  // console.log(posts);

  return (
    <>
      <Helmet>
        <title>내 활동 | TechFork</title>
        <meta property="og:title" content="내 활동 | TechFork" />
        <meta
          property="og:description"
          content="북마크한 게시글과 최근 방문한 기술 아티클을 확인하세요."
        />
      </Helmet>

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
                key={item.readPostId || item.bookmarkId}
                {...item}
                id={item.postId}
              />
            );
          })}
        </ul>
        {isFetchingNextPage && <Loading />}
        <div ref={infiniteRef} className="h-10 w-full" />
      </div>
    </>
  );
};

export default MyIntersListPage;
