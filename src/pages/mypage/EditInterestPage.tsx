import { useEffect, useRef, useState } from "react";
import { INTERESTS_MOCK } from "../../Mock/tag";
import { useEditTagStore } from "../../store/useEditTagStore";
import { TagItem } from "./components/TagItem";
import { TechSelection } from "./components/TechSelection";
import { cn } from "../../utils/cn";
import { InterstBtn } from "./components/IntersetBtn";
import { useGetMyInterest, usePutMyInterst } from "../../lib/my";
import { TagCodeToLabel } from "../../utils/tagCodeToLabel";
import { TAG_MAP } from "../../constants/tag";

export const EditInterestPage = () => {
  const { selectedTags, setFromServer, toggleTag, originalTags } =
    useEditTagStore();
  const { data } = useGetMyInterest();

  // 카테고리 라벨 맞추기
  const myInterestMap = selectedTags.reduce<Record<string, number>>(
    (acc, code) => {
      const [categoryCode] = code.split(":");
      if (!categoryCode) return acc;
      acc[categoryCode] = (acc[categoryCode] ?? 0) + 1;
      return acc;
    },
    {},
  );
  //선택한 동적 카테고리
  const [selectedCategory, setSelectedCategory] = useState<string>(
    INTERESTS_MOCK.interests[0].code,
  );

  useEffect(() => {
    if (originalTags.length === 0) {
      const serverTags = data.flatMap(item =>
        item.keywords.map(keywordCode => `${item.category}:${keywordCode}`),
      );
      setFromServer(serverTags);
    }
  }, [data, originalTags.length, setFromServer]);

  // 선택된 카테고리
  const selectedCategoryData = INTERESTS_MOCK.interests.find(
    item => item.code === selectedCategory,
  );

  const isEqual =
    originalTags.length === selectedTags.length &&
    originalTags.every(tag => selectedTags.includes(tag));

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSaveInterest = usePutMyInterst();

  const handleSave = () => {
    const categoryMap: Record<string, string[]> = {};

    selectedTags.forEach(code => {
      const [categoryCode, keywordCode] = code.split(":");
      if (!categoryMap[categoryCode]) {
        categoryMap[categoryCode] = [];
      }
      categoryMap[categoryCode].push(keywordCode);
    });

    const payload = {
      interests: Object.entries(categoryMap).map(([category, keywords]) => ({
        category,
        keywords,
      })),
    };
    handleSaveInterest.mutate(payload);
  };

  return (
    <div className="min-h-screen flex flex-col font-strong">
      <header className="mt-16 mb-8 rounded-xl border border-bgNormal bg-bgStrong p-8">
        <h3 className="body-sb-16">관심 분야를 수정해보세요.</h3>
        <h5 className="body-r-14 font-alternative">
          선택 분야를 바탕으로 맞춤형 게시글을 추천해드려요.
        </h5>
      </header>

      <article>
        <div className="bg-bgStrong p-8 rounded-t-xl border border-bgNormal font-strong">
          <h3 className="mb-4 body-sb-16">선택된 관심사</h3>

          <div className="flex items-start">
            <div className="flex gap-2 flex-wrap">
              {selectedTags.map(tag => {
                const [categoryCode, keywordCode] = tag.split(":");
                const label =
                  TagCodeToLabel(categoryCode, [keywordCode])[0] ?? keywordCode;
                return <InterstBtn key={tag} label={label} value={tag} />;
              })}
            </div>
            <button
              className={cn(
                "ml-auto rounded-xl px-3 py-2 body-r-14 items-start  shrink-0 cursor-pointer",
                isEqual
                  ? "bg-sub-500 font-assistive"
                  : "bg-blue-500 text-white!",
              )}
              onClick={handleSave}
            >
              저장하기
            </button>
          </div>
        </div>
        <section className="flex min-h-screen ">
          <aside
            ref={scrollRef}
            className="w-75 bg-sub-400 px-6 text-[#8B95A1] border-x border-b border-bgNormal "
          >
            <h6 className="py-4 body-r-14">카테고리</h6>

            <ul className="w-65 flex flex-col h-150 overflow-scroll overflow-x-hidden scrollbar-style">
              {INTERESTS_MOCK.interests.map(item => {
                const count = myInterestMap[item.code] ?? 0;

                return (
                  <TagItem
                    key={item.code}
                    tag={item.label}
                    length={count}
                    selected={item.code === selectedCategory}
                    onClick={() => {
                      setSelectedCategory(item.code);
                      scrollToTop();
                    }}
                  />
                );
              })}
            </ul>
          </aside>
          {/* 기술 */}
          <div className="p-10 bg-bgStrong w-full">
            <h5 className="body-sb-18">{selectedCategoryData?.label}</h5>
            <p className="body-r-14 font-alternative mb-6">
              관심있는 기술을 선택하세요.
            </p>

            <div className="grid grid-cols-5 gap-4">
              {selectedCategoryData?.keywords.map(keyword => {
                const categoryLabel = selectedCategoryData.label;
                const keywordCode = TAG_MAP[
                  categoryLabel as keyof typeof TAG_MAP
                ]?.find(item => item.label === keyword)?.code;

                if (!keywordCode) return null;

                const value = `${selectedCategoryData.code}:${keywordCode}`;

                return (
                  <TechSelection
                    key={value}
                    label={keyword}
                    selected={selectedTags.includes(value)}
                    onClick={() =>
                      toggleTag(selectedCategoryData.code, keywordCode)
                    }
                  />
                );
              })}
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};
