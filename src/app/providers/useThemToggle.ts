import { useThemeContext } from "@/app/providers/useThemeContext";
import { THEME } from "@/app/providers/theme";

export const useThemeToggle = () => {
  const { theme, setTheme } = useThemeContext();

  const isDark = theme === THEME.DARK;

  const toggleTheme = () => {
    setTheme(isDark ? THEME.LIGHT : THEME.DARK);
  };

  return { isDark, theme, toggleTheme };
};
