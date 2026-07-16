import { ReactNode } from "react";

interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
  number?: string; // default "01" - agar har card ka apna number chahiye to yahan se pass kar dein
}

export default function Card({
  icon,
  title,
  description,
  number,
}: CardProps) {
  return (
    <div
      className="
        w-[95vw]
        h-auto
        py-2
        md:py-5
        md:w-[650px]
        xl:w-[680px]
        xl:h-[130px]
        rounded-[22px]
        border
        border-[#DEE6E9]
        bg-white
        px-7
        flex
        items-center
        gap-6
        transition-all
        duration-300
        ease-out
        hover:scale-[1.04]
        hover:shadow-xl
        hover:border-[#9564F4]
        hover:z-20
        relative
      "
    >
      {/* Top-right corner number */}
      <span className="absolute top-4 right-6 text-[15px] md:text-[18px] font-bold text-[#9564F4] font-[var(--font-plus-jakarta)]">
        {number}
      </span>

      {/* Left Icon */}
      <div className="shrink-0">
        {icon}
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-center">
        <h3 className=" text-[16px] md:text-[26px] font-medium text-[#111827] font-[family-name:var(--font-boldonse)]">
          {title}
        </h3>

        <p className="mt-2 text-[14px] md:text-[18px] leading-6 text-[#111827] font-[family-name:var(--font-mulish)] tracking-normal">
          {description}
        </p>
      </div>
    </div>
  );
}