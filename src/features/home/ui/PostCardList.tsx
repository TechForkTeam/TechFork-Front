import { useInfiniteCompaniesPosts } from "@/features/home/model/useInfiniteCompaniesPosts";
import { useInfinitePosts } from "@/features/home/model/useInfinitePosts";
import { useGetRecommendPostList } from "@/features/home/api/recommendation";
import { CardItem } from "@/shared/ui/CardItem";
import { Loading } from "@/shared/ui/Loading";
import { useCompanyStore } from "@/features/home/model/useCompanyStore";
import useUserStore from "@/shared/model/useUserStore";
import type {
  CardItemProps,
  PostResponseDto,
} from "@/features/home/api/post.types";
import { useRef, useEffect } from "react";

interface PostCardListProps {
  selectedTab: number;
}

const PostCardList = ({ selectedTab }: PostCardListProps) => {
  const { companies } = useCompanyStore();
  const infiniteRef = useRef<HTMLDivElement | null>(null);

  const companyQuery = useInfiniteCompaniesPosts({ companies });
  const recentQuery = useInfinitePosts({ sortBy: "LATEST" });
  const popularQuery = useInfinitePosts({ sortBy: "POPULAR" });
  const { user } = useUserStore();
  const isLogin = !!user?.accessToken;
  const { data: recommendData } = useGetRecommendPostList(isLogin);

  const activeQuery = [companyQuery, null, recentQuery, popularQuery][
    selectedTab
  ];

  useEffect(() => {
    if (
      !infiniteRef.current ||
      !activeQuery?.hasNextPage ||
      activeQuery?.isFetchingNextPage
    )
      return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) activeQuery.fetchNextPage();
    });
    observer.observe(infiniteRef.current);
    return () => observer.disconnect();
  }, [activeQuery]);

  const posts =
    selectedTab === 1
      ? (recommendData?.recommendations ?? [])
      : (activeQuery?.data?.flatMap(
          (page: PostResponseDto) => page.data.posts,
        ) ?? []);

  // console.log(posts);

  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {posts.map((item: CardItemProps) => (
          <CardItem
            key={item.id || item.postId}
            {...item}
            id={selectedTab === 1 ? item.postId : item.id}
          />
        ))}
      </ul>
      {activeQuery?.isFetchingNextPage && <Loading />}
      {selectedTab !== 1 && <div ref={infiniteRef} className="h-10 w-full" />}
    </>
  );
};

export default PostCardList;
