"use client";

import Link from "next/link";
import { api } from "@/lib/api";
import Pagination, { usePagination } from "./Pagination";
import { useToast } from "./Toast";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";

export default function RequestTable({ rows, refresh, mode = "owner", role = "donor" }) {
  const toast = useToast();
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { pageItems, page, setPage, totalPages } = usePagination(rows, 10);
  async function setStatus(id, status) {
    try {
      await api(`/api/requests/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
      await refresh?.();
      toast(`Request status updated to ${status}.`);
    } catch (error) {
      toast(error.message, "error");
    }
  }
  async function remove() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await api(`/api/requests/${pendingDelete._id}`, { method: "DELETE" });
      await refresh?.();
      toast("Donation request removed successfully.");
      setPendingDelete(null);
    } catch (error) {
      toast(error.message, "error");
    } finally {
      setDeleting(false);
    }
  }
  return (
    <>
      <div className="table-wrap">
        <table>
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Location</th>
            <th>Blood</th>
            <th>Date</th>
            <th>Status</th>
            <th>Donor info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map((row) => {
            const volunteerOnly = role === "volunteer";
            return (
              <tr key={row._id}>
                <td className="font-black">{row.recipientName}</td>
                <td>{row.recipientDistrict}, {row.recipientUpazila}</td>
                <td>{row.bloodGroup}</td>
                <td>{row.donationDate} · {row.donationTime}</td>
                <td><span className={`status status-${row.status}`}>{row.status}</span></td>
                <td>{row.status === "inprogress" ? <div className="grid gap-1"><strong>{row.donorName || "-"}</strong>{row.donorEmail && <span>{row.donorEmail}</span>}{row.donorMobile && <span>{row.donorMobile}</span>}</div> : "-"}</td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <Link className="font-black text-[#1D70D4]" href={`/donation-requests/${row._id}`}>View</Link>
                    {!volunteerOnly && <Link className="font-black text-[#667085]" href={`/dashboard/edit-donation-request/${row._id}`}>Edit</Link>}
                    {row.status === "inprogress" && (
                      <>
                        <button className="font-black text-[#0F9F63]" onClick={() => setStatus(row._id, "done")}>Done</button>
                        <button className="font-black text-[#D92D20]" onClick={() => setStatus(row._id, "canceled")}>Cancel</button>
                      </>
                    )}
                    {(mode === "admin" || !volunteerOnly) && <button className="font-black text-[#D92D20]" onClick={() => setPendingDelete(row)}>Delete</button>}
                    {volunteerOnly && row.status !== "inprogress" && (
                      <select className="field max-w-36 py-2" value={row.status} onChange={(e) => setStatus(row._id, e.target.value)}>
                        {["pending", "inprogress", "done", "canceled"].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>
        {!rows.length && <p className="p-6 text-[#667085]">No donation requests found.</p>}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
      <ConfirmModal
        open={Boolean(pendingDelete)}
        title="Delete donation request?"
        message={pendingDelete ? `This will permanently delete the request for ${pendingDelete.recipientName}. This action cannot be undone.` : ""}
        confirmLabel="Delete request"
        busy={deleting}
        onConfirm={remove}
        onClose={() => !deleting && setPendingDelete(null)}
      />
    </>
  );
}
