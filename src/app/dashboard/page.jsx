"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import RequestTable from "@/components/RequestTable";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MdAttachMoney, MdBloodtype, MdPeopleAlt } from "react-icons/md";

export default function DashboardHome() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [stats, setStats] = useState(null);
  const [range, setRange] = useState("daily");
  const load = useCallback(async () => {
    if (!user) return;
    if (user.role === "donor") setRows((await api("/api/requests/my")).slice(0, 3));
    else setStats(await api(`/api/stats?range=${range}`));
  }, [user, range]);
  useEffect(() => {
    load();
    if (!user || user.role === "donor") return;
    const interval = window.setInterval(load, 30000);
    return () => window.clearInterval(interval);
  }, [load, user]);
  if (!user) return null;
  const adminLike = user.role === "admin" || user.role === "volunteer";
  return (
    <section>
      <h1 className="text-4xl font-black">Welcome back, {user.name}</h1>
      <p className="mt-2 text-[#667085]">{adminLike ? "Manage users, donation requests and funding insights." : "Here are your recent blood donation requests."}</p>
      {adminLike ? (
        <>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["Total Donors", stats?.totalUsers || 0, MdPeopleAlt, "metric-icon-donors"],
              ["Total Funding", `$${Number(stats?.totalFunding || 0).toLocaleString()}`, MdAttachMoney, "metric-icon-funding"],
              ["Blood Requests", stats?.totalRequests || 0, MdBloodtype, "metric-icon-requests"],
            ].map(([label, value, Icon, iconClass]) => (
              <div className="card p-7" key={label}>
                <div className="flex items-center gap-5"><span className={`metric-icon ${iconClass}`}><Icon size={26} aria-hidden="true" /></span><div><p className="text-4xl font-black">{value}</p><p className="text-[#667085]">{label}</p></div></div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div><h2 className="text-2xl font-black">Donation Requests Trend</h2><p className="mt-1 text-sm text-[#667085]">Updates automatically every 30 seconds.</p></div>
                <div className="chart-range-toggle" aria-label="Chart time range">
                  {["daily", "weekly", "monthly"].map((option) => <button type="button" key={option} aria-pressed={range === option} className={range === option ? "active" : ""} onClick={() => setRange(option)}>{option}</button>)}
                </div>
              </div>
              <div className="card mt-5 h-80 p-5">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats?.requestTrend || []} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E7EC" />
                    <XAxis dataKey="label" tick={{ fill: "#667085", fontSize: 12 }} tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} tick={{ fill: "#667085", fontSize: 12 }} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: "rgba(224, 43, 34, 0.06)" }} formatter={(value) => [value, "Requests"]} />
                    <Bar dataKey="requests" fill="#E02B22" radius={[8, 8, 0, 0]} maxBarSize={44} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black">Recent Users</h2>
              <div className="table-wrap mt-5">
                <table className="min-w-full"><tbody>{stats?.recentUsers?.map((u) => <tr key={u._id}><td className="font-black">{u.name}</td><td>{u.role}</td><td><span className={`user-state user-state-${u.status}`}>{u.status}</span></td></tr>)}</tbody></table>
              </div>
            </div>
          </div>
        </>
      ) : rows.length ? (
        <div className="mt-10">
          <h2 className="mb-5 text-3xl font-black">Recent donation requests</h2>
          <RequestTable rows={rows} refresh={load} role={user.role} />
          <Link href="/dashboard/my-donation-requests" className="btn-primary mt-6 inline-block">View my all request</Link>
        </div>
      ) : null}
    </section>
  );
}
