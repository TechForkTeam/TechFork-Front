import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeContext";

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("오류발생");
  return context;
};
