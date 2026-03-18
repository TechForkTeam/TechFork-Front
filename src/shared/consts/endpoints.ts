const V1 = "/api/v1";
const V2 = "/api/v2";

export const API_ENDPOINTS = {
  auth: {
    refresh: `${V1}/auth/refresh`,
    logout: `${V1}/auth/logout`,
  },
  onboarding: {
    complete: `${V1}/onboarding/complete`,
  },
  users: {
    me: {
      profile: `${V1}/users/me/profile`,
      interests: `${V1}/users/me/interests`,
      withdrawal: `${V1}/users/me/withdrawal`,
    },
  },
  activities: {
    bookmarks: `${V1}/activities/bookmarks`,
    readPosts: `${V1}/activities/read-posts`,
    searches: `${V1}/activities/searches`,
  },
  search: `${V1}/search`,
  recommendations: {
    list: `${V1}/recommendations`,
    regenerate: `${V1}/recommendations/regenerate`,
  },
  posts: {
    recent: `${V2}/posts/recent`,
    byCompany: `${V2}/posts/by-company`,
    companies: `${V2}/posts/companies`,
  },
} as const;

export const getActivityPostsEndpoint = (type: "bookmark" | "read") =>
  type === "bookmark"
    ? API_ENDPOINTS.activities.bookmarks
    : API_ENDPOINTS.activities.readPosts;
