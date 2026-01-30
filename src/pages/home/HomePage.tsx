import { TabSelectList } from "./components/TabSelectList";
import PopOn from "@/assets/icons/pop-on.svg";
import PopOff from "@/assets/icons/pop-off.svg";
import Restart from "@/assets/icons/restart.svg";
import { CardItem } from "../../shared/CardItem";
import { CompanyItem } from "./components/CompanyItem";
import { useEffect, useRef, useState } from "react";
import { CompaniesModal } from "./components/CompaniesModal";
import { HomeCompanySelectBtn } from "./components/HomeCompanySelectBtn";
import { useCompanyStore } from "../../store/uesCompanyStore";
import { SelectionBtn } from "../../shared/select-button/SelectionBtn";
import { TAB_MAP } from "../../constants/tab";
import type { CardItemProps, PostResponseDto } from "../../types/post";
import { useInfinitePosts } from "../../hooks/useGetInfinitePostList";
import { useGetCompany } from "../../lib/company";
import type { CompanyType } from "../../types/company";
import { useInfiniteCompaniesPosts } from "../../hooks/useGetInfiniteCompaniesList";
import { useGetMyInterest } from "../../lib/my";
import { TagCodeToLabel } from "../../utils/tagCodeToLabel";
import {
  useGetRecommendPostList,
  usePostRecommendPostList,
} from "../../lib/recommendation";
import type { InterestTypeDto } from "../../types/my";

export const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState(0); // 0 = 기업별 게시글
  const [modal, setModal] = useState(false);
  const { companies, toggleCompany } = useCompanyStore();
  const companyQuery = useInfiniteCompaniesPosts({
    companies,
  });

  const recentQuery = useInfinitePosts({
    sortBy: "LATEST",
  });

  const popularQuery = useInfinitePosts({
    sortBy: "POPULAR",
  });

  const activeQuery = (() => {
    switch (selectedTab) {
      case 0:
        return companyQuery;
      case 1:
        return null; // 추천은 무한스크롤 ㄴ
      case 2:
        return recentQuery;
      case 3:
        return popularQuery;
    }
  })();

  const { data: recommendData } = useGetRecommendPostList();

  //회사 불러오기
  const { data: companyData } = useGetCompany();
  console.log(companyData);

  const infiniteRef = useRef<HTMLDivElement | null>(null);

  const isInfiniteTab = selectedTab !== 1;

  const infiniteQuery = isInfiniteTab ? activeQuery : null;

  const data = infiniteQuery?.data;
  const fetchNextPage = infiniteQuery?.fetchNextPage;
  const hasNextPage = infiniteQuery?.hasNextPage;
  const isFetchingNextPage = infiniteQuery?.isFetchingNextPage;

  const { data: myInterest } = useGetMyInterest();
  console.log(myInterest);

  useEffect(() => {
    if (!infiniteRef.current || !hasNextPage || !fetchNextPage) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(infiniteRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  //데이터
  const posts: CardItemProps[] = (() => {
    if (selectedTab === 1) {
      return recommendData?.recommendations ?? [];
    }

    return data?.flatMap((page: PostResponseDto) => page.data.posts) ?? [];
  })();

  // console.log(posts);

  //게시글
  const maxCompany = companyData.companies.slice(0, 8);

  const { mutate: postRecommendList } = usePostRecommendPostList();

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
          <div className=" flex items-center gap-4 flex-wrap pb-6">
            {companyData.companies.length !== 0 && (
              <>
                <div className=" body-sb-14">선택된 기업:</div>
                {companies.map(company => {
                  const matchedCompany = companyData.companies.find(
                    (item: CompanyType) => item.company === company,
                  );

                  return (
                    <HomeCompanySelectBtn
                      key={company}
                      company={company}
                      logoUrl={matchedCompany.logoUrl}
                      onClick={e => e.stopPropagation()}
                    />
                  );
                })}
              </>
            )}
          </div>
          {/* 게시글일때 회사 네모item */}
          <section className="mb-12 flex items-center justify-center gap-12 relative flex-wrap">
            {maxCompany.map((item: CompanyType) => {
              return (
                <CompanyItem
                  company={item.company}
                  logoUrl={item.logoUrl}
                  newDot={item.hasNewPost}
                  selected={companies.includes(item.company)}
                  onClick={() => toggleCompany(item.company)}
                />
              );
            })}
            <img
              src={modal ? PopOn : PopOff}
              alt=""
              className="mb-6 cursor-pointer"
              onClick={e => {
                e.stopPropagation();
                setModal(pre => !pre);
              }}
            />
            {/* 모달 */}
            {modal && (
              <div
                onClick={e => e.stopPropagation()}
                className="absolute  top-25 right-40"
              >
                <CompaniesModal companyData={companyData} />
              </div>
            )}
          </section>
        </>
      )}

      {/* 나와맞는 게시글 */}
      {selectedTab === 1 && (
        <>
          <div className=" flex gap-2 flex-wrap py-4">
            <p className="body-r-14 mr-2">나의 관심 분야:</p>
            {myInterest.map((item: InterestTypeDto) =>
              TagCodeToLabel(item.category, item.keywords).map(label => (
                <SelectionBtn key={`${item.category}-${label}`}>
                  {label}
                </SelectionBtn>
              )),
            )}
          </div>

          <button
            className="cursor-pointer flex items-center ml-auto my-5 py-2 px-4 body-r-14 gap-3 border border-bgNormal rounded-xl bg-white"
            onClick={() => postRecommendList()}
          >
            새로고침
            <img src={Restart} alt="restart" />
          </button>
        </>
      )}

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
        {posts.map(item => {
          const isSelected = selectedTab === 1;
          return (
            <CardItem
              company={item.company}
              key={item.id}
              logoUrl={item.logoUrl}
              viewCount={item.viewCount}
              title={item.title}
              thumbnailUrl={item.thumbnailUrl}
              url={item.url}
              id={isSelected ? item.postId : item.id}
              isBookmarked={item.isBookmarked}
            />
          );
        })}
      </ul>
      <div ref={infiniteRef} className="h-10 w-full" />
    </div>
  );
};
