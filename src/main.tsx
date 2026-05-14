import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app/styles/index.css";
import { QueryClient, QueryClientProvider, MutationCache } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/app/providers/ThemProvider.tsx";
import { HelmetProvider } from "react-helmet-async";
import App from "@/app/App";
import router from "@/app/routes";
import { initGlobalNavigate } from "@/shared/lib/globalNavigate";
import { toast } from "react-toastify";

initGlobalNavigate((path) => router.navigate(path));

const isServerError = (error: unknown) =>
  axios.isAxiosError(error) &&
  (error.response?.status === 500 || error.response?.status === 503);

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      if (isServerError(error)) {
        toast.error("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error) && !error.response) return false;
        if (isServerError(error)) return false;
        return failureCount < 3;
      },
      throwOnError: (error) => isServerError(error),
    },
  },
});

async function prepare() {
  if (import.meta.env.DEV) {
    const { worker } = await import("@/mocks/browser");
    return worker.start({ onUnhandledRequest: "bypass" });
  }
}

prepare().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <HelmetProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>,
  );
});
