"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api, uploadToImgBB } from "@/lib/api";
import { BloodGroupSelect, DistrictSelect, UpazilaSelect } from "@/components/Selects";
import { initials } from "@/lib/data";
import { useToast } from "@/components/Toast";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const toast = useToast();
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [form, setForm] = useState(user || {});
  const [busy, setBusy] = useState(false);

  if (!user) return null;

  function chooseAvatar(event) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setEdit(true);
  }

  function cancelEdit() {
    setForm(user);
    setFile(null);
    setPreview("");
    setEdit(false);
  }

  async function save(event) {
    event.preventDefault();
    setBusy(true);
    try {
      const avatar = file ? await uploadToImgBB(file) : form.avatar;
      const updated = await api("/api/users/me", { method: "PATCH", body: JSON.stringify({ ...form, avatar }) });
      setUser(updated);
      setForm(updated);
      setFile(null);
      setPreview("");
      setEdit(false);
      toast("Profile updated successfully.");
    } catch (error) {
      toast(error.message, "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black">My Profile</h1>
          <p className="mt-2 text-[#667085]">Manage your personal and donor information.</p>
        </div>
        <button className={edit ? "btn-ghost" : "btn-primary"} onClick={edit ? cancelEdit : () => setEdit(true)}>{edit ? "Cancel" : "Edit profile"}</button>
      </div>

      <form onSubmit={save} className="profile-card card mt-8">
        <div className="profile-identity">
          <div className="profile-avatar">
            {preview || form.avatar ? <img src={preview || form.avatar} alt={form.name} /> : <span>{initials(form.name)}</span>}
            <label className="camera-button" htmlFor="profile-avatar-input" title="Change profile photo" aria-label="Change profile photo">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5 10.5 3h3L15 5h3a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h3Z" /><circle cx="12" cy="12.5" r="3.5" /></svg>
            </label>
            <input id="profile-avatar-input" className="sr-only" type="file" accept="image/*" onChange={chooseAvatar} />
          </div>
          <h2>{form.name || "Your name"}</h2>
          <p>{[form.upazila, form.district].filter(Boolean).join(", ") || "Location not added"}</p>
        </div>

        <div className="profile-fields">
          <label>
            <span>Full name</span>
            <input className="field" value={form.name || ""} disabled={!edit} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          </label>
          <label>
            <span>Email address</span>
            <input className="field" type="email" placeholder="yourname@email.com" value={form.email || ""} disabled />
          </label>
          <label>
            <span>Blood group</span>
            <BloodGroupSelect value={form.bloodGroup || ""} disabled={!edit} onChange={(event) => setForm({ ...form, bloodGroup: event.target.value })} required />
          </label>
          <label>
            <span>District</span>
            <DistrictSelect value={form.district || ""} disabled={!edit} onChange={(event) => setForm({ ...form, district: event.target.value, upazila: "" })} required />
          </label>
          <label>
            <span>Upazila</span>
            <UpazilaSelect district={form.district} value={form.upazila || ""} disabled={!edit} onChange={(event) => setForm({ ...form, upazila: event.target.value })} required />
          </label>
          {edit && <button className="btn-primary mt-2 w-full" disabled={busy}>{busy ? "Saving changes..." : "Save changes"}</button>}
        </div>
      </form>
    </section>
  );
}
