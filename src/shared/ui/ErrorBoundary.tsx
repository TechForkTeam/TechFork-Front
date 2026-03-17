import {
  ErrorBoundary as ReactErrorBoundary,
  type FallbackProps,
} from "react-error-boundary";

export const DefaultErrorFallback = ({ error }: FallbackProps) => {
  const err = error as Error;
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-blue-400 text-2xl font-semibold">
        문제가 발생했습니다
      </h2>
      <p className="mt-2 text-gray-500">
        {err?.message || "알 수 없는 에러가 발생했습니다."}
      </p>
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
