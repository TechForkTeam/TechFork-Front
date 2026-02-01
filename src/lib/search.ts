//통합 검색

import { useQuery } from "@tanstack/react-query";
import api from "./api";

export const getSearchPost = async (query: string) => {
  const { data } = await api.get("/api/v1/search", { params: { query } });
  return data;
};

export const useGetSearchPost = (query: string) => {
  return useQuery({
    queryKey: ["posts", "search", query],
    queryFn: () => getSearchPost(query),
    select: res => res.data,
    enabled: !!query,
  });
};
