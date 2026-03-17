import { ThemeContext } from "@/app/providers/ThemeContext";
import { THEME, THEME_STORAGE_KEY, type Theme } from "@/app/providers/theme";
import { useEffect, useState, type PropsWithChildren } from "react";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);

    if (saved === THEME.LIGHT || saved === THEME.DARK) {
      return saved;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? THEME.DARK
      : THEME.LIGHT;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    requestAnimationFrame(() => {
      root.classList.toggle("dark", theme === THEME.DARK);
    });

    localStorage.setItem(THEME_STORAGE_KEY, theme);
    const timeout = setTimeout(() => {
      root.classList.remove("theme-switching");
    }, 300);

    return () => clearTimeout(timeout);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
