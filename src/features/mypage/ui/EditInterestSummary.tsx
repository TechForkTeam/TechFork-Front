import { cn } from "@/shared/lib/cn";
import { tagCodeToLabel } from "@/shared/lib/tagCodeToLabel";
import { useMemo } from "react";
import { useEditTagStore } from "../model/useEditTagStore";
import { InterstBtn } from "./IntersetBtn";

interface EditInterestSummaryProps {
  isSaving: boolean;
  onSave: () => void;
}

export const EditInterestSummary = ({
  isSaving,
  onSave,
}: EditInterestSummaryProps) => {
  const selectedTags = useEditTagStore(state => state.selectedTags);
  const originalTags = useEditTagStore(state => state.originalTags);
  const isEqual = useMemo(
    () =>
      originalTags.length === selectedTags.length &&
      originalTags.every(tag => selectedTags.includes(tag)),
    [originalTags, selectedTags],
  );

  return (
    <div className="rounded-t-xl border border-bgNormal bg-bgStrong p-8 font-strong">
      <h3 className="mb-4 body-sb-16">선택한 관심사</h3>

      <div className="flex items-start">
        <div className="flex flex-wrap gap-2">
          {selectedTags.map(tag => {
            const [categoryCode, keywordCode] = tag.split(":");
            const label =
              tagCodeToLabel(categoryCode, [keywordCode])[0] ?? keywordCode;

            return <InterstBtn key={tag} label={label} value={tag} />;
          })}
        </div>
        <button
          className={cn(
            "ml-auto shrink-0 cursor-pointer rounded-xl px-3 py-2 body-r-14 items-start",
            isEqual ? "bg-sub-500 font-assistive" : "bg-blue-500 text-white!",
          )}
          disabled={isEqual || isSaving}
          onClick={onSave}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};
