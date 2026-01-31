import { createBrowserRouter } from "react-router-dom";
import { OnboardingLayout } from "./layout/OnboardingLayout";
import { LoginPage } from "./pages/Login/LoginPage";
import { Onboarding } from "./pages/onboarding/Onboarding";
import { OnboardingTag } from "./pages/onboarding/OnboardingTag";
import { SystemLayout } from "./layout/SystemLayout";
import { HomePage } from "./pages/home/HomePage";
import { MyIntersListPage } from "./pages/mypage/MyInterstListPage";
import { SettingPage } from "./pages/mypage/SettingPage";
import { AskPage } from "./pages/mypage/AskPage";
import { KakaoLogin } from "./pages/Login/KakaoLogin";
import { EditInterestPage } from "./pages/mypage/EditInterestPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SystemLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/edit",
        element: <EditInterestPage />,
      },
      { path: "/interested", element: <MyIntersListPage /> },
      { path: "/setting", element: <SettingPage /> },
      { path: "/ask", element: <AskPage /> },
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
