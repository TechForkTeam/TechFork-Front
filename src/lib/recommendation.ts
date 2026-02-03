import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";

//추천 게시글 조회
export const getRecommendPostList = async () => {
  const { data } = await api.get("/api/v1/recommendations");
  return data;
};

export const useGetRecommendPostList = (isLogin: boolean) => {
  return useQuery({
    queryKey: ["posts", "my", "recommend"],
    queryFn: getRecommendPostList,
    select: res => res.data,
    enabled: isLogin,
  });
};

//추천 새로고침
export const postRecommendList = async () => {
  const { data } = await api.post("/api/v1/recommendations/regenerate");
  return data;
};

export const usePostRecommendPostList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postRecommendList,

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["posts", "my", "recommend"],
      });
      const prev = queryClient.getQueryData(["posts", "my", "recommend"]);
      queryClient.removeQueries({
        queryKey: ["posts", "my", "recommend"],
        exact: true,
      });
      return { prev };
    },
    onError: (_err, _var, ctx) => {
      queryClient.setQueryData(["posts", "my", "recommend"], ctx?.prev);
    },
  });
};
