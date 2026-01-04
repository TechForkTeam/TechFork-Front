import { cn } from "../lib/cn";

interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={cn("flex gap-2 items-center pt-8 pb-20  w-full ", className)}
    >
      <img src="/src/assets/images/logo.png" alt="로고" className="w-35 h-12" />
      <p className="title-sb-24">통합 로그인</p>
    </header>
  );
};
