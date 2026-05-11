import { NetworkErrorPage } from "@/pages/NetworkError";
import { Button } from "@/shared/ui/button/Button";
import axios from "axios";
import {
  ErrorBoundary as ReactErrorBoundary,
  type FallbackProps,
} from "react-error-boundary";
import { CircleAlert } from "lucide-react";

const isNetworkError = (error: unknown) => {
  return axios.isAxiosError(error) && !error.response;
};
export const DefaultErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const err = error as Error;
  if (isNetworkError(err))
    return <NetworkErrorPage onRetry={resetErrorBoundary} />;

  return (
    <div className="min-h-dvh flex items-center justify-center pb-20">
      <div className="flex justify-center flex-col items-center font-assistive ">
        <CircleAlert className="size-36 mb-10" />
        <p>"서버에 문제가 발생했습니다."</p>
        <p className="mb-5 ">잠시 후 다시 시도해주세요.</p>

        <Button
          size={"md"}
          className="bg-alternative"
          onClick={() => window.location.reload()}
        >
          다시 시도
        </Button>
      </div>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<FallbackProps>;
}

export const ErrorBoundary = ({
  children,
  fallback = DefaultErrorFallback,
}: ErrorBoundaryProps) => {
  return (
    <ReactErrorBoundary FallbackComponent={fallback}>
      {children}
    </ReactErrorBoundary>
  );
};
