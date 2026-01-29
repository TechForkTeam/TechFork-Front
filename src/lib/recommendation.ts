import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import api from "./api";

//추천 게시글 조회
export const getRecommendPostList = async () => {
  const { data } = await api.get("/api/v1/recommendations");
  return data;
};

export const useGetRecommendPostList = () => {
  return useSuspenseQuery({
    queryKey: ["my", "recommend"],
    queryFn: getRecommendPostList,
    select: res => res.data,
  });
};

//추천 새로고침
export const postRecommendList = async () => {
  const { data } = await api.post("/api/v1/recommendations/regenerate");
  return data;
};

export const usePostRecommendPostList = () => {
  return useMutation({
    mutationFn: postRecommendList,
    onSuccess: () => console.log("새로고침성공"),
    onError: err => {
      console.log(err);
    },
  });
};
