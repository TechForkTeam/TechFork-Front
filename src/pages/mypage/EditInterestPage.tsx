import {
  EditAsidePage,
  EditInterestSummary,
  EditInterestTechSection,
  useEditInterestPage,
} from "@/features/mypage";
import { Helmet } from "react-helmet-async";

const EditInterestPage = () => {
  const editInterest = useEditInterestPage();

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>관심사 설정 | TechFork</title>
        <meta property="og:title" content="관심사 설정 | TechFork" />
        <meta
          property="og:description"
          content="관심 분야를 설정하고 맞춤 기술 아티클을 받아보세요."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col font-strong">
        <header className="mt-16 mb-8 rounded-xl border border-bgNormal bg-bgStrong p-8">
          <h3 className="body-sb-16">관심 분야를 설정해보세요.</h3>
          <h5 className="body-r-14 font-alternative">
            선택 분야를 바탕으로 맞춤형 게시글을 추천해드려요.
          </h5>
        </header>

        <article>
          <EditInterestSummary
            isSaving={editInterest.modalSaving}
            onSave={editInterest.handleSave}
          />
          <section className="flex min-h-screen">
            <EditAsidePage />
            <EditInterestTechSection />
          </section>
        </article>
      </div>
    </>
  );
};

export default EditInterestPage;
