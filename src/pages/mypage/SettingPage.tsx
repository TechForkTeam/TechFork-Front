import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  getSettingListData,
  LeaveModal,
  ProfileEditHeader,
  ProfileHeader,
  SettingList,
} from "@/features/mypage";
import { useGetMyProfile } from "@/shared/api/my";
import { useThemeToggle } from "@/shared/lib/useThemeToggle";

const SettingPage = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const { data: user } = useGetMyProfile();
  const { isDark, toggleTheme } = useThemeToggle();
  const settingListData = getSettingListData({
    isDark,
    toggleTheme,
    onAskClick: () => navigate("/ask"),
    onTerm: () => {
      window.open(
        "https://www.notion.so/lily-reptile-b33/334d0aa99dcf8066a9abc2e9a2aca4fd",
        "_blank",
        "noopener,noreferrer",
      );
    },
  });

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>계정 설정 | TechFork</title>
        <meta property="og:title" content="계정 설정 | TechFork" />
        <meta
          property="og:description"
          content="프로필 정보, 테마 설정, 서비스 정보를 관리해보세요."
        />
      </Helmet>

      <div className="px-20 pb-8">
        <section className="mt-16 mb-8 rounded-xl border border-normal bg-bgStrong p-8 font-strong">
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

        <section className="mb-8 rounded-xl border border-normal bg-bgStrong p-8 font-strong">
          <h2 className="mb-8 subtitle-sb-20">테마 및 서비스 정보</h2>
          {settingListData.map(item => (
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
          className="w-full cursor-pointer rounded-xl bg-bgStrong px-8 py-4 text-alert body-r-14"
          onClick={() => setIsModal(true)}
        >
          회원탈퇴
        </button>
        {isModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <LeaveModal onClose={() => setIsModal(false)} />
          </div>
        )}
      </div>
    </>
  );
};

export default SettingPage;
