import { Header } from "../../components/Header";

export const LoginPage = () => {
  return (
    <div className=" min-h-screen flex flex-col  items-center justify-center">
      <Header />

      <section className=" w-full flex flex-col items-center  flex-1">
        <div className="flex gap-2 large-title-32 mb-8  items-center ">
          <p>개발자를 위한 모든 인사이트,</p>
          <p className="text-blue-500">테크포크</p>
        </div>
        <div className="body-sb-16 flex flex-col justify-center items-center text-alternative mb-16">
          <p>흩어진 기술 블로그를 한 곳에 모아,</p>
          <p>커리어의 새로운 분기점을 열다.</p>
        </div>

        <div className="flex flex-col gap-4 mb-16">
          <button className="w-80 bg-kakao h-13 text-black rounded-xl body-r-16 flex gap-2 items-center justify-center cursor-pointer">
            <img
              src="/src/assets/images/kakao.png"
              alt="kakao login"
              className="size-7"
            />
            카카오 로그인
          </button>
          <button className="w-80 bg-black h-13 text-white rounded-xl body-r-16 flex gap-2 items-center justify-center cursor-pointer">
            <img
              src="/src/assets/images/apple.png"
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
