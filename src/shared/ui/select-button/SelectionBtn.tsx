import type { SelectBtnVariants } from "@/shared/ui/select-button/select-button.styles";
import type { VariantProps } from "class-variance-authority";

interface ButtonProps extends VariantProps<typeof SelectBtnVariants> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

export const SelectionBtn = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      className={"text-blue-500 bg-blue-50 body-r-14 py-1 px-6 rounded-[20px]"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
