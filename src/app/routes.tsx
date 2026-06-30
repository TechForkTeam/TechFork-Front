import { NotFoundPage } from "@/pages/NotFound";
import { OnboardingLayout } from "@/widgets/layout/OnboardingLayout";
import { PrivateRoute } from "@/widgets/layout/PrivateRoiute";
import { SystemLayout } from "@/widgets/layout/SystemLayout";
import RouteErrorElement from "@/app/ui/RouteErrorElement";

import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/home/HomePage";

// Lazy Loading 적용
const LoginPage = lazy(() => import("@/pages/login/LoginPage"));
const KakaoLogin = lazy(() => import("@/pages/login/KakaoLogin"));
const Onboarding = lazy(() => import("@/pages/onboarding/Onboarding"));
const OnboardingTag = lazy(() => import("@/pages/onboarding/OnboardingTag"));
const EditInterestPage = lazy(() => import("@/pages/mypage/EditInterestPage"));
const MyIntersListPage = lazy(() => import("@/pages/mypage/MyInterstListPage"));
const SettingPage = lazy(() => import("@/pages/mypage/SettingPage"));
const AskPage = lazy(() => import("@/pages/mypage/AskPage"));
const router = createBrowserRouter([
  {
    element: <SystemLayout />,
    errorElement: <RouteErrorElement />,
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
    path: "*",
    element: <NotFoundPage />,
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
