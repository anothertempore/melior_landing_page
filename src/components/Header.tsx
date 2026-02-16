"use client";

import { useEffect, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-melior-border/30 bg-melior-bg/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <img
            src="/app-icon.png"
            alt="Melior"
            width={28}
            height={28}
            className="rounded-[7px]"
          />
          <span className="font-serif text-base font-semibold text-melior-text-primary">
            Melior
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
