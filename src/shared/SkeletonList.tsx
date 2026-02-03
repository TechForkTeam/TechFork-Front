import { SkeletonCard } from "./SkeletonCard";

export const SkeletonList = () => {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Array.from({ length: 16 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </ul>
  );
};
