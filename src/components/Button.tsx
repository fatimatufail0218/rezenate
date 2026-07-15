import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex
        items-center
        justify-center
        h-[45px]
        rounded-full
        border
        border-black
        px-8
        text-[18px]
        font-bold
        text-black
        transition-all
        duration-300
        hover:bg-[#9564F4]
        hover:border-[#9564F4]
        hover:text-white
        ${className}
      `}
    >
      {children}
    </button>
  );
}