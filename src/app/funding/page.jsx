"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import Pagination, { usePagination } from "@/components/Pagination";

function FundingForm() {
  const [amount, setAmount] = useState(10);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { url } = await api("/api/create-checkout-session", { method: "POST", body: JSON.stringify({ amount }) });
      window.location.href = url;
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="card mt-6 grid gap-4 p-6 md:grid-cols-[1fr_auto]">
      <div>
        <label className="mb-2 block text-sm font-black text-[#667085]">Funding amount in USD</label>
        <input className="field" type="number" min="1" step="1" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <button className="btn-primary self-end" disabled={busy}>{busy ? "Opening Stripe..." : "Continue to Stripe"}</button>
      {error && <p className="rounded-lg bg-[#FFECEC] p-3 font-bold text-[#D92D20] md:col-span-2">{error}</p>}
    </form>
  );
}

function PaymentNotice({ onConfirmed }) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (params.get("payment") === "cancelled") setMessage("Payment was cancelled. You can try again anytime.");
    if (!sessionId) return;
    api(`/api/checkout-session/${sessionId}/confirm`, { method: "POST", body: "{}" })
      .then(() => {
        setMessage("Funding payment completed and recorded.");
        window.history.replaceState({}, "", "/funding");
        onConfirmed();
      })
      .catch((err) => setMessage(err.message));
  }, [onConfirmed]);
  if (!message) return null;
  return <p className="mt-6 rounded-lg bg-[#E9FBF2] p-4 font-bold text-[#0F9F63]">{message}</p>;
}

export default function FundingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [funds, setFunds] = useState([]);
  const [show, setShow] = useState(false);
  const { pageItems, page, setPage, totalPages } = usePagination(funds, 10);
  const load = useCallback(async () => {
    setFunds(await api("/api/funds"));
  }, []);
  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (user) load();
  }, [user, loading, router, load]);
  if (!user) return <main className="p-10 font-bold">Loading...</main>;
  const canSeeAllFunds = user.role === "admin" || user.role === "volunteer";
  return (
    <>
      <Navbar />
      <main className="container-pad min-h-[70vh] py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black">Funding</h1>
            <p className="mt-2 text-[#667085]">Support emergency donation operations through Stripe Checkout.</p>
          </div>
          <button className="btn-primary" onClick={() => setShow(!show)}>Give Fund</button>
        </div>
        <PaymentNotice onConfirmed={load} />
        {show && <FundingForm />}
        <h2 className="mt-8 text-2xl font-black">{canSeeAllFunds ? "All Funding Records" : "My Funding History"}</h2>
        <div className="table-wrap mt-4">
          <table>
            <thead><tr><th>Name</th><th>Amount</th><th>Funding Date</th></tr></thead>
            <tbody>
              {pageItems.map((fund) => (
                <tr key={fund._id}>
                  <td className="font-black">{fund.name}</td>
                  <td>${fund.amount}</td>
                  <td>{new Date(fund.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!funds.length && <p className="p-6 text-[#667085]">No funding records yet.</p>}
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </main>
      <Footer />
    </>
  );
}
