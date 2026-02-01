import Restart from "@/assets/icons/restart.svg";
import { TagCodeToLabel } from "../../../utils/tagCodeToLabel";
import { SelectionBtn } from "../../../shared/select-button/SelectionBtn";
import type { InterestTypeDto } from "../../../types/my";

interface InterestFilterListProps {
  myInterest: InterestTypeDto[];
  onRefresh: () => void;
}

export const InterestFilterList = ({
  myInterest,
  onRefresh,
}: InterestFilterListProps) => {
  return (
    <>
      <div className="flex gap-2 flex-wrap py-4">
        <p className="body-r-14 mr-2">나의 관심 분야:</p>
        {myInterest?.map(item =>
          TagCodeToLabel(item.category, item.keywords).map(label => (
            <SelectionBtn key={`${item.category}-${label}`}>
              {label}
            </SelectionBtn>
          )),
        )}
      </div>

      <button
        className="cursor-pointer flex items-center ml-auto my-5 py-2 px-4 body-r-14 gap-3 border border-bgNormal rounded-xl bg-white hover:bg-gray-50 transition-colors"
        onClick={() => onRefresh()}
      >
        새로고침
        <img src={Restart} alt="restart" />
      </button>
    </>
  );
};
