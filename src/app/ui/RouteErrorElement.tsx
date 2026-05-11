import { useRouteError } from "react-router-dom";
import axios from "axios";
import { NetworkErrorPage } from "@/pages/NetworkError";
import { DefaultErrorFallback } from "@/shared/ui/ErrorBoundary";

const RouteErrorElement = () => {
  const error = useRouteError();
  const isNetworkError = axios.isAxiosError(error) && !error.response;

  if (isNetworkError) return <NetworkErrorPage onRetry={() => window.location.reload()} />;

  return <DefaultErrorFallback error={error as Error} resetErrorBoundary={() => {}} />;
};

export default RouteErrorElement;
