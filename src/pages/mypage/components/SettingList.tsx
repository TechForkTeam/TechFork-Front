// import Arrow from "@assets/icons/arrow_right.svg";
import ToggleOn from "@assets/images/toggle_on.png";
import ToggleOff from "@assets/images/toggle_off.png";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
interface SettingListProps {
  icon: LucideIcon;
  label: string;
  isArrow?: boolean;
  onClick?: () => void;
  version?: string;
  isToggle?: boolean;
  dark?: boolean;
  onClickDark?: () => void;
}

export const SettingList = ({
  icon: Icon,
  label,
  isArrow,
  onClick,
  version,
  isToggle,
  dark,
  onClickDark,
}: SettingListProps) => {
  return (
    <div
      className="flex gap-4 items-center py-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-blue-50 size-11 rounded-sm flex items-center justify-center text-blue-500">
        <Icon size={20} aria-label={label} />
      </div>

      <div>
        <p>{label}</p>
        <p className="detail-r-12 font-alternative">{version}</p>
      </div>
      {isArrow && (
        <div className="ml-auto font-strong">
          <ChevronRight />
        </div>
        // <img src={Arrow} alt={label} className="ml-auto " />
      )}
      {isToggle && (
        <img
          src={dark ? ToggleOn : ToggleOff}
          alt={label}
          className="ml-auto "
          onClick={onClickDark}
        />
      )}
    </div>
  );
};
