"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, TrendingUp } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "rgba(9,9,11,0.95)",
        backdropFilter: "blur(12px)",
        borderColor: "#27272A",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" style={{ color: "#10B981" }} />
            <span className="text-white font-bold text-lg tracking-tight">
              IndicatorHub
            </span>
            <span
              className="h-2 w-2 rounded-full animate-pulse ml-1"
              style={{ backgroundColor: "#10B981" }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/marketplace"
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#A1A1AA" }}
            >
              Marketplace
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#A1A1AA" }}
            >
              Pricing
            </Link>
            <Link
              href="/#creators"
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: "#A1A1AA" }}
            >
              Creators
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/login"
              className="text-sm font-medium px-3 py-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            >
              Log In
            </a>
            <a
              href="/signup"
              className="text-sm font-semibold px-3 py-1.5 rounded-md text-white transition-all"
              style={{ backgroundColor: "#10B981" }}
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-4"
          style={{ borderColor: "#27272A", backgroundColor: "#09090B" }}
        >
          <Link
            href="/marketplace"
            className="text-sm font-medium"
            style={{ color: "#A1A1AA" }}
            onClick={() => setMobileOpen(false)}
          >
            Marketplace
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium"
            style={{ color: "#A1A1AA" }}
            onClick={() => setMobileOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/#creators"
            className="text-sm font-medium"
            style={{ color: "#A1A1AA" }}
            onClick={() => setMobileOpen(false)}
          >
            Creators
          </Link>
          <div className="flex gap-3 pt-2">
            <a
              href="/login"
              className="text-sm font-medium px-3 py-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Log In
            </a>
            <a
              href="/signup"
              className="text-sm font-semibold px-3 py-1.5 rounded-md text-white transition-all"
              style={{ backgroundColor: "#10B981" }}
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
