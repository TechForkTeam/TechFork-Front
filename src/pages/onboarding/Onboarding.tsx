import { useNavigate } from "react-router-dom";
import CheckOff from "@assets/icons/check_off.svg";
import CheckOn from "@assets/icons/check_on.svg";
import { Button } from "../../shared/button/Button";
import { OnboardingHeader } from "./components/OnboardingHeader";
import { InputField } from "../../shared/InputField";
import { useOnboardingStore } from "../../store/useOnboardingStore";
import { cn } from "../../utils/cn";

export const Onboarding = () => {
  const navigate = useNavigate();
  const { nickname, aboutMe, setTemp, check, email } = useOnboardingStore();

  const handleNicknameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/g, "");

    setTemp({ nickname: filteredValue });
  };
  const isNicknameValid = nickname.length >= 2;
  const BtnAble = !isNicknameValid || !check;

  return (
    <div className=" ">
      <section className="flex flex-col  items-center ">
        <OnboardingHeader />
        <section className="bg-white rounded-lg shadow-ds50 flex flex-col items-center justify-center p-6 w-100 ">
          <h1 className="subtitle-sb-20 mb-4">회원 가입</h1>

          <InputField
            label={"닉네임"}
            placeholder={"닉네임을 입력하세요."}
            value={nickname || ""}
            onChange={handleNicknameChange}
          />

          <InputField
            label={"이메일"}
            placeholder={"이메일을 입력하세요."}
            value={email}
            disabled={true}
          />
          <InputField
            label={"한 줄 소개"}
            placeholder={"당신을 한 줄로 소개해보세요."}
            value={aboutMe}
            onChange={e => {
              const value = e.target.value.slice(0, 100);
              setTemp({ aboutMe: value });
            }}
          />

          <div className="flex items-center mr-auto mb-8">
            <img
              src={check ? CheckOn : CheckOff}
              alt="check"
              className="pr-2 size-7"
              onClick={() => {
                setTemp({ check: !check });
              }}
            />
            <p className="body-r-14 flex gap-1">
              <p className="text-blue-500">이용약관</p> 및
              <p className="text-blue-500">개인정보취급방침에</p>동의합니다.
            </p>
          </div>

          <Button
            onClick={() => {
              if (!BtnAble) {
                navigate("/onboarding/tag");
              }
            }}
            className={cn(
              " p-2.5",
              BtnAble && "bg-gray-200 cursor-not-allowed",
            )}
          >
            다음
          </Button>
        </section>
      </section>
    </div>
  );
};
