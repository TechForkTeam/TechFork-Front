import { useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";
import Logo from "@/assets/images/logo.png";
import DarkLogo from "@/assets/images/logo_dark.png";

import { useThemeToggle } from "../hooks/useThemToggle";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const navigate = useNavigate();
  const { isDark } = useThemeToggle();
  return (
    <header
      className={cn("flex gap-2 items-center pb-23  w-full  ", className)}
    >
      <img
        src={isDark ? DarkLogo : Logo}
        alt="로고"
        className="w-35 h-12 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <p className="subtitle-sb-20 font-strong">통합 로그인</p>
    </header>
  );
};
