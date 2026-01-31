//문의 접수 확인 modal
import Flight from "@/assets/icons/flight.svg";
import { Button } from "../../../shared/button/Button";

interface AskConfirmModalProps {
  onCancel: () => void;
}
export const AskConfirmModal = ({ onCancel }: AskConfirmModalProps) => {
  return (
    <div className="bg-white p-8 rounded-2xl border flex border-bgNormal flex-col items-center justify-center">
      <div className="bg-blue-50 rounded-full size-19 flex items-center justify-center mb-8">
        <img src={Flight} alt="문의 접수하기" />
      </div>
      <p className="subtitle-sb-20 mb-4">문의가 접수되었습니다.</p>
      <p className="body-r-14 text-alternative mb-8">
        작성하신 이메일로 영업일 기준 1~2일 내에 답변드리겠습니다.
      </p>

      <Button
        size={"md"}
        color={"default"}
        className="rounded-xl"
        onClick={onCancel}
      >
        확인
      </Button>
    </div>
  );
};
