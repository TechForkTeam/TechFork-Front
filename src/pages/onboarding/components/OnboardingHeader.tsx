import clsx from "clsx";

interface OnboardingHeaderProps {
  basic?: boolean;
}

export const OnboardingHeader = ({ basic = true }: OnboardingHeaderProps) => {
  return (
    <div className="flex gap-4 mb-8 justify-center">
      <div className="flex gap-4 items-center ">
        <span
          className={clsx(
            "size-8 rounded-full relative",
            !basic ? "bg-assistive" : "bg-blue-500",
          )}
        >
          <p className="absolute left-3 top-1 text-white">1</p>
        </span>

        <p
          className={clsx(
            "body-r-16",
            !basic ? "text-assistive" : "text-blue-500",
          )}
        >
          기본 정보
        </p>
      </div>

      <span className="w-19 h-px bg-sub-800 mt-5"></span>

      <div className="flex gap-4 items-center ">
        <span
          className={clsx(
            "size-8 rounded-full relative",
            basic ? "bg-assistive" : "bg-blue-500",
          )}
        >
          <p className="absolute left-3 top-1 text-white">2</p>
        </span>

        <p
          className={clsx(
            " body-r-16",
            basic ? "text-assistive" : "text-blue-500",
          )}
        >
          관심 분야
        </p>
      </div>
    </div>
  );
};
