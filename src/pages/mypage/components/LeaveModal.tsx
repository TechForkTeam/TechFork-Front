import { Button } from "../../../shared/button/Button";
import Close from "@/assets/icons/close_black.svg";
import Warning from "@/assets/icons/warning.svg";
import CheckOn from "@/assets/icons/check_on.svg";
import CheckOff from "@/assets/icons/check_off.svg";
import { useState } from "react";
import { useDeleteAccount } from "../../../lib/onboarding";
import useUserStore from "../../../store/useUserStore";
interface LeaveModalProps {
  onClose?: () => void;
}

export const LeaveModal = ({ onClose }: LeaveModalProps) => {
  const [check, setCheck] = useState<boolean>(false);
  const { logout } = useUserStore();
  const handleWithdrawal = () => {
    logout();
    onClose?.();
  };
  const { mutate } = useDeleteAccount(handleWithdrawal);

  return (
    <>
      <div
        className="fixed inset-0 bg-[rgba(27,33,42,0.7)] z-40 cursor-pointer"
        onClick={onClose}
      ></div>
      <div className="bg-white p-8 rounded-xl w-104  z-500">
        <section>
          <div className="flex mb-5">
            <h3 className="subtitle-sb-20">회원탈퇴</h3>
            <img
              src={Close}
              alt="취소하기"
              className="ml-auto cursor-pointer"
              onClick={onClose}
            />
          </div>
          <div className="flex gap-2 mb-4">
            <img src={Warning} alt="주의" />
            <p>정말로 탈퇴하시겠습니까?</p>
          </div>
          <ul className="list-disc  marker:text-xs marker:text-alternative pl-5 body-r-14 text-alternative mb-4">
            <li>회원정보 및 이용기록은 즉시 삭제되며 복구할 수 없습니다.</li>
            <li>동일 이메일로 재가입이 가능합니다. </li>
          </ul>

          <div className="bg-sub-400 p-2 flex gap-2 rounded-lg mb-5">
            <img
              src={check ? CheckOn : CheckOff}
              alt=""
              className="size-5"
              onClick={() => setCheck(pre => !pre)}
            />
            <p className="body-r-14">
              위 내용을 모두 확인했으며, 회원탈퇴에 동의합니다.
            </p>
          </div>
          <div className="gap-2 flex">
            <Button
              color={"grey1"}
              textColor={"black"}
              onClick={mutate}
              disabled={!check}
            >
              회원탈퇴
            </Button>
            <Button onClick={onClose} disabled={!check}>
              취소
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};
