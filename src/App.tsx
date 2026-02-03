import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { Slide, ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="w-full min-h-dvh mx-auto overflow-y-auto bg-bgPrimary">
      <main className="">
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
