import type { VariantProps } from "class-variance-authority";
import { ButtonVariants } from "./button.styles";
import { cn } from "../../lib/cn";

interface ButtonProps extends VariantProps<typeof ButtonVariants> {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button = ({
  onClick,
  children,
  size,
  color,
  textColor,
  className,
}: ButtonProps) => {
  return (
    <button
      className={cn(ButtonVariants({ color, textColor, size }), className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
