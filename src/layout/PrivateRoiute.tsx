import { useNavigate, Outlet } from "react-router-dom"; // Outlet 임포트
import { useEffect } from "react";
import { ScrollToTop } from "../shared/ScrollToTop";
import useUserStore from "../store/useUserStore";

export const PrivateRoute = () => {
  const navigate = useNavigate();
  const accessToken = useUserStore(state => state.user?.accessToken);
  useEffect(() => {
    if (!accessToken) {
      navigate("/login", { replace: true });
    }
  }, [accessToken, navigate]);

  if (!accessToken) return null;

  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};
