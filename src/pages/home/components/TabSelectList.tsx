import { TabBtn } from "../../../shared/button/TabBtn";
import clsx from "clsx";

interface TabSelectList {
  className?: string;
  selected?: number | null;
  onChange: (idx: number) => void;
  tagList: string[];
}

export const TabSelectList = ({
  className,
  selected,
  onChange,
  tagList,
}: TabSelectList) => {
  return (
    <div className={clsx("flex justify-start gap-2", className)}>
      {tagList.map((item, idx) => {
        return (
          <TabBtn
            label={item}
            onClick={() => onChange(idx)}
            selected={selected === idx}
          />
        );
      })}
    </div>
  );
};
