import { TabSelectList } from "./components/TabSelectList";
import { CompanyFilterList } from "./components/CompanyFilterList";
import { InterestFilterList } from "./components/InterestFilterList";
import { PostCardList } from "./components/PostCardList";
import { Suspense, useState } from "react";
import { useCompanyStore } from "../../store/uesCompanyStore";
import { useGetCompany } from "../../lib/company";
import { useGetMyInterest } from "../../lib/my";
import { usePostRecommendPostList } from "../../lib/recommendation";
import { TAB_MAP } from "../../constants/tab";
import { Loading } from "../../shared/Loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebouce";
import { SearchPostList } from "./components/SearchPostList";
import useUserStore from "../../store/useUserStore";
export const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [modal, setModal] = useState(false);
  const { companies, toggleCompany } = useCompanyStore();

  const { data: companyData } = useGetCompany();
  const { data: myInterest } = useGetMyInterest();
  const { mutate: postRecommendList, isPending: isRefreshing } =
    usePostRecommendPostList();

  const maxCompany = companyData?.companies.slice(0, 8) ?? [];

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  console.log(searchQuery);
  const debouncedInput = useDebounce(searchQuery, 200);
  const { user } = useUserStore();
  const isLogin = !!user?.accessToken;
  const navigate = useNavigate();
  const handleTabChange = (tab: number) => {
    if (tab === 1 && !isLogin) {
      navigate("/login");
      return;
    }
    setSelectedTab(tab);
  };

  return (
    <div className="bg-bgPrimary py-12 " onClick={() => setModal(false)}>
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
          {selectedTab === 1 && (
            <>
              <InterestFilterList
                myInterest={myInterest}
                onRefresh={postRecommendList}
              />
              {isRefreshing ? (
                <Loading />
              ) : (
                <Suspense fallback={<Loading />}>
                  <PostCardList selectedTab={1} />
                </Suspense>
              )}
            </>
          )}
          {(selectedTab === 2 || selectedTab === 3) && (
            <PostCardList selectedTab={selectedTab} />
          )}
        </>
      )}
    </div>
  );
};
