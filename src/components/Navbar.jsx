"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";
import { initials } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
import { MdClose, MdMenu } from "react-icons/md";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-[#EEF1F5] bg-white/95 backdrop-blur">
      <nav className="container-pad flex h-20 items-center justify-between gap-4">
        <Link href="/"><Logo /></Link>
        <div className="hidden items-center gap-8 font-bold text-[#667085] md:flex">
          <Link href="/donation-requests" className="hover:text-[#E02B22]">Donation Requests</Link>
          <Link href="/search" className="hover:text-[#E02B22]">Search Donors</Link>
          {user && <Link href="/funding" className="hover:text-[#E02B22]">Funding</Link>}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          {user ? (
          <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#FFECEC] font-black text-[#E02B22]">
              {user.avatar ? <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" /> : initials(user.name)}
            </button>
            {open && (
              <div className="absolute right-0 mt-3 w-48 rounded-xl border border-[#E4E7EC] bg-white p-2 shadow-xl">
                <Link href="/dashboard" className="block rounded-lg px-3 py-2 font-bold hover:bg-[#F7F8FB]">Dashboard</Link>
                <button onClick={logout} className="w-full rounded-lg px-3 py-2 text-left font-bold text-[#E02B22] hover:bg-[#FFF4F2]">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login" className="font-bold text-[#667085] hover:text-[#E02B22]">Login</Link>
            <Link href="/register" className="btn-primary">Join as Donor</Link>
          </div>
        )}
          <button type="button" className="grid h-11 w-11 place-items-center rounded-xl text-[#344054] md:hidden" onClick={() => setMobileOpen((current) => !current)} aria-label="Toggle navigation" aria-expanded={mobileOpen}>
            {mobileOpen ? <MdClose size={27} aria-hidden="true" /> : <MdMenu size={27} aria-hidden="true" />}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="border-t border-[#EEF1F5] bg-white md:hidden">
          <div className="container-pad grid gap-1 py-4 font-bold text-[#475467]">
            <Link href="/donation-requests" className="rounded-lg px-3 py-3" onClick={() => setMobileOpen(false)}>Donation Requests</Link>
            <Link href="/search" className="rounded-lg px-3 py-3" onClick={() => setMobileOpen(false)}>Search Donors</Link>
            {user ? (
              <>
                <Link href="/funding" className="rounded-lg px-3 py-3" onClick={() => setMobileOpen(false)}>Funding</Link>
                <Link href="/dashboard" className="rounded-lg px-3 py-3" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <button type="button" onClick={logout} className="px-3 py-3 text-left text-[#D92D20]">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="rounded-lg px-3 py-3" onClick={() => setMobileOpen(false)}>Login</Link>
                <Link href="/register" className="rounded-lg px-3 py-3 text-[#D92D20]" onClick={() => setMobileOpen(false)}>Join as Donor</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
