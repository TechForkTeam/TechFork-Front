export const SkeletonCard = () => {
  return (
    <li className="h-90 rounded-lg bg-white p-4 relative animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="size-10 rounded bg-gray-300" />
        <div className="size-6 rounded bg-gray-300" />
      </div>

      <div className="flex flex-col gap-4 pb-3 border-b border-bgNormal mb-2">
        <div className="space-y-2">
          <div className="h-4 w-4/5 rounded bg-gray-300" />
          <div className="h-4 w-3/5 rounded bg-gray-300" />
        </div>

        <div className="h-45 w-full rounded bg-gray-300" />
      </div>

      <div className="flex items-center gap-3">
        <div className="size-4 rounded bg-gray-300" />
        <div className="h-3 w-10 rounded bg-gray-300" />
        <div className="h-3 w-20 rounded bg-gray-300" />
      </div>
    </li>
  );
};
