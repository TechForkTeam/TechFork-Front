import { InterestFilterList } from "./InterestFilterList";
import PostCardList from "./PostCardList";
import { useGetMyInterest } from "@/shared/api/my";

import { SkeletonList } from "@/shared/ui/SkeletonList";

interface InterestPageProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

const InterestPage = ({ onRefresh, isRefreshing }: InterestPageProps) => {
  const { data: myInterest } = useGetMyInterest();

  return (
    <>
      <InterestFilterList myInterest={myInterest} onRefresh={onRefresh} />
      {isRefreshing ? <SkeletonList /> : <PostCardList selectedTab={1} />}
    </>
  );
};

export default InterestPage;
