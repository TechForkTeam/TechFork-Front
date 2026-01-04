import { Header } from "../../components/Header";

import CheckOn from "@assets/icons/Check_on.svg";

export const Onboarding = () => {
  return (
    <div className="flex flex-col  items-center ">
      <Header className="pb-5" />
      <section className="flex flex-col  items-center ">
        <div className="flex gap-4 mb-8 justify-center">
          <div className="flex gap-4 items-center ">
            <span className="size-9 rounded-full bg-blue-500 relative">
              <p className="absolute left-3.5 top-1 text-white">1</p>
            </span>

            <p className="body-r-18 text-blue-500">기본 정보</p>
          </div>

          <span className="w-19 h-px bg-sub-800 mt-5"></span>

          <div className="flex gap-4 items-center ">
            <span className="size-9 rounded-full bg-assistive relative">
              <p className="absolute left-3.5 top-1 text-white">1</p>
            </span>

            <p className="body-r-18 text-assistive">관심 분야</p>
          </div>
        </div>

        <section className="bg-white rounded-lg shadow-ds50 flex flex-col items-center justify-center p-8 w-116 ">
          <p className="title-sb-24">회원 가입</p>
          <div className="w-full">
            <p className="mb-2 body-sb-18">닉네임</p>
            <div className="w-full  rounded-xl border  border-[#E5E8EB] bg-[#F7F8F9] mb-5">
              <input
                type="text"
                className="w-full p-4 body-r-16"
                placeholder="닉네임을 입력하세요"
              />
            </div>
          </div>
          <div className="w-full">
            <p className="mb-2 body-sb-18">닉네임</p>
            <div className="w-full  rounded-xl border  border-[#E5E8EB] bg-[#F7F8F9] mb-5">
              <input
                type="text"
                className="w-full p-4 body-r-16"
                placeholder="닉네임을 입력하세요"
              />
            </div>
          </div>
          <div className="w-full">
            <p className="mb-2 body-sb-18">닉네임</p>
            <div className="w-full  rounded-xl border  border-[#E5E8EB] bg-[#F7F8F9] mb-5">
              <input
                type="text"
                className="w-full p-4 body-r-16"
                placeholder="닉네임을 입력하세요"
              />
            </div>
          </div>

          <div className="flex items-center mr-auto mb-4">
            <img src={CheckOn} alt="check" className="pr-2" />
            <p className="body-r-16 flex gap-1">
              <p className="text-blue-500">이용약관</p> 및
              <p className="text-blue-500">개인정보취급방침에</p>동의합니다
            </p>
          </div>
          <button className="w-full rounded-lg text-white bg-blue-500 p-4">
            다음
          </button>
        </section>
        <div className="flex gap-2 my-4">
          <p>계정이 있으신가요?</p>
          <p className="body-sb-16 text-blue-500">로그인</p>
        </div>
      </section>
    </div>
  );
};
