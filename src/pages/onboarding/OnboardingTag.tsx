import { Header } from "../../components/Header";

import Tag from "@assets/icons/tag.svg";
import ArrowDown from "@assets/icons/arrow_down.svg";
import ArrowUp from "@assets/icons/arrow_up.svg";
import { TAG, TAG_MAP } from "../../constants/tag";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const OnboardingTag = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col  items-center ">
      <Header className="pb-2" />
      <section className="flex flex-col  items-center ">
        <div className="flex gap-4 mb-8 justify-center">
          <div className="flex gap-4 items-center ">
            <span className="size-8 rounded-full bg-assistive  relative">
              <p className="absolute left-3 top-1 text-white">1</p>
            </span>

            <p className=" body-r-16 text-assistive">기본 정보</p>
          </div>

          <span className="w-19 h-px bg-sub-800 mt-5"></span>

          <div className="flex gap-4 items-center ">
            <span className="size-8 rounded-full bg-blue-500 relative">
              <p className="absolute left-3 top-1 text-white">1</p>
            </span>

            <p className="body-r-16 text-blue-500">관심 분야</p>
          </div>
        </div>

        <section className="bg-white rounded-lg shadow-ds50 flex flex-col items-center justify-center p-6 w-100 ">
          <h1 className="subtitle-sb-20 mb-2">관심 분야를 선택해 주세요</h1>
          <p className="body-r-14 text-alternative mb-2">
            선택 분야를 바탕으로 맞춤형 게시글을 추천해 드려요
          </p>
          <div className="flex gap-2 mb-6">
            <p className="body-r-14">선택한 기술: </p>
            <p className="text-point1 body-sb-16">0개</p>
          </div>
          {/* 토글 */}

          <article className="w-full max-h-70 overflow-scroll overflow-x-hidden scrollbar-hide">
            {TAG.map((item, idx) => {
              const isOpen = selected === idx;
              const itemTitle = item.replace(/[ /]/g, "_");
              const tags = TAG_MAP[itemTitle as keyof typeof TAG_MAP];
              return (
                <>
                  <div
                    className={`rounded-lg border border-sub-600 w-full px-4 py-1  mb-3 cursor-pointer ${isOpen && "bg-sub-400"} `}
                    onClick={() => {
                      setSelected(pre => (pre === idx ? null : idx));
                    }}
                  >
                    <div className="justify-between flex  items-center ">
                      <div className="flex items-center gap-2 ">
                        <img src={Tag} alt="ios" />
                        <p>{item}</p>
                      </div>
                      <div>
                        <img
                          src={isOpen ? ArrowUp : ArrowDown}
                          alt="toggle open"
                          className="size-10"
                        />
                      </div>
                    </div>
                    <div className=" flex gap-2">
                      {/* 태그컴포 */}

                      {isOpen && (
                        <ul className="flex  gap-2 flex-wrap py-2">
                          {tags?.map(tag => {
                            return (
                              <li className="px-3 py-[2px] border border-blue-400 rounded-2xl w-fit">
                                <p className="body-r-14">{tag}</p>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </article>
          {/* 버튼 */}
          <div className="flex gap-4 w-full pt-4">
            <button
              className="w-full rounded-lg  body-r-14 bg-sub-500 p-2.5 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              이전
            </button>
            <button className="w-full rounded-lg body-r-14 text-white bg-blue-500 p-2.5 cursor-pointer">
              회원가입 완료
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};
