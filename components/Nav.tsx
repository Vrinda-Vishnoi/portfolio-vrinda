"use client";

import { useState } from "react";
import { playSound } from "@/lib/sound";
import { profile } from "@/lib/data";
import { MuteToggle } from "./MuteToggle";

const links = [
  { href: "#path", label: "the path" },
  { href: "#projects", label: "projects" },
  { href: "#skills", label: "skills" },
  { href: "#contact", label: "say hi" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-board/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">

        {/* Logo */}
        <a
          href="#top"
          className="font-marker text-lg text-ink sm:text-xl"
          onMouseEnter={() => playSound("click")}
          onClick={() => playSound("click")}
        >
          {profile.nickname || profile.name.split(" ")[0]}
          <span className="text-marker-blue">.</span>
        </a>

        {/* Desktop nav links — hidden on mobile */}
        <nav className="hidden items-center gap-6 sm:flex sm:gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-hand text-lg text-ink/80 transition-colors hover:text-ink"
              onMouseEnter={() => playSound("click")}
              onClick={() => playSound("click")}
            >
              {l.label}
              <span className="pointer-events-none absolute -bottom-1 left-0 h-[3px] w-0 rounded-full bg-marker-blue transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <MuteToggle />
        </nav>

        {/* Mobile: controls */}
        <div className="flex items-center gap-4 sm:hidden">
          <MuteToggle />
          <button 
            onClick={() => {
              setIsOpen(!isOpen);
              playSound("click");
            }}
            className="font-hand text-lg text-ink"
            aria-label="Toggle Menu"
          >
            {isOpen ? "close" : "menu"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <nav className="border-t border-ink/10 bg-[#fcfcf9] px-5 py-4 sm:hidden shadow-lg absolute w-full">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => {
                  setIsOpen(false);
                  playSound("click");
                }}
                className="font-hand text-xl text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
