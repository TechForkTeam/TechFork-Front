import { Moon, Info, FileText, LockKeyhole, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetMyProfile } from "@/lib/my";
import { useThemeToggle } from "@/hooks/useThemToggle";
import { ProfileHeader } from "@/pages/mypage/components/ProfileHeader";
import { ProfileEditHeader } from "@/pages/mypage/components/ProfileEditHeader";
import { SettingList } from "@/pages/mypage/components/SettingList";
import { LeaveModal } from "@/pages/mypage/components/LeaveModal";
import { Helmet } from "react-helmet-async";

interface SettingItem {
  icon: LucideIcon;
  label: string;
  isArrow?: boolean;
  isToggle?: boolean;
  version?: string;
  dark?: boolean;
  onClick?: () => void;
  onClickDark?: () => void;
}
const SettingPage = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [IsModal, setIsModal] = useState<boolean>(false);
  const { data: user } = useGetMyProfile();
  const { isDark, toggleTheme } = useThemeToggle();
  const SETTING_LIST_DATA: SettingItem[] = [
    {
      icon: Moon,
      label: "다크 모드",
      onClickDark: toggleTheme,
      dark: isDark,
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

  return (
    <>
      <Helmet>
        <title>관심사 수정하기 | TechFork</title>
        <meta property="og:title" content="계정 설정 | TechFork" />
        <meta
          property="og:description"
          content="프로필 정보, 테마 설정, 서비스 정보를 관리하세요."
        />
      </Helmet>

      <div className="px-20 pb-8">
        <section className="mt-16 mb-8  bg-bgStrong font-strong p-8 rounded-xl border border-normal">
          {!isEdit ? (
            <ProfileHeader
              onEdit={() => setIsEdit(true)}
              nickName={user?.nickName}
              description={user?.description ?? ""}
              profileImage={user?.profileImage}
              email={user?.email}
            />
          ) : (
            <ProfileEditHeader
              nickName={user?.nickName}
              description={user?.description ?? ""}
              email={user?.email}
              onCancel={() => setIsEdit(false)}
              onSubmit={() => {
                setIsEdit(false);
              }}
            />
          )}
        </section>

        <section className="bg-bgStrong font-strong p-8 rounded-xl border border-normal mb-8">
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
              onClickDark={item.onClickDark}
            />
          ))}
        </section>

        <button
          className="bg-bgStrong rounded-xl px-8 py-4 w-full text-alert body-r-14 cursor-pointer"
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
    </>
  );
};

export default SettingPage;
