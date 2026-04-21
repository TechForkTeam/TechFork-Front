import { FileText, Info, LockKeyhole, MessageSquare, Moon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SettingItem {
  icon: LucideIcon;
  label: string;
  isArrow?: boolean;
  isToggle?: boolean;
  version?: string;
  dark?: boolean;
  onClick?: () => void;
  onClickDark?: () => void;
}

interface GetSettingListDataParams {
  isDark: boolean;
  toggleTheme: () => void;
  onAskClick: () => void;
  onTerm: () => void;
}

export const getSettingListData = ({
  isDark,
  toggleTheme,
  onAskClick,
  onTerm,
}: GetSettingListDataParams): SettingItem[] => {
  return [
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
      version: "1.0.0",
    },
    {
      icon: FileText,
      label: "이용 약관",
      isArrow: true,
      onClick: onTerm,
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
      onClick: onAskClick,
    },
  ];
};
