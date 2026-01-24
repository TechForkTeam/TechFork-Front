import { useNavigate } from "react-router-dom";
import { cn } from "../utils/cn";
import Logo from "@/assets/images/logo.png";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header
      className={cn("flex gap-2 items-center pb-23  w-full  ", className)}
    >
      <img
        src={Logo}
        alt="로고"
        className="w-35 h-12 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <p className="subtitle-sb-20">통합 로그인</p>
    </header>
  );
};
