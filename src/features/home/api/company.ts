import api from "@/shared/api/api";
import { API_ENDPOINTS } from "@/shared/constants/endpoints";
import { useSuspenseQuery } from "@tanstack/react-query";

//게시글이 있는 회사 목록 조회
export const getCompanyList = async () => {
  const { data } = await api.get(API_ENDPOINTS.posts.companies);
  return data;
};

export const useGetCompany = () => {
  return useSuspenseQuery({
    queryFn: getCompanyList,
    queryKey: ["company"],
    select: res => res.data,
  });
};
