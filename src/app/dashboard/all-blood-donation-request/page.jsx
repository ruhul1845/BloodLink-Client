"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import RequestTable from "@/components/RequestTable";

export default function AllBloodDonationRequestPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("");
  const load = useCallback(async () => {
    setRows(await api(`/api/requests/all${status ? `?status=${status}` : ""}`));
  }, [status]);
  useEffect(() => { if (user) load(); }, [user, load]);
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-black">All Blood Donation Requests</h1>
        <select className="field max-w-52" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All status</option>
          {["pending", "inprogress", "done", "canceled"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="mt-8"><RequestTable rows={rows} refresh={load} mode="admin" role={user?.role} /></div>
    </section>
  );
}
