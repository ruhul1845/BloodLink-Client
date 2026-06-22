"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import Pagination, { usePagination } from "@/components/Pagination";

export default function DonationRequestsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { pageItems, page, setPage, totalPages } = usePagination(rows, 9);

  useEffect(() => {
    api("/api/requests")
      .then(setRows)
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="container-pad min-h-[70vh] py-12">
        <h1 className="text-4xl font-black">Pending Blood Donation Requests</h1>
        <p className="mt-2 text-[#667085]">View current requests and sign in to respond as a donor.</p>

        {loading && <p className="mt-8 text-[#667085]">Loading donation requests...</p>}
        {error && <p className="mt-8 rounded-xl bg-[#FFECEC] p-4 font-bold text-[#D92D20]">{error}</p>}

        {!loading && !error && (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((request) => (
              <article key={request._id} className="card flex flex-col p-6">
                <h2 className="text-xl font-black">{request.recipientName}</h2>
                <dl className="request-card-details mt-5">
                  <div><dt>Location</dt><dd>{request.recipientUpazila}, {request.recipientDistrict}</dd></div>
                  <div><dt>Blood group</dt><dd>{request.bloodGroup}</dd></div>
                  <div><dt>Date</dt><dd>{request.donationDate}</dd></div>
                  <div><dt>Time</dt><dd>{request.donationTime}</dd></div>
                </dl>
                <Link href={`/donation-requests/${request._id}`} className="btn-primary mt-6 w-fit">View</Link>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && !rows.length && <p className="mt-8 text-[#667085]">No pending donation requests found.</p>}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </main>
      <Footer />
    </>
  );
}
