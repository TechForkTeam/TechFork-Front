import { CompanyModalItem } from "./CompanyModalItem";
import { useCompanyStore } from "../../../store/uesCompanyStore";
import { useRef } from "react";
import type { CompanyResponseDto } from "../../../types/company";

interface CompaniesModalProps {
  companyData: CompanyResponseDto;
}

export const CompaniesModal = ({ companyData }: CompaniesModalProps) => {
  const { toggleCompany, companies } = useCompanyStore();
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    headerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
  console.log(companies);
  return (
    <section
      className="relative h-130 w-125  shadow-ds100 rounded-2xl overflow-hidden bg-white z-250"
      onClick={scrollToTop}
      ref={headerRef}
    >
      <div className="h-full overflow-y-auto ">
        {/* header */}
        <div className="sticky top-0 z-10 bg-sub-500 px-4 pt-4">
          <div className="flex justify-between border-b border-bgNormal  pb-4 mb-4">
            <h4 className="body-sb-18">전체 기업</h4>
            <p>{companyData.totalNumber}개</p>
          </div>
        </div>

        {/* content */}
        <div className="px-4 pb-4">
          <div className="grid grid-cols-4 gap-4 place-items-center">
            {companyData.companies.map(item => (
              <CompanyModalItem
                key={item.company}
                company={item.company}
                logoUrl={item.logoUrl}
                selected={companies.includes(item.company)}
                onClick={() => toggleCompany(item.company)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
