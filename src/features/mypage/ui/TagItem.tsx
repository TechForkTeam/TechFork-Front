import clsx from "clsx";

interface TagItemProps {
  tag: string;
  selected?: boolean;
  length?: number;
  onClick?: () => void;
}

export const TagItem = ({ tag, selected, length, onClick }: TagItemProps) => {
  return (
    <li
      className={clsx(
        "px-6 py-4 flex justify-between rounded-xl",
        selected && "bg-blue-500 text-white",
      )}
      onClick={onClick}
    >
      <p className="body-r-14"> {tag}</p>
      <span className="rounded-full bg-blue-50 text-blue-500 size-6 px-2 hover:bg-white">
        {length}
      </span>
    </li>
  );
};
