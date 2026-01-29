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
import { MockData } from "../../Mock/company";
import { useTagStore } from "../../store/useTagStore";
import { SelectionBtn } from "../../shared/select-button/SelectionBtn";
import { TAB_MAP } from "../../constants/tab";
import {
  useSuspenseInfiniteQuery,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import api from "../../lib/api";
import type { CardItemProps, PostResponseDto } from "../../types/post";

export const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState(0); // 0 = 기업별 게시글
  const [modal, setModal] = useState(false);
  const { companies, toggleCompany } = useCompanyStore();
  // console.log(companies);

  const infiniteRef = useRef<HTMLDivElement | null>(null);
  const { tag } = useTagStore();
  // console.log(tag);
  type PageParamType = {
    lastPublishedAt?: string;
    lastPostId?: number;
  };
  const getData = async ({
    pageParam,
  }: QueryFunctionContext<["posts", "recent", "latest"], PageParamType>) => {
    const res = await api.get("/api/v2/posts/recent", {
      params: {
        sortBy: "LATEST",
        size: 20,
        ...pageParam,
      },
    });
    return res.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery<
      PostResponseDto, // queryFn
      Error,
      PostResponseDto[], // select ㅌ타입
      ["posts", "recent", "latest"],
      PageParamType
    >({
      queryKey: ["posts", "recent", "latest"],
      queryFn: getData,
      initialPageParam: {},
      getNextPageParam: lastPage => {
        if (!lastPage.data || !lastPage.data.hasNext) return undefined;
        return {
          lastPublishedAt: lastPage.data.lastPublishedAt,
          lastPostId: lastPage.data.lastPostId,
        };
      },
      select: res => res.pages,
    });

  useEffect(() => {
    if (!infiniteRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(entries => {
      console.log(entries[0].isIntersecting);
      if (entries[0].isIntersecting && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(infiniteRef.current);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  console.log(data);
  const posts: CardItemProps[] = data.flatMap(
    (page: PostResponseDto) => page.data.posts,
  ); //게시글
  console.log(data);

  const maxCompany = MockData.data.slice(0, 8);

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
            {companies.length !== 0 && (
              <>
                <div className=" body-sb-14">선택된 기업:</div>
                {companies.map(company => (
                  <HomeCompanySelectBtn
                    company={company}
                    onClick={e => e.stopPropagation()}
                  />
                ))}
              </>
            )}
          </div>
          {/* 게시글일때 회사 네모item */}
          <section className="mb-12 flex items-center justify-center gap-12 relative flex-wrap">
            {maxCompany.map(item => {
              return (
                <CompanyItem
                  company={item.companies}
                  selected={companies.includes(item.companies)}
                  onClick={() => toggleCompany(item.companies)}
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
                <CompaniesModal />
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

            <SelectionBtn>전체</SelectionBtn>
            <SelectionBtn>React</SelectionBtn>
            <SelectionBtn>TypeScript</SelectionBtn>
            <SelectionBtn>전체</SelectionBtn>
            <SelectionBtn>전체</SelectionBtn>
            <SelectionBtn>React</SelectionBtn>
            <SelectionBtn>TypeScript</SelectionBtn>
            <SelectionBtn>전체</SelectionBtn>
            <SelectionBtn>전체</SelectionBtn>
            <SelectionBtn>React</SelectionBtn>

            {tag.map(item => {
              return <SelectionBtn>{item}</SelectionBtn>;
            })}
          </div>

          <button className="cursor-pointer flex items-center ml-auto my-5 py-2 px-4 body-r-14 gap-3 border border-bgNormal rounded-xl bg-white">
            새로고침
            <img src={Restart} alt="restart" />
          </button>
        </>
      )}

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4">
        {posts.map(item => {
          // const isLast = index === posts.length - 1;
          return (
            <CardItem
              company={item.company}
              key={item.id}
              logoUrl={item.logoUrl}
              viewCount={item.viewCount}
              title={item.title}
              thumbnailUrl={item.thumbnailUrl}
              url={item.url}
            />
          );
        })}
      </ul>
      <div ref={infiniteRef} className="h-10 w-full" />
    </div>
  );
};
