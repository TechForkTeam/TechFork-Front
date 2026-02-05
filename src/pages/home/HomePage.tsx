import { TabSelectList } from "./components/TabSelectList";
import { CompanyFilterList } from "./components/CompanyFilterList";
import { PostCardList } from "./components/PostCardList";
import { Suspense, useEffect, useState } from "react";
import { useCompanyStore } from "../../store/uesCompanyStore";
import { useGetCompany } from "../../lib/company";
import { usePostRecommendPostList } from "../../lib/recommendation";
import { TAB_MAP } from "../../constants/tab";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebouce";
import { SearchPostList } from "./components/SearchPostList";
import useUserStore from "../../store/useUserStore";
import { toast } from "react-toastify";
import Alert from "@/assets/icons/alert2.svg";
import { SkeletonList } from "../../shared/SkeletonList";
import { InterestPage } from "./components/InterestPage";
import { Loading } from "../../shared/Loading";
export const HomePage = () => {
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
      // resetCompanies();
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
    //store비우긴
    return () => {
      resetCompanies();
    };
  }, []);

  return (
    <div className="bg-bgPrimary py-12 " onClick={() => setModal(false)}>
      <TabSelectList
        className={
          isSearching || [2, 3].includes(selectedTab) ? "mb-20" : "mb-8"
        }
        onChange={handleTabChange}
        selected={isSearching ? null : selectedTab}
        tagList={TAB_MAP}
      />
      {debouncedInput && debouncedInput.trim() !== "" ? (
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
  );
};
