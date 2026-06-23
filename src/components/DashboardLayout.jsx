"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";
import { initials } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
import { MdHome, MdLogout } from "react-icons/md";

export default function DashboardLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);
  if (loading || !user) return <main className="p-10 font-bold">Loading...</main>;
  const links = [
    ["/dashboard", "Dashboard", true],
    ["/dashboard/profile", "Profile", true],
    ["/dashboard/my-donation-requests", "My Requests", ["donor", "admin", "volunteer"].includes(user.role)],
    ["/dashboard/create-donation-request", "Create Request", user.status === "active" && ["donor", "admin", "volunteer"].includes(user.role)],
    ["/dashboard/all-users", "All Users", user.role === "admin"],
    ["/dashboard/all-blood-donation-request", "All Blood Requests", user.role === "admin" || user.role === "volunteer"],
    ["/funding", "Funding", true],
  ].filter(([, , show]) => show);
  const accountLabel = user.status === "blocked"
    ? "Blocked"
    : user.role === "admin"
      ? "Admin"
      : user.role === "volunteer"
        ? "Volunteer"
        : "Donor";
  return (
    <div className="min-h-screen bg-[#F7F8FB] lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="dashboard-sidebar flex flex-col border-r border-[#E8E4DA] bg-[#FFFDF7] p-6 text-[#101828] lg:sticky lg:top-0 lg:h-screen lg:min-h-screen">
        <div className="dashboard-brand-row">
          <Logo />
          <Link href="/" className="dashboard-home-link" aria-label="Go to homepage" title="Go to homepage"><MdHome aria-hidden="true" /></Link>
        </div>
        <nav className="mt-10 grid gap-2">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className={`rounded-xl px-5 py-3 font-bold ${pathname === href ? "bg-[#E02B22] text-white" : "text-[#475467] hover:bg-[#F2F0E9]"}`}>{label}</Link>
          ))}
        </nav>
        <div className="dashboard-user-card mt-auto rounded-2xl border border-[#E8E4DA] bg-white p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full bg-[#FFECEC] font-black text-[#E02B22]">
              {user.avatar ? <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" /> : initials(user.name)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-black">{user.name}</p>
              <p className="truncate text-sm text-[#667085]">{user.email}</p>
            </div>
            <button onClick={logout} className="dashboard-logout grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[#667085] hover:bg-[#FFF1F0] hover:text-[#D92D20]" aria-label="Logout" title="Logout">
              <MdLogout size={23} aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>
      <main className="p-5 md:p-10">
        <div className="dashboard-topbar" aria-label="Account type and status">
          <ThemeToggle />
          <span className={`account-tag ${user.status === "blocked" ? "account-tag-blocked" : `account-tag-${user.role}`}`}>{accountLabel}</span>
        </div>
        {children}
      </main>
    </div>
  );
}
