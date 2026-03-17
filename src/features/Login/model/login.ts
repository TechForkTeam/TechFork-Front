export const OAUTH_PROVIDER = {
  KAKAO: "kakao",
  APPLE: "apple",
} as const;
export type OAuthProvider = keyof typeof OAUTH_PROVIDER;

export const getOAuthUrl = (provider: OAuthProvider) =>
  `${import.meta.env.VITE_SERVER_API_URL}/oauth2/authorization/${OAUTH_PROVIDER[provider]}`;
