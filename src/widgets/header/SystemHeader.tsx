import Search from "@/assets/icons/search.svg";
import User from "@/assets/images/user.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Alert from "@/assets/icons/alert2.svg";
import { useThemeToggle } from "@/shared/lib/useThemeToggle";
import { MYPAGE_NAV } from "@/features/mypage";
import { useCompanyStore } from "@/features/home";
import { useGetMyProfile } from "@/shared/api/my";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button/Button";
import { useUserMenu } from "./model/useUserMenu";
import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/lib/useDebounce";

export const SystemHeader = () => {
  const navigate = useNavigate();
  const { isDark } = useThemeToggle();
  const { resetCompanies } = useCompanyStore();
  const { isLogin, userModal, setUserModal, modalRef, handleNavClick } =
    useUserMenu();
  const { data } = useGetMyProfile(isLogin);
  const [searchParams] = useSearchParams(); //tab
  const [input, setInput] = useState(() => searchParams.get("search") ?? "");
  const urlSearch = searchParams.get("search") ?? "";

  useEffect(() => {
    setInput(urlSearch);
  }, [urlSearch]);
  const debouncedInput = useDebounce(input, 300);
  useEffect(() => {
    const trimmed = debouncedInput.trim();
    const currentSearch = searchParams.get("search") ?? "";

    if (trimmed === currentSearch) return;

    if (!trimmed) {
      navigate("/?tab=0", { replace: true });
    } else {
      navigate(`/?search=${encodeURIComponent(trimmed)}`, { replace: true });
    }
  }, [debouncedInput]);

  const handleLogoClick = () => {
    resetCompanies();
    setInput("");
    navigate("/?tab=0");
  };

  return (
    <header className={cn("max-w-480  mx-auto gap-2 pb-5 pt-7   px-14   ")}>
      <div className="flex items-center justify-between w-full relative">
        <img
          src={isDark ? "/dark_logo.svg" : "/logo.svg"}
          alt="로고"
          className="w-35 h-12 cursor-pointer"
          onClick={handleLogoClick}
          fetchPriority="high"
        />
        <div className="w-160 flex  bg-bgPrimary rounded-lg border border-bgNormal px-3">
          <img src={Search} alt="" className="search" />
          <input
            type="text"
            placeholder="검색어 또는 태그명 입력"
            className="w-full px-3 py-2    focus:outline-none outline-none font-alternative"
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
            className=" z-50 absolute top-15 shadow-ds100s right-0 w-43 rounded-2xl bg-primary border border-bgNormal cursor-pointer font-strong"
          >
            {MYPAGE_NAV.map(item => {
              return (
                <div
                  key={item.name}
                  className="p-4"
                  onClick={() => handleNavClick(item)}
                >
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
