"use client";

import Link from "next/link";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { Plus, LayoutDashboard, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

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
          : "bg-surface-white border-border-default"
      }`}
    >
      <div className="mx-auto flex h-14 xs:h-16 max-w-7xl items-center justify-between px-3 xs:px-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg xs:text-xl font-extrabold tracking-tight text-text-primary uppercase shrink-0 hover:opacity-70 transition-opacity duration-200"
        >
          PRODUCTIFY
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/"
            className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 rounded-lg hover:bg-surface-card"
          >
            Home
          </Link>
          {isSignedIn && (
            <>
              <Link
                href="/my-products"
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 rounded-lg hover:bg-surface-card"
              >
                My Products
              </Link>
              <Link
                href="/create"
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 rounded-lg hover:bg-surface-card"
              >
                Create
              </Link>
            </>
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 xs:gap-3">
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
              <button className="px-4 xs:px-6 py-1.5 xs:py-2.5 text-xs xs:text-sm font-medium bg-surface-dark text-text-light rounded-full hover:bg-surface-dark-soft transition-all duration-200 cursor-pointer whitespace-nowrap hover:shadow-md hover:shadow-black/10">
                Sign In
              </button>
            </SignInButton>
          )}

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1.5 xs:p-2 text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer rounded-lg hover:bg-surface-card"
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
        <div className="lg:hidden border-t border-border-default bg-surface-white animate-slideDown">
          <nav
            className="flex flex-col p-3 gap-0.5"
            onClick={() => setMenuOpen(false)}
          >
            <Link
              href="/"
              className="px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-card rounded-xl transition-all duration-200"
            >
              Home
            </Link>
            {isSignedIn && (
              <>
                <Link
                  href="/my-products"
                  className="px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-card rounded-xl transition-all duration-200"
                >
                  My Products
                </Link>
                <Link
                  href="/create"
                  className="px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-card rounded-xl transition-all duration-200"
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
