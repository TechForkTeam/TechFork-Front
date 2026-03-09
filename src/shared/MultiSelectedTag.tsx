import { TagBtn } from "./select-button/TagBtn";
interface MultiSelectedTagProps {
  tag: string;
  selected: boolean;
  onClick: () => void;
}

export const MultiSelectedTag = ({
  tag,
  selected,
  onClick,
}: MultiSelectedTagProps) => {
  return (
    <TagBtn
      className="w-fit cursor-pointer  border border-normal"
      state={selected ? "select" : "default"}
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
    >
      {tag}
    </TagBtn>
  );
};
