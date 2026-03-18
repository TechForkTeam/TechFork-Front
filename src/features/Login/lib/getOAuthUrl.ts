import {
  OAUTH_PROVIDER,
  type OAuthProvider,
} from "../consts/oauth";

export const getOAuthUrl = (provider: OAuthProvider) =>
  `${import.meta.env.VITE_SERVER_API_URL}/oauth2/authorization/${OAUTH_PROVIDER[provider]}`;
