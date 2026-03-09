import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Slide, ToastContainer } from "react-toastify";
import { useThemeToggle } from "./hooks/useThemToggle";
import { cn } from "./utils/cn";
import { useEffect } from "react";

function App() {
  const { isDark } = useThemeToggle();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    requestAnimationFrame(() => {
      if (isDark) root.classList.add("dark");
      else root.classList.remove("dark");
    });

    const timeout = setTimeout(() => {
      root.classList.remove("theme-switching");
    }, 300);

    return () => clearTimeout(timeout);
  }, [isDark]);
  return (
    <div
      className={cn("w-full min-h-dvh mx-auto overflow-y-auto bg-bgPrimary")}
    >
      <main>
        <RouterProvider router={router} />
      </main>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        toastClassName={() =>
          "flex items-center justify-between p-4 px-8 rounded-lg bg-white text-black shadow-md"
        }
        progressClassName={"bg-red-500"}
        hideProgressBar={true}
        transition={Slide}
      />
    </div>
  );
}

export default App;
