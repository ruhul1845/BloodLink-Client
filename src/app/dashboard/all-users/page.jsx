"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { initials } from "@/lib/data";
import ConfirmModal from "@/components/ConfirmModal";
import Pagination, { usePagination } from "@/components/Pagination";
import { useToast } from "@/components/Toast";
import { MdAdminPanelSettings, MdBlock, MdLockOpen } from "react-icons/md";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [roleSelections, setRoleSelections] = useState({});
  const [confirmation, setConfirmation] = useState(null);
  const [busy, setBusy] = useState(false);
  const toast = useToast();
  const { pageItems, page, setPage, totalPages } = usePagination(users, 6);
  const load = useCallback(async () => {
    setUsers(await api(`/api/users${status ? `?status=${status}` : ""}`));
  }, [status]);
  useEffect(() => { load(); }, [load]);
  async function updateUser(id, payload, type, successMessage) {
    try {
      await api(`/api/users/${id}/${type}`, { method: "PATCH", body: JSON.stringify(payload) });
      await load();
      toast(successMessage);
    } catch (error) {
      toast(error.message, "error");
    }
  }
  function requestRoleUpdate(user) {
    const role = roleSelections[user._id];
    if (role) setConfirmation({ user, role });
  }
  async function confirmRoleUpdate() {
    const { user, role } = confirmation;
    setBusy(true);
    await updateUser(
      user._id,
      { role },
      "role",
      role === "donor" ? `${user.name} is no longer a volunteer.` : `${user.name} is now ${role === "admin" ? "an admin" : "a volunteer"}.`
    );
    setRoleSelections((current) => ({ ...current, [user._id]: "" }));
    setConfirmation(null);
    setBusy(false);
  }
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-black">All Users</h1>
        <select className="field user-filter" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All status</option><option>active</option><option>blocked</option>
        </select>
      </div>
      <div className="table-wrap mt-8">
        <table>
          <thead><tr><th>Avatar</th><th>Email</th><th>Name</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {pageItems.map((u) => (
              <tr key={u._id}>
                <td><span className="user-table-avatar">{u.avatar ? <img src={u.avatar} alt={u.name} className="h-full w-full object-cover" /> : initials(u.name)}</span></td>
                <td>{u.email}</td><td className="font-black">{u.name}</td><td><span className={`user-role-badge user-role-${u.role}`}>{u.role}</span></td><td><span className={`user-status-pill user-status-${u.status}`}>{u.status}</span></td>
                <td><div className="user-actions">
                  <button className={`user-action-button ${u.status === "active" ? "user-action-block" : "user-action-unblock"}`} onClick={() => updateUser(u._id, { status: u.status === "active" ? "blocked" : "active" }, "status", `${u.name} has been ${u.status === "active" ? "blocked" : "unblocked"}.`)}>
                    {u.status === "active" ? <MdBlock aria-hidden="true" /> : <MdLockOpen aria-hidden="true" />}
                    {u.status === "active" ? "Block user" : "Unblock user"}
                  </button>
                  {u.role !== "admin" && (
                    <>
                      <select
                        className="field user-role-select"
                        aria-label={`Choose role update for ${u.name}`}
                        value={roleSelections[u._id] || ""}
                        onChange={(event) => setRoleSelections((current) => ({ ...current, [u._id]: event.target.value }))}
                      >
                        <option value="">Change role</option>
                        {u.role === "volunteer" ? <option value="donor">Remove Volunteer</option> : <option value="volunteer">Make Volunteer</option>}
                        <option value="admin">Make Admin</option>
                      </select>
                      <button className="user-action-button user-action-update" disabled={!roleSelections[u._id]} onClick={() => requestRoleUpdate(u)}><MdAdminPanelSettings aria-hidden="true" />Update role</button>
                    </>
                  )}
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {!users.length && <p className="p-6 text-[#667085]">No users found.</p>}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
      <ConfirmModal
        open={Boolean(confirmation)}
        title="Confirm role update"
        message={confirmation ? (confirmation.role === "donor" ? `Are you sure you want to remove the volunteer role from ${confirmation.user.name}?` : `Are you sure you want to make ${confirmation.user.name} ${confirmation.role === "admin" ? "an admin" : "a volunteer"}?`) : ""}
        confirmLabel="Update role"
        busy={busy}
        onConfirm={confirmRoleUpdate}
        onClose={() => !busy && setConfirmation(null)}
      />
    </section>
  );
}
