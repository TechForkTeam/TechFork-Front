import { OnboardingLayout } from "@/widgets/layout/OnboardingLayout";
import { PrivateRoute } from "@/widgets/layout/PrivateRoiute";
import { SystemLayout } from "@/widgets/layout/SystemLayout";

import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Lazy Loading 적용
const HomePage = lazy(() => import("@/app/pages/home/HomePage"));
const LoginPage = lazy(() => import("@/app/pages/login/LoginPage"));
const KakaoLogin = lazy(() => import("@/app/pages/login/KakaoLogin"));
const Onboarding = lazy(() => import("@/app/pages/onboarding/Onboarding"));
const OnboardingTag = lazy(
  () => import("@/app/pages/onboarding/OnboardingTag"),
);
const EditInterestPage = lazy(
  () => import("@/app/pages/mypage/EditInterestPage"),
);
const MyIntersListPage = lazy(
  () => import("@/app/pages/mypage/MyInterstListPage"),
);
const SettingPage = lazy(() => import("@/app/pages/mypage/SettingPage"));
const AskPage = lazy(() => import("@/app/pages/mypage/AskPage"));
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
