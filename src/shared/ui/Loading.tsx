import { useThemeToggle } from "../lib/useThemeToggle";
import { ClipLoader } from "react-spinners";

export const Loading = () => {
  const { isDark } = useThemeToggle();
  return (
    <div className="flex items-center flex-col justify-center mt-10">
      <ClipLoader color={isDark ? "#E0E4EB" : "#022699"} />
    </div>
  );
};
