import { OnboardingLayout } from "@/widgets/layout/OnboardingLayout";
import { PrivateRoute } from "@/widgets/layout/PrivateRoiute";
import { SystemLayout } from "@/widgets/layout/SystemLayout";

import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Lazy Loading 적용
const HomePage = lazy(() => import("@/pages/home/HomePage"));
const LoginPage = lazy(() => import("@/pages/login/LoginPage"));
const KakaoLogin = lazy(() => import("@/pages/login/KakaoLogin"));
const Onboarding = lazy(() => import("@/pages/onboarding/Onboarding"));
const OnboardingTag = lazy(
  () => import("@/pages/onboarding/OnboardingTag"),
);
const EditInterestPage = lazy(
  () => import("@/pages/mypage/EditInterestPage"),
);
const MyIntersListPage = lazy(
  () => import("@/pages/mypage/MyInterstListPage"),
);
const SettingPage = lazy(() => import("@/pages/mypage/SettingPage"));
const AskPage = lazy(() => import("@/pages/mypage/AskPage"));
const router = createBrowserRouter([
  {
    element: <SystemLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: "/edit", element: <EditInterestPage /> },
          { path: "/interested", element: <MyIntersListPage /> },
          { path: "/setting", element: <SettingPage /> },
          { path: "/ask", element: <AskPage /> },
        ],
      },
    ],
  },

  {
    element: <OnboardingLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/callback",
        element: <KakaoLogin />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      { path: "/onboarding/tag", element: <OnboardingTag /> },
    ],
  },
]);

export default router;
