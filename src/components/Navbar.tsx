"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#how-we-partner", label: "How We Partner" },
  { href: "#founders", label: "Founders" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const FLYIN_DURATION = 600; 
  const PART_GAP = 450;
  return (

    <nav className="relative w-full py-6 z-50">
      <div
        className="relative mx-auto flex max-w-[1500px] items-center justify-between px-5"
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Logo  */}
        <div className="flex flex-col items-center">
          


      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        
      >
        {/* Part 1  */}
        <path
          className="logo-part-1"
          style={{
            animationDelay: `${FLYIN_DURATION + PART_GAP}ms`,
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
          d="M34.5725 0H0C5.60924 5.64344 13.2376 8.81678 21.1944 8.81678H25.5419V12.8243C25.5419 21.0015 28.7903 28.8438 34.5725 34.6259V0Z"
          fill="#9564F4"
        />

        {/* Part 2 */}
        <path
          className="logo-part-2"
          style={{
            animationDelay: `${FLYIN_DURATION }ms`,
            transformBox: "fill-box",
            transformOrigin: "center",
          }}
          d="M22.1234 12.3969H0.0546875L5.77316 18.1154C7.75697 20.0992 10.4476 21.2137 13.2531 21.2137C13.2531 24.0877 14.3948 26.8439 16.427 28.8761L22.1234 34.5725V12.3969Z"
          fill="#9564F4"
        />

        {/* Part 3 */}
        <path
          className="logo-part-3"
          style={{
            animationDelay: "0ms",
            transformBox: "fill-box",
            transformOrigin: "top right",
          }}
          d="M9.77861 34.5725V24.7939H0L9.77861 34.5725Z"
          fill="#9564F4"
        />
      </svg>

          <Image src="/logo-name.svg" alt="Logo" width={120} height={24} className="pt-1" />
        </div>

        {/* Desktop Navigation - sirf lg aur us se bade screens pe */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-5 py-2 text-[18px] font-normal text-black transition-colors duration-300 hover:bg-[#9564F4] hover:text-white font-[family-name:var(--font-outfit)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Contact Button - wrapper div se show/hide, Button khud untouched */}
        <div className="hidden lg:block">
          <Button className="text-[18px] font-[family-name:var(--font-outfit)] font-bold hover:border-[#9564F4] hover:bg-[#9564F4] hover:text-white">
            Contact Us
          </Button>
        </div>

        {/* Hamburger - sirf sm/md pe (lg se neeche) dikhega */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
        >
          <span
            className={`h-[2px] w-6 bg-black transition-all duration-300 ${
              isOpen ? "translate-y-[8px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-black transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-black transition-all duration-300 ${
              isOpen ? "-translate-y-[8px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Panel - sirf lg se neeche, aur sirf jab isOpen true ho */}
      <div
      className={`
        absolute left-0 right-0 top-full z-[60] mx-5
        overflow-hidden rounded-3xl border border-black/5 bg-white shadow-lg
        transition-all duration-300 ease-in-out lg:hidden
        ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
      `}
    >
            <div className="mx-auto flex max-w-[1500px] flex-col gap-2 px-5 pt-4 pb-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-full px-5 py-3 text-center text-[16px] font-medium text-black transition-colors duration-300 hover:bg-[#9564F4] hover:text-white"
            >
              {link.label}
            </Link>
          ))}

          <Button className="mt-2 w-full font-[family-name:var(--font-outfit)] text-[18px] font-bold hover:border-[#9564F4] hover:bg-[#9564F4] hover:text-white">
            Contact Us
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;