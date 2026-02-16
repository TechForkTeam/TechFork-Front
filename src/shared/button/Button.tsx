import type { VariantProps } from "class-variance-authority";
import { ButtonVariants } from "./button.styles";
import { cn } from "../../utils/cn";

interface ButtonProps extends VariantProps<typeof ButtonVariants> {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  onClick,
  children,
  size,
  color,
  textColor,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        ButtonVariants({ color, textColor, size }),
        disabled && "cursor-not-allowed",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
