import { useState } from "react";
import { usePatchMyProfile } from "../../../lib/my";
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
  const handlePatch = usePatchMyProfile(onSubmit);

  const [name, setName] = useState(nickName);
  const [introduce, setIntroduce] = useState(description);
  console.log(name, introduce);

  return (
    <div>
      <InputField
        label={"닉네임"}
        placeholder={nickName}
        className="body-r-16"
        onChange={e => setName(e.target.value)}
      />
      <InputField
        label={"이메일"}
        placeholder={email}
        className="body-r-16"
        disabled={true}
      />
      <InputField
        label={"한줄 소개"}
        placeholder={description}
        className="body-r-16"
        onChange={e => setIntroduce(e.target.value)}
      />
      <div className="flex gap-4">
        <Button color={"grey1"} className="text-black" onClick={onCancel}>
          취소
        </Button>
        <Button
          onClick={() =>
            handlePatch.mutate(
              {
                nickName: name,
                description: introduce,
              },
              // { onSuccess: onSubmit() },
            )
          }
        >
          저장
        </Button>
      </div>
    </div>
  );
};
