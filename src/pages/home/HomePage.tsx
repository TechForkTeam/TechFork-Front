import Alert from "@/assets/icons/alert2.svg";
import {
  CompanyFilterList,
  PostCardList,
  TAB_MAP,
  useCompanyStore,
  useGetCompany,
  usePostRecommendPostList,
} from "@/features/home";
import { useDebounce } from "@/shared/lib/useDebounce";

import { ErrorBoundary } from "@/shared/ui/ErrorBoundary";
import { Loading } from "@/shared/ui/Loading";
import { SkeletonList } from "@/shared/ui/SkeletonList";
import useUserStore from "@/shared/model/useUserStore";
import { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
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
  const [selectedTab, setSelectedTab] = useState(0);
  const [modal, setModal] = useState(false);
  const { companies, toggleCompany, resetCompanies } = useCompanyStore();

  const { data: companyData } = useGetCompany();
  const { mutate: postRecommendList, isPending: isRefreshing } =
    usePostRecommendPostList();

  const maxCompany = companyData?.companies.slice(0, 8) ?? [];

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const debouncedInput = useDebounce(searchQuery, 200);
  const isSearching = debouncedInput && debouncedInput.trim() !== "";
  const { user } = useUserStore();
  const isLogin = !!user?.accessToken;
  const navigate = useNavigate();

  const handleTabChange = (tab: number) => {
    if (tab === 1 && !isLogin) {
      toast.info("로그인이 필요한 서비스입니다.", {
        icon: <img src={Alert} alt="login으로 이동" />,
      });

      navigate("/login");

      return;
    }
    setSearchParams({});
    setSelectedTab(tab);
  };

  useEffect(() => {
    return () => {
      resetCompanies();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {isSearching
            ? `"${debouncedInput}" | TechFork`
            : `TechFork | ${TAB_MAP[selectedTab]}`}
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
      <div className="bg-bgPrimary  py-12" onClick={() => setModal(false)}>
        <TabSelectList
          className={
            isSearching || [2, 3].includes(selectedTab) ? "mb-20" : "mb-8"
          }
          onChange={handleTabChange}
          selected={isSearching ? null : selectedTab}
          tagList={TAB_MAP}
        />
        {isSearching ? (
          <>
            <ErrorBoundary>
              <Suspense fallback={<SkeletonList />}>
                <SearchPostList query={debouncedInput ?? ""} />
              </Suspense>
            </ErrorBoundary>
          </>
        ) : (
          <>
            {selectedTab === 0 && (
              <>
                <CompanyFilterList
                  companies={companies}
                  companyData={companyData}
                  maxCompany={maxCompany}
                  modal={modal}
                  setModal={setModal}
                  toggleCompany={toggleCompany}
                />
                <PostCardList selectedTab={0} />
              </>
            )}
            {/* 나와맞는 게시글 */}
            {selectedTab === 1 && isLogin && (
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <InterestPage
                    onRefresh={postRecommendList}
                    isRefreshing={isRefreshing}
                  />
                </Suspense>
              </ErrorBoundary>
            )}

            {(selectedTab === 2 || selectedTab === 3) && (
              <PostCardList selectedTab={selectedTab} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
