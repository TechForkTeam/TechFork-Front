import { OnboardingLayout } from "@/layout/OnboardingLayout";
import { PrivateRoute } from "@/layout/PrivateRoiute";
import { SystemLayout } from "@/layout/SystemLayout";
// import { HomePage } from "@/pages/home/HomePage";
// import { KakaoLogin } from "@/pages/Login/KakaoLogin";
// import { LoginPage } from "@/pages/Login/LoginPage";
// import { AskPage } from "@/pages/mypage/AskPage";
// import { EditInterestPage } from "@/pages/mypage/EditInterestPage";
// import { MyIntersListPage } from "@/pages/mypage/MyInterstListPage";
// import { SettingPage } from "@/pages/mypage/SettingPage";
// import { Onboarding } from "@/pages/onboarding/Onboarding";
// import { OnboardingTag } from "@/pages/onboarding/OnboardingTag";

import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Lazy Loading 적용
const HomePage = lazy(() =>
  import("@/pages/home/HomePage").then(module => ({
    default: module.HomePage,
  })),
);
const LoginPage = lazy(() =>
  import("@/pages/Login/LoginPage").then(module => ({
    default: module.LoginPage,
  })),
);
const KakaoLogin = lazy(() =>
  import("@/pages/Login/KakaoLogin").then(module => ({
    default: module.KakaoLogin,
  })),
);
const Onboarding = lazy(() =>
  import("@/pages/onboarding/Onboarding").then(module => ({
    default: module.Onboarding,
  })),
);
const OnboardingTag = lazy(() =>
  import("@/pages/onboarding/OnboardingTag").then(module => ({
    default: module.OnboardingTag,
  })),
);
const EditInterestPage = lazy(() =>
  import("@/pages/mypage/EditInterestPage").then(module => ({
    default: module.EditInterestPage,
  })),
);
const MyIntersListPage = lazy(() =>
  import("@/pages/mypage/MyInterstListPage").then(module => ({
    default: module.MyIntersListPage,
  })),
);
const SettingPage = lazy(() =>
  import("@/pages/mypage/SettingPage").then(module => ({
    default: module.SettingPage,
  })),
);
const AskPage = lazy(() =>
  import("@/pages/mypage/AskPage").then(module => ({
    default: module.AskPage,
  })),
);
const router = createBrowserRouter([
  {
    element: (
      // <Suspense fallback={<Loading />}>
      <SystemLayout />
      // </Suspense>
    ),
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
    element: (
      // <Suspense fallback={<Loading />}>
      <OnboardingLayout />
      // </Suspense>
    ),
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
