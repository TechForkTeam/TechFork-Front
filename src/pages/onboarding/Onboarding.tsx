import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";

import CheckOn from "@assets/icons/Check_on.svg";
import CheckOff from "@assets/icons/Check_off.svg";
import { useState } from "react";
import { Button } from "../../components/button/Button";
import { OnboardingHeader } from "../../components/onboarding/OnboardingHeader";
import { InputField } from "../../components/InputField";
import { onboardingFields } from "../../constants/onboarding";

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

          {onboardingFields.map(item => {
            return (
              <InputField
                key={item.name}
                label={item.label}
                placeholder={item.placeholder}
              />
            );
          })}

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
