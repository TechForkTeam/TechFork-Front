import { ClipLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div className="flex items-center flex-col justify-center">
      <ClipLoader color={"#022699"} />
    </div>
  );
};
