import { InputField } from "../../../shared/InputField";
import { Button } from "../../../shared/button/Button";

interface ProfileEditHEaderProps {
  onSubmit: () => void;
  onCancel: () => void;
  nickName: string;
  email: string;
  description: string;
}

export const ProfileEditHeader = ({
  onSubmit,
  onCancel,
  nickName,
  email,
  description,
}: ProfileEditHEaderProps) => {
  return (
    <div>
      <InputField
        key={"ss"}
        label={"닉네임"}
        placeholder={nickName}
        className="body-r-16"
      />
      <InputField
        key={"ss"}
        label={"이메일"}
        placeholder={email}
        className="body-r-16"
      />
      <InputField
        key={"ss"}
        label={"한줄 소개"}
        placeholder={description}
        className="body-r-16"
      />
      <div className="flex gap-4">
        <Button color={"grey1"} className="text-black" onClick={onCancel}>
          취소
        </Button>
        <Button onClick={onSubmit}>저장</Button>
      </div>
    </div>
  );
};
