import { SystemHeader } from "@/widgets/header/SystemHeader";
import { Outlet } from "react-router-dom";

export const SystemLayout = () => {
  return (
    <>
      <div className="w-full bg-bgPrimary">
        <SystemHeader />
      </div>
      <div className="max-w-480 mx-auto px-14 min-h-screen  bg-bgPrimary items-center">
        <Outlet />
      </div>
    </>
  );
};
