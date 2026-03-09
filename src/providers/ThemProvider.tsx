import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

export enum THEME {
  LIGHT = "light",
  DARK = "dark",
}

interface ThemeContextType {
  theme: THEME;
  setTheme: (theme: THEME) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const THEME_STORAGE_KEY = "theme";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<THEME>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as THEME | null;

    if (saved === THEME.LIGHT || saved === THEME.DARK) {
      return saved;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? THEME.DARK
      : THEME.LIGHT;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === THEME.DARK) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("오류발생");
  return context;
};
