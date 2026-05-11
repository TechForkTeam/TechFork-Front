import { Button } from "@/shared/ui/button/Button";
import { useNavigate } from "react-router-dom";
import { CircleAlert } from "lucide-react";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-dvh flex items-center justify-center pb-20">
      <div className="flex justify-center flex-col items-center font-assistive text-blue-500">
        <CircleAlert className="size-36 mb-10" />
        <p className="mb-5 ">요청하신 페이지를 찾을 수 없습니다.</p>
        <p className="mb-5 text-center ">
          요청하신 주소가 잘못되었거나, 사용이 일시 중단되어 요청하신 페이지를
          찾을 수 없습니다.
          <br /> 서비스 이용에 불편을 드려 죄송합니다.
        </p>
        <div className="flex gap-3">
          <Button
            size={"md"}
            className="bg-alternative"
            onClick={() => navigate(-1)}
          >
            이전 페이지로
          </Button>
          <Button
            size={"md"}
            className="bg-alternative"
            onClick={() => navigate("/")}
          >
            홈 바로가기
          </Button>
        </div>
      </div>
    </div>
  );
};
