import Logout from "@/assets/icons/confirm.svg";
import { postLogout } from "@/features/Login";
import { useCompanyStore } from "@/features/home";
import useUserStore from "@/shared/model/useUserStore";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useUserMenu = () => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [userModal, setUserModal] = useState(false);

  const { logout, user } = useUserStore();
  const { resetCompanies } = useCompanyStore();
  const isLogin = !!user?.accessToken;

  const handleLogout = async () => {
    try {
      await postLogout();
      toast.info("로그아웃 되었습니다.", {
        icon: <img src={Logout} alt="logout" />,
      });
    } finally {
      logout();
      resetCompanies();
      setUserModal(false);
      navigate("/");
    }
  };

  const handleNavClick = (item: { name: string; nav?: string }) => {
    if (item.name === "로그아웃") {
      handleLogout();
      return;
    }

    if (item.nav) {
      setUserModal(false);
      navigate(item.nav);
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!modalRef.current?.contains(e.target as Node)) {
        setUserModal(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return {
    isLogin,
    userModal,
    setUserModal,
    modalRef,
    handleNavClick,
  };
};
