import { useEffect } from "react";
import { useGetSearchPost, useSearchHistory } from "../../../lib/search";
import { CardItem } from "../../../shared/CardItem";
import type { CardItemProps } from "../../../types/post";

interface SearchPostListProps {
  query: string;
}

export const SearchPostList = ({ query }: SearchPostListProps) => {
  const { data: searchData } = useGetSearchPost(query);
  const history = useSearchHistory();

  useEffect(() => {
    if (!query) return;

    history.mutate({
      searchWord: query,
      searchedAt: new Date().toISOString(),
    });
  }, [query]);

  if (!searchData || searchData.length === 0) {
    return <div className="py-20 text-center">검색 결과가 없습니다.</div>;
  }

  console.log(searchData);
  return (
    <div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-10">
        {searchData?.map((post: CardItemProps) => {
          return (
            <CardItem
              id={post.postId}
              title={post.title}
              company={post.company}
              thumbnailUrl={post.thumbnailUrl}
              logoUrl={post.logoUrl}
              publishedAt={post.publishedAt}
              viewCount={post.viewCount}
              shortSummary={post.shortSummary}
              url={post.url}
              isBookmarked={post.isBookmarked}
            />
          );
        })}
      </ul>
    </div>
  );
};
