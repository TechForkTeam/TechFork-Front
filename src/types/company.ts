export type CompanyType = {
  company: string;
  hasNewPost: boolean;
  logoUrl: string;
};

export type CompanyResponseDto = {
  companies: CompanyType[];
  totalNumber: string;
};
