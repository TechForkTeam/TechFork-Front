import clsx from "clsx";
import { useThemeToggle } from "../hooks/useThemToggle";

export const SkeletonCard = () => {
  const { isDark } = useThemeToggle();
  const skeletonBg = isDark ? "bg-gray-600" : "bg-gray-300";
  return (
    <li className="h-90 rounded-lg bg-sub-500 p-4 relative animate-pulse">
      <div className="flex justify-between mb-3">
        <div className={clsx("size-10 rounded", skeletonBg)} />
        <div className={clsx("size-6 rounded", skeletonBg)} />
      </div>

      <div className="flex flex-col gap-4 pb-3 border-b border-bgNormal mb-2">
        <div className="space-y-2">
          <div className={clsx("h-4 w-4/5 rounded", skeletonBg)} />
          <div className={clsx("h-4 w-3/5 rounded", skeletonBg)} />
        </div>
        <div className={clsx("h-45 w-full rounded", skeletonBg)} />
      </div>

      <div className="flex items-center gap-3">
        <div className={clsx("size-4 rounded", skeletonBg)} />
        <div className={clsx("h-3 w-10 rounded", skeletonBg)} />
        <div className={clsx("h-3 w-20 rounded", skeletonBg)} />
      </div>
    </li>
  );
};
