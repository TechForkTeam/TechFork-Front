import { cn } from "../utils/cn";
import Search from "@/assets/icons/search.svg";
import User from "@/assets/images/user.png";
import Logo from "@/assets/images/logo.png";
import { Button } from "./button/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MYPAGE_NAV } from "../constants/mypage";
import useUserStore from "../store/useUserStore";
import { postLogout } from "../lib/auth";
import { useGetMyProfile } from "../lib/my";
import { toast } from "react-toastify";
import Alert from "@/assets/icons/alert2.svg";
import Logout from "@/assets/icons/confirm.svg";

export const SystemHeader = () => {
  const navigate = useNavigate();
  const [userModal, setUserModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { user, logout } = useUserStore();
  const isLogin = !!user?.accessToken;

  const { data } = useGetMyProfile(isLogin);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";

  const handleLogout = async () => {
    try {
      await postLogout();
      toast.info(`로그아웃 되었습니다.`, {
        icon: <img src={Logout} alt="logout" />,
      });
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      logout();
      setUserModal(false);
      navigate("/");
    }
  };

  const handleNavClick = (item: { name: string; nav?: string }) => {
    if (item.name === "로그아웃") {
      handleLogout();
    } else if (item.nav) {
      setUserModal(false);
      navigate(item.nav);
    }
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!modalRef.current?.contains(e.target as Node))
        return setUserModal(false);
    };

    document.addEventListener("click", handleClick);
    return () => {
      //cleanup
      document.removeEventListener("click", handleClick);
    };
  }, []);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (!input) return;
    if (input) {
      navigate(`/?search=${input}`);
    }
  }, [input, navigate]);

  useEffect(() => {
    if (userModal) {
      setInput("");
    }
  }, [userModal]);

  return (
    <header className={cn("max-w-480  mx-auto gap-2 pb-5 pt-7   px-14   ")}>
      <div className="flex items-center justify-between w-full relative">
        <img
          src={Logo}
          alt="로고"
          className="w-35 h-12 cursor-pointer"
          onClick={() => {
            navigate("/");
            setInput("");
          }}
        />
        <div className="w-160 flex  bg-bgPrimary rounded-lg border border-bgNormal px-3">
          <img src={Search} alt="" className="search" />
          <input
            type="text"
            placeholder="검색어 또는 태그명 입력"
            className="w-full px-3 py-2    focus:outline-none outline-none"
            value={searchQuery}
            onChange={e => setInput(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          {!isLogin && (
            <Button
              size={"sm"}
              className="body-r-14 w-30 py-2"
              onClick={() => navigate("/login")}
            >
              회원가입/로그인
            </Button>
          )}
          <img
            src={isLogin ? data?.profileImage : User}
            alt="mypage"
            className="size-10 cursor-pointer rounded-full"
            onClick={e => {
              e.stopPropagation();
              if (!isLogin) {
                toast.info(`로그인이 필요한 서비스입니다.`, {
                  icon: <img src={Alert} alt="login으로 이동" />,
                });
                navigate("/login");
              }

              setUserModal(prev => !prev);
            }}
          />
        </div>
        {userModal && (
          <div
            ref={modalRef}
            onClick={e => e.stopPropagation()}
            className=" z-50 absolute top-15 shadow-ds100s right-0 w-43 rounded-2xl bg-white border border-bgNormal cursor-pointer"
          >
            {MYPAGE_NAV.map(item => {
              return (
                <div className="p-4" onClick={() => handleNavClick(item)}>
                  {item.name}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
