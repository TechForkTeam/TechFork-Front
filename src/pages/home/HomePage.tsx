import {
  CompanyFilterList,
  PostCardList,
  TAB_MAP,
  useHomePage,
} from "@/features/home";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary";
import { Loading } from "@/shared/ui/Loading";
import { SkeletonList } from "@/shared/ui/SkeletonList";
import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { TabSelectList } from "@/shared/ui/TabSelectList";

const InterestPage = lazy(() =>
  import("@/features/home").then(module => ({ default: module.InterestPage })),
);
const SearchPostList = lazy(() =>
  import("@/features/home").then(module => ({
    default: module.SearchPostList,
  })),
);

const HomePage = () => {
  const home = useHomePage();

  return (
    <>
      <Helmet>
        <title>
          {home.isSearching
            ? `"${home.searchQuery}" | TechFork`
            : `TechFork | ${TAB_MAP[home.selectedTab]}`}
        </title>
        <meta property="og:title" content="TechFork | 기업 기술 블로그 모음" />
        <meta
          property="og:description"
          content="기업 기술 블로그를 한 곳에서 모아보고 최신 개발 트렌드를 발견하세요."
        />
        <meta
          name="keywords"
          content="기업 기술 블로그, 기술 블로그 모음, 기업 블로그, 회사 기술 블로그, 개발 블로그 모음, 테크 블로그"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://techfork-fe.vercel.app/sub_logo.png"
        />
      </Helmet>
      <div className="bg-bgPrimary py-12" onClick={() => home.setModal(false)}>
        <TabSelectList
          className={
            home.isSearching || [2, 3].includes(home.selectedTab)
              ? "mb-20"
              : "mb-8"
          }
          onChange={home.handleTabChange}
          selected={home.isSearching ? null : home.selectedTab}
          tagList={TAB_MAP}
        />
        {home.isSearching ? (
          <ErrorBoundary>
            <Suspense fallback={<SkeletonList />}>
              <SearchPostList query={home.searchQuery} />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <>
            {home.selectedTab === 0 && (
              <>
                <CompanyFilterList
                  companies={home.companies}
                  companyData={home.companyData}
                  maxCompany={home.maxCompany}
                  modal={home.modal}
                  setModal={home.setModal}
                  toggleCompany={home.toggleCompany}
                />
                <PostCardList selectedTab={0} />
              </>
            )}
            {home.selectedTab === 1 && home.isLogin && (
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <InterestPage
                    onRefresh={home.postRecommendList}
                    isRefreshing={home.isRefreshing}
                  />
                </Suspense>
              </ErrorBoundary>
            )}
            {[2, 3].includes(home.selectedTab) && (
              <PostCardList selectedTab={home.selectedTab} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
