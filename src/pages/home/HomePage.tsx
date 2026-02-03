import { TabSelectList } from "./components/TabSelectList";
import { CompanyFilterList } from "./components/CompanyFilterList";
import { PostCardList } from "./components/PostCardList";
import { Suspense, useState } from "react";
import { useCompanyStore } from "../../store/uesCompanyStore";
import { useGetCompany } from "../../lib/company";
import { usePostRecommendPostList } from "../../lib/recommendation";
import { TAB_MAP } from "../../constants/tab";
import { Loading } from "../../shared/Loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebouce";
import { SearchPostList } from "./components/SearchPostList";
import useUserStore from "../../store/useUserStore";
import { toast } from "react-toastify";
import Alert from "@/assets/icons/alert2.svg";
import { SkeletonList } from "../../shared/SkeletonList";
import { InterestPage } from "./components/InterestPage";
export const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [modal, setModal] = useState(false);
  const { companies, toggleCompany } = useCompanyStore();

  const { data: companyData } = useGetCompany();
  const { mutate: postRecommendList, isPending: isRefreshing } =
    usePostRecommendPostList();

  const maxCompany = companyData?.companies.slice(0, 8) ?? [];

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  // console.log(searchQuery);
  const debouncedInput = useDebounce(searchQuery, 200);
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
    setSelectedTab(tab);
  };

  return (
    <div className="bg-bgPrimary py-12 " onClick={() => setModal(false)}>
      {/* <SkeletonCard /> */}
      {debouncedInput && debouncedInput.trim() !== "" ? (
        <Suspense fallback={<Loading />}>
          <SearchPostList query={debouncedInput ?? ""} />
        </Suspense>
      ) : (
        <>
          <TabSelectList
            className={[2, 3].includes(selectedTab) ? "mb-20" : "mb-8"}
            onChange={handleTabChange}
            selected={selectedTab}
            tagList={TAB_MAP}
          />

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
            <Suspense fallback={<SkeletonList />}>
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
