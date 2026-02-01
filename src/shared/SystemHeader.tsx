import { cn } from "../utils/cn";
import Search from "@/assets/icons/search.svg";
import User from "@/assets/images/user.png";
import Logo from "@/assets/images/logo.png";
import { Button } from "./button/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { MYPAGE_NAV } from "../constants/mypage";
import useUserStore from "../store/useUserStore";
import { postLogout } from "../lib/auth";
import { useGetMyProfile } from "../lib/my";

export const SystemHeader = () => {
  const navigate = useNavigate();
  const [userModal, setUserModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { user, logout } = useUserStore();
  const { data } = useGetMyProfile();
  console.log(data);

  const handleLogout = async () => {
    try {
      await postLogout();
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
      logout();
      setUserModal(false);
      navigate("/");
    }
  };

  const isLogin = !!user?.accessToken;

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
  }, []);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (input) {
      navigate(`/?search=${input}`);
    } else {
      navigate("/");
    }
  }, [input, navigate]);

  return (
    <header
      className={cn("flex gap-2 items-center pb-5 pt-7 bg-white -mx-14 px-14 ")}
    >
      <div
        className="flex items-center justify-between w-full relative"
        ref={modalRef}
      >
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
            value={input}
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
            src={isLogin ? data.profileImage : User}
            alt="mypage"
            className="size-10 cursor-pointer rounded-full"
            onClick={() => {
              if (!isLogin) return navigate("/login");
              setUserModal(prev => !prev);
            }}
          />
        </div>
        {userModal && (
          <div className=" z-50 absolute top-15 shadow-ds100s right-0 w-43 rounded-2xl bg-white border border-bgNormal cursor-pointer">
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
