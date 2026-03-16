import { useGetMyInterest } from "@/lib/my";
import { InterestFilterList } from "@/pages/home/components/InterestFilterList";
import PostCardList from "@/pages/home/components/PostCardList";
import { SkeletonList } from "@/shared/SkeletonList";

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
