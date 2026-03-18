//통합 검색
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import type { SearchType } from "@/features/home/types/search";
import api from "@/shared/api/api";
import { API_ENDPOINTS } from "@/shared/constants/endpoints";

export const getSearchPost = async (query: string) => {
  const { data } = await api.get(API_ENDPOINTS.search, { params: { query } });
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
  const { data } = await api.post(API_ENDPOINTS.activities.searches, body);
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
