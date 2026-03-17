import clsx from "clsx";

//마이페이지 관심있는 기술 선택 목록
interface TechSelectionProps {
  label: string;
  onClick?: () => void;
  selected?: boolean;
}

export const TechSelection = ({
  label = "button",
  selected,
  onClick,
}: TechSelectionProps) => {
  return (
    <button
      className={clsx(
        "hover:border-blue-500  w-full py-2 flex justify-center rounded-xl  items-center border border-bgNormal",
        selected && "bg-blue-500 text-white",
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
