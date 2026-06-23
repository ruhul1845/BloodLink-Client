"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BloodGroupSelect, DistrictSelect, UpazilaSelect } from "@/components/Selects";
import { api } from "@/lib/api";
import { initials } from "@/lib/data";
import Pagination, { usePagination } from "@/components/Pagination";

export default function SearchPage() {
  const [form, setForm] = useState({ bloodGroup: "", district: "", upazila: "" });
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const { pageItems, page, setPage, totalPages } = usePagination(donors, 6);
  async function submit(e) {
    e.preventDefault();
    const qs = new URLSearchParams(form).toString();
    setDonors(await api(`/api/donors/search?${qs}`));
    setSearched(true);
  }
  return (
    <>
      <Navbar />
      <main className="container-pad min-h-[70vh] py-12">
        <h1 className="text-4xl font-black">Search Donors</h1>
        <form onSubmit={submit} className="card mt-8 grid gap-4 p-6 md:grid-cols-4">
          <BloodGroupSelect value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })} required />
          <DistrictSelect value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value, upazila: "" })} required />
          <UpazilaSelect district={form.district} value={form.upazila} onChange={(e) => setForm({ ...form, upazila: e.target.value })} required />
          <button className="btn-primary">Search</button>
        </form>
        {searched && (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {donors.length ? pageItems.map((donor) => (
              <article key={donor._id} className="donor-card card p-7">
                  <span className="donor-avatar">
                    {donor.avatar ? <img src={donor.avatar} alt={donor.name} className="h-full w-full object-cover" /> : initials(donor.name)}
                  </span>
                <div className="donor-details">
                  <h3>{donor.name}</h3>
                  <p>{donor.upazila}, {donor.district}</p>
                  <p>{donor.email}</p>
                  <p>{donor.mobile || "Mobile number not added"}</p>
                  <p>Blood group: <strong>{donor.bloodGroup}</strong></p>
                </div>
              </article>
            )) : <p className="text-[#667085]">No active donors matched your search.</p>}
          </div>
        )}
        {searched && <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />}
      </main>
      <Footer />
    </>
  );
}
