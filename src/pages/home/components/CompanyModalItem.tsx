import { cn } from "../../../utils/cn";
interface CompanyModalItemProps {
  company?: string;
  logoUrl?: string;
  selected: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export const CompanyModalItem = ({
  company = "company",
  selected = false,
  logoUrl,
  onClick,
}: CompanyModalItemProps) => {
  return (
    <div
      className={cn(
        "flex flex-col text-alternative items-center cursor-pointer  border-2 border-transparent justify-center  py-2.5 px-4  rounded-2xl overflow-hidden",
        selected && "border-2 border-blue-500 bg-blue-50 text-black",
      )}
      onClick={onClick}
    >
      <div className="p-3 rounded-2xl border border-bgNormal aspect-square   bg-white  ">
        <img src={logoUrl} alt="company" className="object-corver size-8" />
      </div>
      <p
        className="body-r-14 text-center h-10 line-clamp-2  wrap-break-word
    break-all"
      >
        {company}
      </p>
    </div>
  );
};
