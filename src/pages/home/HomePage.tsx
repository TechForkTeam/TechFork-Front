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
export const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [modal, setModal] = useState(false);
  const { companies, toggleCompany } = useCompanyStore();

  const { data: companyData } = useGetCompany();
  const { data: myInterest } = useGetMyInterest();
  const { mutate: postRecommendList, isPending: isRefreshing } =
    usePostRecommendPostList();

  const maxCompany = companyData?.companies.slice(0, 8) ?? [];

  return (
    <div className="bg-bgPrimary py-12 " onClick={() => setModal(false)}>
      <TabSelectList
        className={[2, 3].includes(selectedTab) ? "mb-20" : "mb-8"}
        onChange={setSelectedTab}
        selected={selectedTab}
        tagList={TAB_MAP}
      />
      {/* 기업별 게시글 */}
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
          {/* 2. 새로고침 중이면 즉시 로딩바를 보여주고, 아니면 Suspense 구조를 유지합니다. */}
          {isRefreshing ? (
            <Loading />
          ) : (
            <Suspense fallback={<Loading />}>
              <PostCardList selectedTab={1} />
            </Suspense>
          )}
        </>
      )}
      {/* {/* ... 나머지 탭 생략 */}
      {(selectedTab === 2 || selectedTab === 3) && (
        <PostCardList selectedTab={selectedTab} />
      )}
    </div>
  );
};
