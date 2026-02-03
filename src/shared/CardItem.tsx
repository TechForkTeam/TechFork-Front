import BookOn from "@/assets/icons/book-on.svg";
import BookOff from "@/assets/icons/book-off.svg";
import Eye from "@/assets/icons/eye.svg";
import { forwardRef } from "react";
import {
  useDeleteBookmark,
  usePostBookmark,
  usePostReadPost,
} from "../lib/activity";
import useUserStore from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Alert from "@/assets/icons/alert2.svg";

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
  shortSummary: string;
}

export const CardItem = forwardRef<HTMLLIElement, CardItemProps>(
  (
    {
      viewCount,
      logoUrl,
      title,
      thumbnailUrl,
      company,
      url,
      id,
      publishedAt,
      isBookmarked,
      shortSummary,
    },
    ref,
  ) => {
    //북마크 추가
    const handleSubmitPostBookmark = usePostBookmark();
    const handleSubmitDeleteBookmark = useDeleteBookmark();

    const { user } = useUserStore();
    const isLogin = !!user?.accessToken;
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!id) return;

      if (!isLogin) {
        toast.info(`로그인이 필요한 서비스입니다.`, {
          icon: <img src={Alert} alt="login으로 이동" />,
        });
        navigate("/login");
        return;
      }

      if (isBookmarked) {
        handleSubmitDeleteBookmark.mutate(id);
      } else {
        handleSubmitPostBookmark.mutate(id);
      }
    };

    const readPostMutation = usePostReadPost();

    const handleReadAndMove = async (
      e: React.MouseEvent<HTMLAnchorElement>,
    ) => {
      e.preventDefault();
      if (!id || !url) return;

      try {
        await readPostMutation.mutateAsync({
          postId: id,
          readAt: new Date().toISOString(),
          readDurationSeconds: 0,
        });
      } catch (error) {
        console.error(error);
      } finally {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    };
    return (
      <li
        className=" h-90 rounded-lg bg-white p-4 relative hover:scale-103  transition-transform duration-200"
        ref={ref}
      >
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
              {shortSummary}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <img src={Eye} alt="" className="" />
          <p className="text-xs ">{viewCount}</p>
          <p className="text-xs text-assistive">{publishedAt?.split("T")[0]}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label={`${title} 보기`}
          onClick={handleReadAndMove}
        />
      </li>
    );
  },
);
