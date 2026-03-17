import { ThemeContext } from "@/app/providers/ThemeContext";
import { useContext } from "react";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("오류발생");
  return context;
};
