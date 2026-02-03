import { useGetMyInterest } from "../../../lib/my";
import { SkeletonList } from "../../../shared/SkeletonList";
import { InterestFilterList } from "./InterestFilterList";
import { PostCardList } from "./PostCardList";

interface InterestPageProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const InterestPage = ({
  onRefresh,
  isRefreshing,
}: InterestPageProps) => {
  const { data: myInterest } = useGetMyInterest();

  return (
    <>
      <InterestFilterList myInterest={myInterest} onRefresh={onRefresh} />
      {isRefreshing ? (
        <SkeletonList /> // 반복되는 Skeleton UI는 별도 컴포넌트로 빼면 깔끔합니다.
      ) : (
        <PostCardList selectedTab={1} />
      )}
    </>
  );
};
