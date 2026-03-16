import Alert from "@/assets/icons/alert2.svg";
import { TAB_MAP } from "@/constants/tab";
import { useDebounce } from "@/hooks/useDebouce";
import { useGetCompany } from "@/lib/company";
import { usePostRecommendPostList } from "@/lib/recommendation";
import { CompanyFilterList } from "@/pages/home/components/CompanyFilterList";
import PostCardList from "@/pages/home/components/PostCardList";
import { TabSelectList } from "@/pages/home/components/TabSelectList";
import { Loading } from "@/shared/Loading";
import { SkeletonList } from "@/shared/SkeletonList";
import { useCompanyStore } from "@/store/uesCompanyStore";
import useUserStore from "@/store/useUserStore";
import { lazy, Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const InterestPage = lazy(() => import("@/pages/home/components/InterestPage"));
const SearchPostList = lazy(
  () => import("@/pages/home/components/SearchPostList"),
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
            ? `"${debouncedInput}" 검색 결과 | TechFork`
            : `${TAB_MAP[selectedTab]} | TechFork`}
        </title>
        <meta property="og:title" content="기업 테크 블로그 모음 | TechFork" />
        <meta
          property="og:description"
          content="네이버, 카카오, 토스 등 최신 기술 아티클을 한눈에 확인하세요."
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
            <Suspense fallback={<SkeletonList />}>
              <SearchPostList query={debouncedInput ?? ""} />
            </Suspense>
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
              <Suspense fallback={<Loading />}>
                <InterestPage
                  onRefresh={postRecommendList}
                  isRefreshing={isRefreshing}
                />
              </Suspense>
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
