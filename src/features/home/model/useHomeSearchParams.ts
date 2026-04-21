import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useHomeSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") ?? "";
  const selectedTab = Number(searchParams.get("tab") ?? 0);
  const isSearching = !!searchQuery.trim();

  useEffect(() => {
    if (!searchParams.get("tab") && !searchParams.get("search")) {
      setSearchParams({ tab: "0" }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const setSelectedTab = (tab: number) => {
    setSearchParams({ tab: String(tab) }, { replace: true });
  };

  return {
    searchQuery,
    selectedTab,
    isSearching,
    setSelectedTab,
  };
};
