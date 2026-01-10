import { cva } from "class-variance-authority";

export const ButtonVariants = cva(
  `
  flex items-center justify-center
  rounded-lg p-3 cursor-pointer 
  `,
  {
    variants: {
      size: {
        default: "w-full",
        md: "w-43",
        sm: "w-25",
        xs: "w-19",
      },
      color: {
        default: "bg-blue-500",
        blue1: "bg-blue-600",
        blue2: "bg-blue-700",
        grey1: "bg-sub-500",
        grey2: "bg-sub-600",
        grey3: "bg-sub-700",
      },
      textColor: {
        default: "text-white",
        black: "text-black",
        blue: "text-blue-500",
      },
    },
    defaultVariants: {
      size: "default",
      color: "default",
      textColor: "default",
    },
  },
);
