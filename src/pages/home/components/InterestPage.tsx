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
      {isRefreshing ? <SkeletonList /> : <PostCardList selectedTab={1} />}
    </>
  );
};
