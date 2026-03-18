export type ActivityPostType = "bookmark" | "read";

export type ReadPostType = {
  postId: number;
  readAt: string;
  readDurationSeconds: number;
};
