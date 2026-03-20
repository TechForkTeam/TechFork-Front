import api from "@/shared/api/api";
import { QUERY_CACHE_TIME } from "@/shared/consts/cacheTimes";
import { HOME_QUERY_KEY } from "../consts/queryKeys";
import { SHARED_QUERY_KEY } from "@/shared/consts/queryKeys";
import { API_ENDPOINTS } from "@/shared/consts/endpoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//추천 게시글 조회
export const getRecommendPostList = async () => {
  const { data } = await api.get(API_ENDPOINTS.recommendations.list);
  return data;
};

export const useGetRecommendPostList = (isLogin: boolean) => {
  return useQuery({
    queryKey: [
      SHARED_QUERY_KEY.POSTS,
      SHARED_QUERY_KEY.MY,
      HOME_QUERY_KEY.POSTS_RECOMMEND,
    ],
    queryFn: getRecommendPostList,
    select: res => res.data,
    enabled: isLogin,
    staleTime: QUERY_CACHE_TIME.POSTS.staleTime,
    gcTime: QUERY_CACHE_TIME.POSTS.gcTime,
  });
};

//추천 새로고침
export const postRecommendList = async () => {
  const { data } = await api.post(API_ENDPOINTS.recommendations.regenerate);
  return data;
};

export const usePostRecommendPostList = () => {
  const queryClient = useQueryClient();
  const queryKey = [
    SHARED_QUERY_KEY.POSTS,
    SHARED_QUERY_KEY.MY,
    HOME_QUERY_KEY.POSTS_RECOMMEND,
  ] as const;

  return useMutation({
    mutationFn: postRecommendList,

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey,
      });
      const prev = queryClient.getQueryData(queryKey);
      queryClient.removeQueries({
        queryKey,
        exact: true,
      });
      return { prev };
    },
    onError: (_err, _var, ctx) => {
      queryClient.setQueryData(queryKey, ctx?.prev);
    },
  });
};
