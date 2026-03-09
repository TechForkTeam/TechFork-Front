import { useEffect, useState } from "react";
import { Button } from "../../shared/button/Button";
import { InputField } from "../../shared/InputField";
import { useGetMyProfile } from "../../lib/my";
import { AskConfirmModal } from "./components/AskConfirmModal";
import { ASK_MAP } from "../../constants/mypage";
import { useThemeToggle } from "../../hooks/useThemToggle";
import clsx from "clsx";

export const AskPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { data: user } = useGetMyProfile();
  //문의 유형 모달
  const [isAsk, setIsAsk] = useState(false);
  //문의하기
  const [askContent, setIsContent] = useState("");
  //제목
  const [title, setTitle] = useState("");
  //문의내용
  const [content, setContent] = useState("");
  // 확인 모달
  const [confirmModal, setIsConfirmModal] = useState(false);

  const { isDark } = useThemeToggle();

  const activeBtn =
    title.length > 2 && content.length > 2 && askContent.length > 0;

  const handleAsk = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    setIsContent(value);
    setIsAsk(false);
  };

  const handleSubmitForm = () => {
    setIsConfirmModal(true);
    setTitle("");
    setIsContent("");
    setContent("");
  };

  return (
    <div className="px-20 pb-8 font-strong">
      <section className="mt-16 mb-8 bg-bgStrong p-8 rounded-xl border border-normal">
        <h3 className="body-sb-18 mb-1">문의하기</h3>
        <p className="body-r-14 font-alternative">
          서비스 이용 중 불편한 점이나 문의사항을 남겨주세요.
        </p>
      </section>
      {confirmModal ? (
        <AskConfirmModal onCancel={() => setIsConfirmModal(false)} />
      ) : (
        <>
          <section className=" bg-bgStrong mb-8 p-8 rounded-xl border border-normal">
            <InputField
              label={"답변 받을 이메일"}
              placeholder={user.email}
              disabled={true}
              className="body-r-16"
              isDot={true}
            />
            <div className="relative" onClick={() => setIsAsk(pre => !pre)}>
              <InputField
                label={"문의 유형"}
                placeholder={"문의유형을 선택해주세요."}
                className="body-r-16"
                isDot={true}
                value={askContent}
              />
              {isAsk && (
                <div
                  className={clsx(
                    "absolute top-8 w-full    font-strong rounded-xl px-2 py-4",
                    isDark ? "bg-[#242529]" : "bg-[#66686E]",
                  )}
                >
                  {ASK_MAP.map(askItem => {
                    return (
                      <p
                        className={clsx(
                          "body-r-14 cursor-pointer p-4 hover:bg-[#579AEB] rounded-xl",
                        )}
                        onClick={e => handleAsk(e, askItem)}
                      >
                        {askItem}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
            <InputField
              label={"제목"}
              placeholder={"문의 제목을 입력해주세요."}
              className="body-r-16"
              value={title}
              isDot={true}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
            <InputField
              label={"문의 내용"}
              placeholder={"문의하실 내용을 상세히 작성해주세요."}
              className="body-r-16"
              isDot={true}
              area={true}
              value={content}
              onChange={e => {
                setContent(e.target.value);
              }}
            />
            <Button
              color={activeBtn ? "default" : "grey1"}
              onClick={handleSubmitForm}
            >
              문의 제출하기
            </Button>
          </section>

          <section className="bg-bgStrong p-8 rounded-xl border border-normal">
            <h3 className="body-sb-18 mb-1">안내사항</h3>
            <ul className=" list-disc pl-5 body-r-14 font-alternative marker:text-xs marker:font-alternative">
              <li> 문의 접수 후 영업일 기준 1~2일 내에 답변드릴 예정입니다.</li>
              <li> 상담은 고객센터(0000-0000).... </li>
            </ul>
          </section>
        </>
      )}
    </div>
  );
};
