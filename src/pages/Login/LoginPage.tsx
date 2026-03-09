import Apple from "@/assets/images/apple.png";
import DarkApple from "@/assets/images/apple_dark.png";
import Kakao from "@/assets/images/kakao.png";
import { getOAuthUrl, type OAuthProvider } from "../../constants/login";
import { useThemeToggle } from "../../hooks/useThemToggle";
import clsx from "clsx";

export const LoginPage = () => {
  const handleLogin = (provider: OAuthProvider) => {
    window.location.assign(getOAuthUrl(provider));
  };

  const { isDark } = useThemeToggle();
  return (
    <div className=" flex flex-col  items-center justify-center">
      <section className=" w-full flex flex-col items-center  flex-1">
        <div className="flex gap-2 large-title-32 mb-8  items-center ">
          <p className="font-strong">개발자를 위한 모든 인사이트,</p>
          <p className="text-blue-500">테크포크</p>
        </div>
        <div className="body-sb-16 flex flex-col justify-center items-center font-alternative mb-16">
          <p>흩어진 기술 블로그를 한 곳에 모아,</p>
          <p>커리어의 새로운 분기점을 열다.</p>
        </div>

        <div className="flex flex-col gap-4 mb-16">
          <button
            className="w-80 bg-kakao h-13 text-black rounded-xl body-r-16 flex gap-2 items-center justify-center cursor-pointer"
            onClick={() => handleLogin("KAKAO")}
          >
            <img src={Kakao} alt="kakao login" className="size-7" />
            카카오 로그인
          </button>
          <button
            className={clsx(
              "w-80 h-13  rounded-xl body-r-16 flex gap-2 items-center justify-center cursor-pointer",
              isDark ? "bg-white text-black " : "bg-black text-white",
            )}
            onClick={() => handleLogin("APPLE")}
          >
            <img
              src={isDark ? DarkApple : Apple}
              alt="apple login"
              className="size-7 "
            />
            Apple 로그인
          </button>
        </div>
      </section>
    </div>
  );
};
