"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import RequestTable from "@/components/RequestTable";
import ApexRequestChart from "@/components/ApexRequestChart";
import { MdAttachMoney, MdBloodtype, MdPeopleAlt } from "react-icons/md";

function buildRequestTrend(requests, range) {
  const now = new Date();
  const dateKey = (date) => date.toISOString().slice(0, 10);
  const monthKey = (date) => date.toISOString().slice(0, 7);
  const weekStart = (date) => {
    const start = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    start.setUTCDate(start.getUTCDate() - ((start.getUTCDay() + 6) % 7));
    return start;
  };
  const buckets = [];

  if (range === "monthly") {
    for (let offset = 11; offset >= 0; offset -= 1) {
      const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - offset, 1));
      buckets.push({ key: monthKey(date), label: date.toLocaleDateString("en-US", { month: "short", year: "2-digit", timeZone: "UTC" }), requests: 0 });
    }
  } else if (range === "weekly") {
    const currentWeek = weekStart(now);
    for (let offset = 7; offset >= 0; offset -= 1) {
      const date = new Date(currentWeek);
      date.setUTCDate(date.getUTCDate() - offset * 7);
      buckets.push({ key: dateKey(date), label: date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }), requests: 0 });
    }
  } else {
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - offset));
      buckets.push({ key: dateKey(date), label: date.toLocaleDateString("en-US", { weekday: "short", day: "numeric", timeZone: "UTC" }), requests: 0 });
    }
  }

  const bucketsByKey = new Map(buckets.map((bucket) => [bucket.key, bucket]));
  requests.forEach((request) => {
    const createdAt = new Date(request.createdAt || request.donationDate);
    if (Number.isNaN(createdAt.getTime())) return;
    const key = range === "monthly" ? monthKey(createdAt) : range === "weekly" ? dateKey(weekStart(createdAt)) : dateKey(createdAt);
    const bucket = bucketsByKey.get(key);
    if (bucket) bucket.requests += 1;
  });

  return buckets.map(({ label, requests: count }) => ({ label, requests: count }));
}

export default function DashboardHome() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [stats, setStats] = useState(null);
  const [range, setRange] = useState("daily");
  const load = useCallback(async () => {
    if (!user) return;
    if (user.role === "donor") {
      setRows((await api("/api/requests/my")).slice(0, 3));
      return;
    }

    const nextStats = await api(`/api/stats?range=${range}`);
    if (!Array.isArray(nextStats.requestTrend) || !nextStats.requestTrend.length) {
      try {
        const requests = await api("/api/requests/all");
        nextStats.requestTrend = buildRequestTrend(requests, range);
      } catch {
        nextStats.requestTrend = buildRequestTrend([], range);
      }
    }
    setStats(nextStats);
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
                <ApexRequestChart data={stats?.requestTrend || []} />
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
