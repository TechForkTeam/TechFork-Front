import Close from "@/assets/icons/close.svg";
import { useCompanyStore } from "../../../store/uesCompanyStore";

interface HomeCompanySelectBtnProps {
  company: string;
  onClick: (e: React.MouseEvent) => void;
  logoUrl: string;
}

export const HomeCompanySelectBtn = ({
  company,
  onClick,
  logoUrl,
}: HomeCompanySelectBtnProps) => {
  const { toggleCompany } = useCompanyStore();

  return (
    <div
      className="flex gap-[6px] items-center py-2 px-3 border border-bgNormal bg-white w-fit rounded-[20px]"
      onClick={onClick}
    >
      <img src={logoUrl} alt="company" className="size-5" />
      <p className="text-[13px]">{company}</p>
      <img
        src={Close}
        alt="close button"
        onClick={() => toggleCompany(company)}
        className="cursor-pointer size-5"
      />
    </div>
  );
};
