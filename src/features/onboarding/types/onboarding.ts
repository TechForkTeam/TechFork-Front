export type OnboardingRequestType = {
  nickname: string;
  email: string;
  description: string;
  interests: InterestType[];
};

export type InterestType = {
  category: string;
  keywords: string[];
};
