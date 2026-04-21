import useUserStore from "@/shared/model/useUserStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetCompany } from "../api/company";
import { usePostRecommendPostList } from "../api/recommendation";
import { useCompanyStore } from "./useCompanyStore";
import { useHomeSearchParams } from "./useHomeSearchParams";

export const useHomePage = () => {
  const [modal, setModal] = useState(false);
  const { companies, toggleCompany, resetCompanies } = useCompanyStore();
  const { user } = useUserStore();
  const isLogin = !!user?.accessToken;
  const navigate = useNavigate();
  const { data: companyData } = useGetCompany();
  const { mutate: postRecommendList, isPending: isRefreshing } =
    usePostRecommendPostList();
  const { searchQuery, selectedTab, isSearching, setSelectedTab } =
    useHomeSearchParams();
  const maxCompany = companyData?.companies.slice(0, 8) ?? [];

  useEffect(() => {
    return () => {
      resetCompanies();
    };
  }, [resetCompanies]);

  const handleTabChange = (tab: number) => {
    if (tab === 1 && !isLogin) {
      toast.info("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    setSelectedTab(tab);
  };

  return {
    modal,
    setModal,
    companies,
    toggleCompany,
    isLogin,
    companyData,
    maxCompany,
    searchQuery,
    selectedTab,
    isSearching,
    postRecommendList,
    isRefreshing,
    handleTabChange,
  };
};
