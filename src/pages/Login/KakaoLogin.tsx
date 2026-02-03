import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import { useOnboardingStore } from "../../store/useOnboardingStore";
import { toast } from "react-toastify";
import Alert from "@/assets/icons/alert2.svg";

export const KakaoLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { setTemp } = useOnboardingStore();

  useEffect(() => {
    const token = searchParams.get("token");
    const isMember = searchParams.get("registered");
    const email = searchParams.get("email") ?? undefined;
    // console.log(email);
    setTemp({ email });
    setUser({ accessToken: token, isNewMember: isMember });
    if (!token) {
      toast.info("로그인에 실패했어요. 다시 로그인해 주세요.", {
        icon: <img src={Alert} alt="login으로 이동" />,
      });

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
