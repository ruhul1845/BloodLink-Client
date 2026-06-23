"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { BloodGroupSelect, DistrictSelect, UpazilaSelect } from "@/components/Selects";

export default function RequestForm({ initial = null, editId = null }) {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    recipientName: initial?.recipientName || "",
    recipientDistrict: initial?.recipientDistrict || "",
    recipientUpazila: initial?.recipientUpazila || "",
    hospitalName: initial?.hospitalName || "",
    address: initial?.address || "",
    bloodGroup: initial?.bloodGroup || "",
    donationDate: initial?.donationDate || "",
    donationTime: initial?.donationTime || "",
    message: initial?.message || "",
  });
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    setError("");
    if (!editId && user?.status !== "active") {
      setError("Only active users can create donation requests.");
      return;
    }
    try {
      if (editId) await api(`/api/requests/${editId}`, { method: "PATCH", body: JSON.stringify(form) });
      else await api("/api/requests", { method: "POST", body: JSON.stringify(form) });
      router.push("/dashboard/my-donation-requests");
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <form onSubmit={submit} className="card grid gap-5 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <input className="field" value={user?.name || ""} readOnly />
        <input className="field" value={user?.email || ""} readOnly />
        <input className="field" placeholder="Recipient name" value={form.recipientName} onChange={(e) => setForm({ ...form, recipientName: e.target.value })} required />
        <DistrictSelect value={form.recipientDistrict} onChange={(e) => setForm({ ...form, recipientDistrict: e.target.value, recipientUpazila: "" })} required />
        <UpazilaSelect district={form.recipientDistrict} value={form.recipientUpazila} onChange={(e) => setForm({ ...form, recipientUpazila: e.target.value })} required />
        <input className="field" placeholder="Hospital name" value={form.hospitalName} onChange={(e) => setForm({ ...form, hospitalName: e.target.value })} required />
        <input className="field" placeholder="Full address line" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
        <BloodGroupSelect value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })} required />
        <input className="field" type="date" value={form.donationDate} onChange={(e) => setForm({ ...form, donationDate: e.target.value })} required />
        <input className="field" type="time" value={form.donationTime} onChange={(e) => setForm({ ...form, donationTime: e.target.value })} required />
      </div>
      <textarea className="field min-h-32" placeholder="Request message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
      {error && <p className="rounded-lg bg-[#FFECEC] p-3 font-bold text-[#D92D20]">{error}</p>}
      <button className="btn-primary w-fit">{editId ? "Update Donation Request" : "Request"}</button>
    </form>
  );
}
