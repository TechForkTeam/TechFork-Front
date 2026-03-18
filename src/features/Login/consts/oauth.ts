export const OAUTH_PROVIDER = {
  KAKAO: "kakao",
  APPLE: "apple",
} as const;

export type OAuthProvider = keyof typeof OAUTH_PROVIDER;
