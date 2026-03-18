import { RouterProvider } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { cn } from "@/shared/lib/cn";
import router from "@/routes";
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary";

function App() {
  return (
    <div
      className={cn("w-full min-h-dvh mx-auto overflow-y-auto bg-bgPrimary")}
    >
      <ErrorBoundary>
        <main>
          <RouterProvider router={router} />
        </main>
      </ErrorBoundary>
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
