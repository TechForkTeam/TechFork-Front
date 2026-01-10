import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";

import CheckOn from "@assets/icons/Check_on.svg";
import CheckOff from "@assets/icons/Check_off.svg";
import { useState } from "react";
import { Button } from "../../components/button/Button";
import { OnboardingHeader } from "../../components/onboarding/OnboardingHeader";

export const Onboarding = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  return (
    <div className="flex flex-col  items-center ">
      <Header className="pb-2" />
      <section className="flex flex-col  items-center ">
        <OnboardingHeader />
        <section className="bg-white rounded-lg shadow-ds50 flex flex-col items-center justify-center p-6 w-100 ">
          <h1 className="subtitle-sb-20 mb-4">회원 가입</h1>
          <div className="w-full">
            <p className="mb-3 body-sb-16">닉네임</p>
            <div className="w-full  rounded-xl mb-5">
              <input
                type="text"
                className="w-full p-3 body-r-14  rounded-xl border  border-[#E5E8EB] bg-[#F7F8F9] focus:outline-none focus:border-blue-300 "
                placeholder="닉네임을 입력하세요"
              />
            </div>
          </div>
          <div className="w-full">
            <p className="mb-3 body-sb-16">이메일</p>
            <div className="w-full  rounded-xl mb-5">
              <input
                type="text"
                className="w-full p-3 body-r-14  rounded-xl border  border-[#E5E8EB] bg-[#F7F8F9] focus:outline-none focus:border-blue-300 "
                placeholder="이메일을 입력하세요"
              />
            </div>
          </div>
          <div className="w-full">
            <p className="mb-3 body-sb-16">한 줄 소개</p>
            <div className="w-full  rounded-xl mb-5">
              <input
                type="text"
                className="w-full p-3 body-r-14  rounded-xl border  border-[#E5E8EB] bg-[#F7F8F9] focus:outline-none focus:border-blue-300 "
                placeholder="당신을 한 줄로 소개해보세요"
              />
            </div>
          </div>

          <div className="flex items-center mr-auto mb-8">
            <img
              src={click ? CheckOn : CheckOff}
              alt="check"
              className="pr-2 size-7"
              onClick={() => setClick(pre => !pre)}
            />
            <p className="body-r-14 flex gap-1">
              <p className="text-blue-500">이용약관</p> 및
              <p className="text-blue-500">개인정보취급방침에</p>동의합니다.
            </p>
          </div>

          <Button onClick={() => navigate("/onboarding/tag")} className="p-2.5">
            다음
          </Button>
        </section>
      </section>
    </div>
  );
};
