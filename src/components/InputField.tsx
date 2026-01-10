interface InputFieldProps {
  label: string;
  placeholder: string;
}

export const InputField = ({ label, placeholder }: InputFieldProps) => {
  return (
    <div className="w-full">
      <p className="mb-3 body-sb-16">{label}</p>
      <div className="w-full  rounded-xl mb-5">
        <input
          type="text"
          className="w-full p-3 body-r-14  rounded-xl border  border-[#E5E8EB] bg-[#F7F8F9] focus:outline-none focus:border-blue-300 "
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
