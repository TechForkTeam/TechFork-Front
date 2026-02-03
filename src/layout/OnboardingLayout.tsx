import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../shared/Header";
import clsx from "clsx";

export const OnboardingLayout = () => {
  const { pathname } = useLocation();
  return (
    <div className=" min-h-screen flex flex-col items-center pt-7 max-w-480 mx-auto px-14">
      <Header className={clsx(pathname === "/login" ? "pb-24" : "pb-2")} />
      <Outlet />
    </div>
  );
};
