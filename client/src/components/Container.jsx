import { twMerge } from "tailwind-merge";

const Container = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "container max-w-[1180px] px-[20px] mx-auto h-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
