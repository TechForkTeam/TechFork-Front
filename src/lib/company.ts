import { useSuspenseQuery } from "@tanstack/react-query";
import api from "./api";

export const getCompanyList = async () => {
  const { data } = await api.get("/api/v2/posts/companies");
  return data;
};

export const useGetCompany = () => {
  return useSuspenseQuery({
    queryFn: getCompanyList,
    queryKey: ["company"],
    select: res => res.data,
  });
};
