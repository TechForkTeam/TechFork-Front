//나와맞는게시글
export type MyProfileType = {
  nickName: string;
  description: string;
};

export type InterestTypeDto = {
  category: string;
  keywords: string[];
};

export type InterestDataDto = {
  interests: InterestTypeDto[];
};

export type InterestResponseDto = {
  data: InterestDataDto;
  code: string;
  isSuccess: boolean;
  message: string;
};
