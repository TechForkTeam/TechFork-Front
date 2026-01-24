import BookOn from "@/assets/icons/book-on.svg";
import Eye from "@/assets/icons/eye.svg";
import User from "@/assets/images/user.png";

// interface CardItemProps {
//   image?: string;
// }

export const CardItem = () => {
  return (
    <li className=" h-60 rounded-lg bg-white p-4">
      <div className="flex justify-between mb-3">
        <img src={User} alt="" className="size-10" />
        <img src={BookOn} alt="" />
      </div>
      <div className="flex flex-col gap-4 pb-3 border-b border-bgNormal mb-3">
        <h3 className="body-sb-18">Title</h3>
        <p className="line-clamp-3">
          배포주절주절ㅇㅇㅇㅇㅇㅇㅇdddddddㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        </p>
      </div>
      <img src={Eye} alt="" />
    </li>
  );
};
