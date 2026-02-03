import clsx from "clsx";

interface TabBtnProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const TabBtn = ({ label, selected, onClick }: TabBtnProps) => {
  return (
    <div
      className={clsx(
        "relative px-4  py-2 cursor-pointer hover:text-blue-500 hover:font-bold",
        "after:content-[''] after:absolute after:left-1/2 after:bottom-0 ",
        "after:h-0.5 after:w-full after:bg-blue-500 after:text-blue-500 after:scale-x-0 after:-translate-x-1/2",
        "after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100",
        selected && "text-blue-500 after:scale-x-100 font-bold ",
      )}
      onClick={onClick}
    >
      {label}
    </div>
  );
};
