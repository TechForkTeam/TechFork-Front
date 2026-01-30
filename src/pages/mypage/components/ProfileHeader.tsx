import { Button } from "../../../shared/button/Button";

interface ProfileHeaderProps {
  onEdit: () => void;
  profileImage: string;
  nickName: string;
  email: string;
  description: string;
}

export const ProfileHeader = ({
  onEdit,
  profileImage,
  nickName,
  email,
  description,
}: ProfileHeaderProps) => {
  return (
    <div>
      <h2 className="mb-8 subtitle-sb-20">프로필</h2>
      <div className="flex gap-7 mb-7">
        <img
          src={profileImage}
          alt="profile image"
          className="rounded-full size-17"
        />
        <div className="flex flex-col gap-1">
          <p className="body-r-16">{nickName}</p>
          <p className="body-r-14 text-alternative">{email}</p>
          <p className="body-r-14 text-alternative">{description}</p>
        </div>
      </div>
      <Button
        color={"grey1"}
        textColor={"black"}
        className=" font-bold"
        onClick={onEdit}
      >
        프로필 편집
      </Button>
    </div>
  );
};
