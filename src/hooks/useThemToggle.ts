import { THEME, useThemeContext } from "../providers/ThemProvider";

export const useThemeToggle = () => {
  const { theme, setTheme } = useThemeContext();

  const isDark = theme === THEME.DARK;

  const toggleTheme = () => {
    setTheme(isDark ? THEME.LIGHT : THEME.DARK);
  };

  return { isDark, theme, toggleTheme };
};
