"use client";

import Link from "next/link";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeProvider";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "glass-effect border-border-default shadow-sm"
          : "bg-surface-white dark:bg-neutral-950 border-border-default dark:border-neutral-800"
      }`}
    >
      <div className="mx-auto flex h-14 xs:h-16 max-w-7xl items-center justify-between px-3 xs:px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg xs:text-xl font-extrabold tracking-tight text-text-primary dark:text-white uppercase shrink-0 hover:opacity-70 transition-opacity duration-200"
        >
          PRODUCTIFY
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-text-secondary dark:text-neutral-400 hover:text-text-primary dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-surface-card dark:hover:bg-neutral-800"
          >
            Home
          </Link>
          {isSignedIn && (
            <>
              <Link
                href="/my-products"
                className="px-4 py-2 text-sm font-medium text-text-secondary dark:text-neutral-400 hover:text-text-primary dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-surface-card dark:hover:bg-neutral-800"
              >
                My Products
              </Link>
              <Link
                href="/create"
                className="px-4 py-2 text-sm font-medium text-text-secondary dark:text-neutral-400 hover:text-text-primary dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-surface-card dark:hover:bg-neutral-800"
              >
                Create
              </Link>
            </>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1 xs:gap-2">
          <ThemeToggle />

          {isSignedIn ? (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-8 xs:w-9 h-8 xs:h-9 ring-2 ring-surface-card",
                },
              }}
            />
          ) : (
            <SignInButton mode="modal">
              <button className="px-4 xs:px-6 py-1.5 xs:py-2.5 text-xs xs:text-sm font-medium bg-surface-dark dark:bg-white text-text-light dark:text-black rounded-full hover:bg-surface-dark-soft dark:hover:bg-neutral-200 transition-all duration-200 cursor-pointer whitespace-nowrap hover:shadow-md hover:shadow-black/10">
                Sign In
              </button>
            </SignInButton>
          )}

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1.5 xs:p-2 text-text-secondary dark:text-neutral-400 hover:text-text-primary dark:hover:text-white transition-colors duration-200 cursor-pointer rounded-lg hover:bg-surface-card dark:hover:bg-neutral-800"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border-default dark:border-neutral-800 bg-surface-white dark:bg-neutral-950 animate-slideDown">
          <nav
            className="flex flex-col p-3 gap-0.5"
            onClick={() => setMenuOpen(false)}
          >
            <Link
              href="/"
              className="px-4 py-3 text-sm font-medium text-text-secondary dark:text-neutral-400 hover:text-text-primary dark:hover:text-white hover:bg-surface-card dark:hover:bg-neutral-800 rounded-xl transition-all duration-200"
            >
              Home
            </Link>
            {isSignedIn && (
              <>
                <Link
                  href="/my-products"
                  className="px-4 py-3 text-sm font-medium text-text-secondary dark:text-neutral-400 hover:text-text-primary dark:hover:text-white hover:bg-surface-card dark:hover:bg-neutral-800 rounded-xl transition-all duration-200"
                >
                  My Products
                </Link>
                <Link
                  href="/create"
                  className="px-4 py-3 text-sm font-medium text-text-secondary dark:text-neutral-400 hover:text-text-primary dark:hover:text-white hover:bg-surface-card dark:hover:bg-neutral-800 rounded-xl transition-all duration-200"
                >
                  Create
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
