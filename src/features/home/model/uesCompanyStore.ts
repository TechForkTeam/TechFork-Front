import { create } from "zustand";
interface CompanyStore {
  companies: string[];
  setCompanies: (companies: string[]) => void;
  toggleCompany: (company: string) => void;
  resetCompanies: () => void;
}
export const useCompanyStore = create<CompanyStore>(set => ({
  companies: [],

  setCompanies: companies => set({ companies }),

  toggleCompany: company =>
    set(state => ({
      companies: state.companies.includes(company)
        ? state.companies.filter(item => item !== company)
        : [...state.companies, company],
    })),

  resetCompanies: () => set({ companies: [] }),
}));
