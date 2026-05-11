import { Button } from "@/shared/ui/button/Button";
import { WifiOff } from "lucide-react";

interface NetworkErrorPageProps {
  onRetry?: () => void;
}

export const NetworkErrorPage = ({ onRetry }: NetworkErrorPageProps) => {
  const handleRetry = onRetry ?? (() => window.location.reload());

  return (
    <div className="min-h-dvh flex items-center justify-center pb-20">
      <div className="flex justify-center flex-col items-center font-assistive text-blue-500">
        <WifiOff className="size-36 mb-10" />
        <p className="mb-5 ">네트워크에 접속할 수 없습니다.</p>
        <p className="mb-5 text-center ">네트워크 연결 상태를 확인해주세요</p>
        <Button
          size={"md"}
          className="bg-alternative"
          onClick={handleRetry}
        >
          새로고침
        </Button>
      </div>
    </div>
  );
};
