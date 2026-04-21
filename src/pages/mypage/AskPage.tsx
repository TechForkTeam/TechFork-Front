import clsx from "clsx";
import { ASK_MAP, AskConfirmModal, useAskForm } from "@/features/mypage";
import { useGetMyProfile } from "@/shared/api/my";
import { useThemeToggle } from "@/shared/lib/useThemeToggle";
import { InputField } from "@/shared/ui/InputField";
import { Button } from "@/shared/ui/button/Button";
import { Helmet } from "react-helmet-async";

const AskPage = () => {
  const { data: user } = useGetMyProfile();
  const { isDark } = useThemeToggle();
  const askForm = useAskForm();

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>문의하기 | TechFork</title>
        <meta property="og:title" content="문의하기 | TechFork" />
        <meta
          property="og:description"
          content="TechFork 서비스 이용 중 궁금한 점이나 개선 의견을 보내주세요."
        />
      </Helmet>
      <div className="px-20 pb-8 font-strong">
        <section className="mt-16 mb-8 rounded-xl border border-normal bg-bgStrong p-8">
          <h3 className="mb-1 body-sb-18">문의하기</h3>
          <p className="body-r-14 font-alternative">
            서비스 이용 중 불편한 점이나 문의사항을 남겨주세요.
          </p>
        </section>
        {askForm.confirmModal ? (
          <AskConfirmModal onCancel={() => askForm.setConfirmModal(false)} />
        ) : (
          <>
            <section className="mb-8 rounded-xl border border-normal bg-bgStrong p-8">
              <InputField
                label="답변 받을 이메일"
                placeholder={user?.email}
                disabled={true}
                className="body-r-16"
                isDot={true}
              />
              <div
                className="relative"
                onClick={() => askForm.setIsAsk(prev => !prev)}
              >
                <InputField
                  label="문의 유형"
                  placeholder="문의유형을 선택해주세요."
                  className="body-r-16"
                  isDot={true}
                  value={askForm.askContent}
                />
                {askForm.isAsk && (
                  <div
                    className={clsx(
                      "absolute top-8 w-full rounded-xl px-2 py-4 font-strong",
                      isDark ? "bg-[#242529]" : "bg-[#66686E]",
                    )}
                  >
                    {ASK_MAP.map(askItem => {
                      return (
                        <p
                          key={askItem}
                          className="body-r-14 cursor-pointer rounded-xl p-4 hover:bg-[#579AEB]"
                          onClick={e => askForm.handleAsk(e, askItem)}
                        >
                          {askItem}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
              <InputField
                label="제목"
                placeholder="문의 제목을 입력해주세요."
                className="body-r-16"
                value={askForm.title}
                isDot={true}
                onChange={e => {
                  askForm.setTitle(e.target.value);
                }}
                disabled={false}
              />
              <InputField
                label="문의 내용"
                placeholder="문의하실 내용을 상세하게 작성해주세요."
                className="body-r-16"
                isDot={true}
                area={true}
                value={askForm.content}
                onChange={e => {
                  askForm.setContent(e.target.value);
                }}
              />
              <Button
                color={askForm.activeBtn ? "default" : "grey1"}
                onClick={askForm.handleSubmitForm}
              >
                문의 제출하기
              </Button>
            </section>

            <section className="rounded-xl border border-normal bg-bgStrong p-8">
              <h3 className="mb-1 body-sb-18">안내사항</h3>
              <ul className="list-disc pl-5 body-r-14 font-alternative marker:text-xs marker:font-alternative">
                <li>문의 접수 후 영업일 기준 1~2일 내에 답변드릴 예정입니다.</li>
                <li>상담은 고객센터(0000-0000)로도 가능합니다.</li>
              </ul>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default AskPage;
