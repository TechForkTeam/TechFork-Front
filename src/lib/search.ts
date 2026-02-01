//통합 검색

import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import api from "./api";
import type { SearchType } from "../types/search";

export const getSearchPost = async (query: string) => {
  const { data } = await api.get("/api/v1/search", { params: { query } });
  return data;
};

export const useGetSearchPost = (query: string) => {
  return useSuspenseQuery({
    queryKey: ["posts", "search", query],
    queryFn: () => getSearchPost(query),
    select: res => res.data,
  });
};

//검색 히스토리 저장
export const searchHistory = async (body: SearchType) => {
  const { data } = await api.post("/api/v1/activities/searches", body);
  return data;
};

export const useSearchHistory = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: SearchType) => searchHistory(body),
    onSuccess: () => {
      console.log("검색 히스토리 저장");
    },
    onError: err => console.log(err),
  });
};
