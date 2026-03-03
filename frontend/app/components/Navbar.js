"use client";

import Link from "next/link";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { Package, Plus, LayoutDashboard, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar bg-base-200 shadow-sm px-4 lg:px-8 sticky top-0 z-50">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl gap-2 font-bold">
          <Package className="w-6 h-6 text-primary" />
          Productify
        </Link>
      </div>

      {/* Desktop nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1 text-sm font-medium">
          <li>
            <Link href="/" className="rounded-lg">
              Home
            </Link>
          </li>
          {isSignedIn && (
            <>
              <li>
                <Link href="/my-products" className="rounded-lg">
                  <LayoutDashboard className="w-4 h-4" />
                  My Products
                </Link>
              </li>
              <li>
                <Link href="/create" className="rounded-lg">
                  <Plus className="w-4 h-4" />
                  Create
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {isSignedIn ? (
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { avatarBox: "w-10 h-10" },
            }}
          />
        ) : (
          <SignInButton mode="modal">
            <button className="btn btn-primary btn-sm">Sign In</button>
          </SignInButton>
        )}

        {/* Mobile hamburger */}
        <div className="dropdown dropdown-end lg:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-sm"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-5 h-5" />
          </label>
          {menuOpen && (
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-200 rounded-box w-52 p-2 shadow-lg mt-2 z-50"
              onClick={() => setMenuOpen(false)}
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              {isSignedIn && (
                <>
                  <li>
                    <Link href="/my-products">My Products</Link>
                  </li>
                  <li>
                    <Link href="/create">Create</Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
