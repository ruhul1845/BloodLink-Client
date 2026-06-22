"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { useToast } from "@/components/Toast";

export default function RequestDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const toast = useToast();
  const [request, setRequest] = useState(null);
  const [modal, setModal] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    api(`/api/requests/${id}`)
      .then(setRequest)
      .catch(() => router.replace("/donation-requests"));
  }, [id, user, loading, router]);

  async function confirmDonation(event) {
    event.preventDefault();
    setBusy(true);
    try {
      await api(`/api/requests/${id}/respond`, { method: "POST", body: "{}" });
      setRequest(await api(`/api/requests/${id}`));
      setModal(false);
      toast("Donation confirmed. The request is now in progress.");
    } catch (error) {
      toast(error.message, "error");
    } finally {
      setBusy(false);
    }
  }

  if (loading || !user || !request) return <main className="p-10 font-bold">Loading...</main>;

  const details = [
    ["Recipient name", request.recipientName],
    ["Recipient district", request.recipientDistrict],
    ["Recipient upazila", request.recipientUpazila],
    ["Hospital name", request.hospitalName],
    ["Full address", request.address],
    ["Blood group", request.bloodGroup],
    ["Donation date", request.donationDate],
    ["Donation time", request.donationTime],
    ["Requester name", request.requesterName],
    ["Requester email", request.requesterEmail],
    ["Request message", request.message],
  ];

  return (
    <>
      <Navbar />
      <main className="container-pad min-h-[70vh] py-12">
        <div className="card p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-bold text-[#667085]">Donation request details</p>
              <h1 className="mt-1 text-4xl font-black">{request.recipientName}</h1>
            </div>
            <span className={`status status-${request.status}`}>{request.status}</span>
          </div>

          <dl className="mt-8 grid gap-5 md:grid-cols-2">
            {details.map(([label, value]) => (
              <div key={label} className={`request-detail-item ${label === "Request message" ? "md:col-span-2" : ""}`}>
                <dt>{label}</dt>
                <dd>{value || "—"}</dd>
              </div>
            ))}
          </dl>

          <button onClick={() => setModal(true)} className="btn-primary mt-8" disabled={request.status !== "pending"}>
            {request.status === "pending" ? "Donate" : "Donation in progress"}
          </button>
        </div>
      </main>

      {modal && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && !busy && setModal(false)}>
          <form onSubmit={confirmDonation} className="modal-card" role="dialog" aria-modal="true" aria-labelledby="donation-confirm-title">
            <h2 id="donation-confirm-title" className="text-2xl font-black">Confirm donation</h2>
            <p className="mt-2 text-[#667085]">Confirm that you want to donate blood for this request.</p>
            <div className="mt-5 grid gap-4">
              <label><span className="mb-2 block text-sm font-bold text-[#667085]">Donor name</span><input className="field" value={user.name} readOnly /></label>
              <label><span className="mb-2 block text-sm font-bold text-[#667085]">Donor email</span><input className="field" value={user.email} readOnly /></label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" className="btn-ghost" onClick={() => setModal(false)} disabled={busy}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={busy}>{busy ? "Confirming..." : "Confirm"}</button>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
}
