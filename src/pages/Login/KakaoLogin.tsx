import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import { useOnboardingStore } from "../../store/useOnboardingStore";

export const KakaoLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { setTemp } = useOnboardingStore();

  useEffect(() => {
    const token = searchParams.get("token");
    const isMember = searchParams.get("registered");
    const email = searchParams.get("email") ?? undefined;
    console.log(email);
    setTemp({ email });
    setUser({ accessToken: token, isNewMember: isMember });
    if (!token) {
      navigate("/login");
    }
    if (isMember === "false") {
      navigate("/onboarding");
    } else {
      navigate("/");
    }
  }, []);

  console.log(searchParams);
  return <div></div>;
};
