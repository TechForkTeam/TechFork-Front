import PopOn from "@/assets/icons/pop-on.svg";
import PopOff from "@/assets/icons/pop-off.svg";
import type { CompanyResponseDto, CompanyType } from "../../../types/company";
import { HomeCompanySelectBtn } from "./HomeCompanySelectBtn";
import { CompanyItem } from "./CompanyItem";
import { CompaniesModal } from "./CompaniesModal";

interface CompanyFilterListProps {
  companies: string[];
  companyData: CompanyResponseDto;
  maxCompany: CompanyType[];
  modal: boolean;
  setModal: (val: boolean | ((pre: boolean) => boolean)) => void;
  toggleCompany: (company: string) => void;
}

export const CompanyFilterList = ({
  companies,
  companyData,
  maxCompany,
  modal,
  setModal,
  toggleCompany,
}: CompanyFilterListProps) => {
  return (
    <>
      <div className="flex items-center gap-4 flex-wrap pb-6">
        {companyData.companies.length !== 0 && (
          <>
            <div className="body-sb-14">선택된 기업:</div>
            {companies.map(company => {
              const matchedCompany = companyData.companies.find(
                item => item.company === company,
              );
              return (
                <HomeCompanySelectBtn
                  key={company}
                  company={company}
                  logoUrl={matchedCompany?.logoUrl || ""}
                  onClick={e => e.stopPropagation()}
                />
              );
            })}
          </>
        )}
      </div>

      <section className="mb-12 flex items-center justify-center gap-12 relative flex-wrap">
        {maxCompany.map(item => (
          <CompanyItem
            key={item.company}
            company={item.company}
            logoUrl={item.logoUrl}
            newDot={item.hasNewPost}
            selected={companies.includes(item.company)}
            onClick={() => toggleCompany(item.company)}
          />
        ))}
        <img
          src={modal ? PopOn : PopOff}
          alt="toggle modal"
          className="mb-6 cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            setModal(pre => !pre);
          }}
        />
        {modal && (
          <div
            onClick={e => e.stopPropagation()}
            className="absolute top-25 right-40 z-50"
          >
            <CompaniesModal companyData={companyData} />
          </div>
        )}
      </section>
    </>
  );
};
