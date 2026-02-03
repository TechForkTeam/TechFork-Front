import { Moon, Info, FileText, LockKeyhole, MessageSquare } from "lucide-react";

import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProfileHeader } from "./components/ProfileHeader";

import { LeaveModal } from "./components/LeaveModal";
import { ProfileEditHeader } from "./components/ProfileEditHeader";
import { SettingList } from "./components/SettingList";
import { useGetMyProfile } from "../../lib/my";
interface SettingItem {
  icon: LucideIcon;
  label: string;
  isArrow?: boolean;
  isToggle?: boolean;
  version?: string;
  dark?: boolean;
  onClick?: () => void;
}
export const SettingPage = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [IsModal, setIsModal] = useState<boolean>(false);
  const [dark, setIsDark] = useState(false);
  const SETTING_LIST_DATA: SettingItem[] = [
    {
      icon: Moon,
      label: "다크 모드",
      onClick: () => setIsDark(pre => !pre),
      dark: dark,
      isToggle: true,
    },
    {
      icon: Info,
      label: "서비스 버전",
      onClick: () => console.log("다크모드"),
      version: "1.0.0",
    },
    {
      icon: FileText,
      label: "이용 약관",
      isArrow: true,
    },
    {
      icon: LockKeyhole,
      label: "개인정보 처리방침",
      isArrow: true,
    },
    {
      icon: MessageSquare,
      label: "문의 하기",
      isArrow: true,
      onClick: () => navigate("/ask"),
    },
  ];
  const { data: user } = useGetMyProfile();
  // console.log(user);
  return (
    <div className="px-20 pb-8">
      <section className="mt-16 mb-8  bg-white p-8 rounded-xl border border-bgNormal">
        {!isEdit ? (
          <ProfileHeader
            onEdit={() => setIsEdit(true)}
            nickName={user.nickName}
            description={user.description ?? ""}
            profileImage={user.profileImage}
            email={user.email}
          />
        ) : (
          <ProfileEditHeader
            nickName={user.nickName}
            description={user.description ?? ""}
            email={user.email}
            onCancel={() => setIsEdit(false)}
            onSubmit={() => {
              setIsEdit(false);
            }}
          />
        )}
      </section>

      <section className="bg-white p-8 rounded-xl border border-bgNormal mb-8">
        <h2 className="subtitle-sb-20 mb-8">테마 및 서비스 정보</h2>
        {SETTING_LIST_DATA.map(item => (
          <SettingList
            key={item.label}
            icon={item.icon}
            label={item.label}
            isArrow={item.isArrow}
            onClick={item.onClick}
            version={item.version}
            isToggle={item.isToggle}
            dark={item.dark}
          />
        ))}
      </section>

      <button
        className="bg-white rounded-xl px-8 py-4 w-full text-alert body-r-14 cursor-pointer"
        onClick={() => setIsModal(true)}
      >
        회원탈퇴
      </button>
      {IsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <LeaveModal onClose={() => setIsModal(false)} />
        </div>
      )}
    </div>
  );
};
