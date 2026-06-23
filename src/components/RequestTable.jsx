"use client";

import Link from "next/link";
import { api } from "@/lib/api";
import Pagination, { usePagination } from "./Pagination";
import { useToast } from "./Toast";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";
import { MdCancel, MdCheckCircle, MdDeleteOutline, MdEdit, MdVisibility } from "react-icons/md";

export default function RequestTable({ rows, refresh, mode = "owner", role = "donor" }) {
  const toast = useToast();
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { pageItems, page, setPage, totalPages } = usePagination(rows, 6);
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
            const usesStatusSelect = role === "admin" || volunteerOnly;
            const canDelete = role === "admin" || (mode === "owner" && !volunteerOnly);
            return (
              <tr key={row._id}>
                <td className="font-black">{row.recipientName}</td>
                <td>{row.recipientDistrict}, {row.recipientUpazila}</td>
                <td>{row.bloodGroup}</td>
                <td>{row.donationDate} · {row.donationTime}</td>
                <td><span className={`status status-${row.status}`}>{row.status}</span></td>
                <td>{row.status === "inprogress" ? <div className="grid gap-1"><strong>{row.donorName || "-"}</strong>{row.donorEmail && <span>{row.donorEmail}</span>}{row.donorMobile && <span>{row.donorMobile}</span>}</div> : "-"}</td>
                <td>
                  <div className="request-actions">
                    <Link className="request-action action-view" href={`/donation-requests/${row._id}`}><MdVisibility aria-hidden="true" />View</Link>
                    {!volunteerOnly && <Link className="request-action action-edit" href={`/dashboard/edit-donation-request/${row._id}`}><MdEdit aria-hidden="true" />Edit</Link>}
                    {!usesStatusSelect && row.status === "inprogress" && (
                      <>
                        <button className="request-action action-done" onClick={() => setStatus(row._id, "done")}><MdCheckCircle aria-hidden="true" />Done</button>
                        <button className="request-action action-cancel" onClick={() => setStatus(row._id, "canceled")}><MdCancel aria-hidden="true" />Cancel</button>
                      </>
                    )}
                    {usesStatusSelect && (
                      <select className="field request-status-select" aria-label={`Update status for ${row.recipientName}`} value={row.status} onChange={(e) => setStatus(row._id, e.target.value)}>
                        {["pending", "inprogress", "done", "canceled"].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    )}
                    {canDelete && <button className="request-action action-delete" onClick={() => setPendingDelete(row)}><MdDeleteOutline aria-hidden="true" />Delete</button>}
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
