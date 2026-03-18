import { useNavigate } from "react-router-dom";
import { useThemeToggle } from "@/shared/lib/useThemeToggle";
import { cn } from "@/shared/lib/cn";

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
        // src={isDark ? DarkLogo : Logo}
        src={isDark ? "/dark_logo.svg" : "/logo.svg"}
        alt="로고"
        className="w-35 h-12 cursor-pointer"
        onClick={() => navigate("/")}
        fetchPriority="high"
      />
      <p className="subtitle-sb-20 font-strong">통합 로그인</p>
    </header>
  );
};
