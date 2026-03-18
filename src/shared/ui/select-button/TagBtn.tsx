import { SelectBtnVariants } from "@/shared/ui/select-button/select-button.styles";
import { cn } from "@/shared/lib/cn";
import type { VariantProps } from "class-variance-authority";

interface ButtonProps extends VariantProps<typeof SelectBtnVariants> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

export const TagBtn = ({
  onClick,
  children,
  state,
  size,
  className,
}: ButtonProps) => {
  return (
    <button
      className={cn(SelectBtnVariants({ state, size }), className)}
      // className={"text-blue-500 bg-blue-50 body-r-14 py-1 px-6 rounded-[20px]"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
