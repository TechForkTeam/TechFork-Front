import BookOn from "@/assets/icons/book-on.svg";
import BookOff from "@/assets/icons/book-off.svg";
import Eye from "@/assets/icons/eye.svg";
import { forwardRef } from "react";
import { useDeleteBookmark, usePostBookmark } from "../lib/activity";

interface CardItemProps {
  id?: number;
  title: string;
  company: string;
  url?: string;
  logoUrl: string;
  thumbnailUrl: string;
  publishedAt?: string;
  isBookmarked: boolean;
  viewCount: number;
  keywords?: string[];
}

export const CardItem = forwardRef<HTMLLIElement, CardItemProps>(
  (
    { viewCount, logoUrl, title, thumbnailUrl, company, url, id, isBookmarked },
    ref,
  ) => {
    //북마크 추가
    const handleSubmitPostBookmark = usePostBookmark();
    const handleSubmitDeleteBookmark = useDeleteBookmark();
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!id) return;
      if (isBookmarked) {
        handleSubmitDeleteBookmark.mutate(id);
      } else {
        handleSubmitPostBookmark.mutate(id);
      }
    };

    return (
      <li className=" h-90 rounded-lg bg-white p-4 relative " ref={ref}>
        <div className="flex justify-between mb-3">
          <img src={logoUrl} alt={company} className="size-10" />
          <img
            src={isBookmarked ? BookOn : BookOff}
            alt="북마크"
            className=" z-15 cursor-pointer"
            onClick={e => handleClick(e)}
          />
        </div>
        <div className="flex flex-col gap-4 pb-3 border-b border-bgNormal mb-2">
          <h3 className="body-sb-18 min-h-12  line-clamp-2 overflow-hidden text-clip">
            {title}
          </h3>
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt="썸네일"
              className="object-cover h-45"
            />
          ) : (
            <p className="line-clamp-9 overflow-hidden text-clip min-h-45 text-sm">
              이 글은 유튜브에서 성공적으로 콘텐츠를 제작하고 비즈니스
              플랫폼으로 활용하기 위한 전략을 다룹니다. 많은 크리에이터들이
              자신의 영상이 성공하지 않는 이유에 대해 고민하지만, 대중이 원하는
              콘텐츠는 명확히 존재합니다.
              <br /> 이를 파악하고 제작하는 것이 중요하며, 성공적인 유튜브 채널
              운영을 위해서는 타겟 청중을 이해하고 그들의 관심사에 맞춘 콘텐츠를
              제공해야 합니다. <br />
              또한, 유튜브 알고리즘을 이해하고 활용하는 것이 필수적이며, SEO
              최적화와 꾸준한 업로드 일정이 성공의 열쇠가 됩니다. 이 글은 이러한
              요소들을 종합적으로 분석하고, 크리에이터들이 실질적으로 적용할 수
              있는 팁과 전략을 제시합니다.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <img src={Eye} alt="" className="mt-1" />
          <p className="text-xs text-assistive">{viewCount}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label={`${title} 보기`}
        />
      </li>
    );
  },
);
