import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/app/styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/app/providers/ThemProvider.tsx";
import { HelmetProvider } from "react-helmet-async";
import App from "@/app/App";
import router from "@/app/routes";
import { initGlobalNavigate } from "@/shared/lib/globalNavigate";

initGlobalNavigate((path) => router.navigate(path));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error) && !error.response) return false;
        return failureCount < 3;
      },
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
