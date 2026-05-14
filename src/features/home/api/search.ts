//통합 검색
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import type { SearchType } from "./search.types";
import { HOME_QUERY_KEY } from "../consts/queryKeys";
import api from "@/shared/api/api";
import { QUERY_CACHE_TIME } from "@/shared/consts/cacheTimes";
import { API_ENDPOINTS } from "@/shared/consts/endpoints";
import { SHARED_QUERY_KEY } from "@/shared/consts/queryKeys";

export const getSearchPost = async (query: string) => {
  const { data } = await api.get(API_ENDPOINTS.search, { params: { query } });
  return data;
};

export const useGetSearchPost = (query: string) => {
  return useSuspenseQuery({
    queryKey: [SHARED_QUERY_KEY.POSTS, HOME_QUERY_KEY.POSTS_SEARCH, query],
    queryFn: () => getSearchPost(query),
    select: res => res.data,
    staleTime: QUERY_CACHE_TIME.POSTS.staleTime,
    gcTime: QUERY_CACHE_TIME.POSTS.gcTime,
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
    // onError: err => console.log(err),
  });
};
