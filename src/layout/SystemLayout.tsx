import { Outlet } from "react-router-dom";
import { SystemHeader } from "../shared/SystemHeader";

export const SystemLayout = () => {
  return (
    <>
      <div className="w-full bg-white">
        <SystemHeader />
      </div>
      <div className="max-w-480 mx-auto px-14 min-h-screen  bg-bgPrimary items-center">
        <Outlet />
      </div>
    </>
  );
};
