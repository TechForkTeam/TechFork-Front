import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { LoginPage } from "./pages/Login/LoginPage";
import { Onboarding } from "./pages/onboarding/Onboarding";
import { OnboardingTag } from "./pages/onboarding/OnboardingTag";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        // index:true,element:<HomePage/>
        path: "/login",
        element: <LoginPage />,
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
