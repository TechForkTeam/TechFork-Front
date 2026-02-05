import { useEffect, useRef, useState } from "react";
import { INTERESTS_MOCK } from "../../Mock/tag";
import { useEditTagStore } from "../../store/useEditTagStore";
import { TagItem } from "./components/TagItem";
import { TechSelection } from "./components/TechSelection";
import { cn } from "../../utils/cn";
import { InterstBtn } from "./components/IntersetBtn";
import { useGetMyInterest, usePutMyInterst } from "../../lib/my";
import { TagCodeToLabel, TagLabelToCode } from "../../utils/tagCodeToLabel";

export const EditInterestPage = () => {
  const { selectedTags, setFromServer, toggleTag, originalTags } =
    useEditTagStore();
  const { data } = useGetMyInterest();

  // 카테고리 라벨 맞추기
  const myInterestMap = selectedTags.reduce<Record<string, number>>(
    (acc, label) => {
      const categoryData = INTERESTS_MOCK.interests.find(item =>
        item.keywords.includes(label),
      );

      if (!categoryData) return acc;

      acc[categoryData.code] = (acc[categoryData.code] ?? 0) + 1;
      return acc;
    },
    {},
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    INTERESTS_MOCK.interests[0].code,
  );

  useEffect(() => {
    if (originalTags.length === 0) {
      const serverTags = data.flatMap(item =>
        TagCodeToLabel(item.category, item.keywords),
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

    selectedTags.forEach(label => {
      const categoryData = INTERESTS_MOCK.interests.find(item =>
        item.keywords.includes(label),
      );

      if (categoryData) {
        const categoryCode = categoryData.code;
        const keywordCode = TagLabelToCode(label);

        if (!categoryMap[categoryCode]) {
          categoryMap[categoryCode] = [];
        }
        categoryMap[categoryCode].push(keywordCode);
      }
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
    <div className="min-h-screen flex flex-col">
      <header className="mt-16 mb-8 rounded-xl border border-bgNormal bg-white p-8">
        <h3 className="body-sb-16">관심 분야를 수정해보세요.</h3>
        <h5 className="body-r-14 text-alternative">
          선택 분야를 바탕으로 맞춤형 게시글을 추천해드려요.
        </h5>
      </header>

      <article>
        <div className="bg-white p-8 rounded-t-xl border border-bgNormal">
          <h3 className="mb-4 body-sb-16">선택된 관심사</h3>

          <div className="flex items-start">
            <div className="flex gap-2 flex-wrap">
              {selectedTags.map(tag => (
                <InterstBtn key={tag} label={tag} />
              ))}
            </div>
            <button
              className={cn(
                "ml-auto rounded-xl px-3 py-2 body-r-14 text-white items-start shrink-0 cursor-pointer",
                isEqual ? "bg-sub-900" : "bg-blue-500",
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

            <ul className="w-65 flex flex-col h-150 overflow-scroll overflow-x-hidden">
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
          <div className="p-10 bg-white w-full">
            <h5 className="body-sb-18">{selectedCategoryData?.label}</h5>
            <p className="body-r-14 text-alternative mb-6">
              관심있는 기술을 선택하세요.
            </p>

            <div className="grid grid-cols-5 gap-4">
              {selectedCategoryData?.keywords.map(keyword => (
                <TechSelection
                  key={keyword}
                  label={keyword}
                  selected={selectedTags.includes(keyword)}
                  onClick={() => toggleTag(keyword)}
                />
              ))}
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};
