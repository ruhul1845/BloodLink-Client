"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/Logo";
import { BloodGroupSelect, DistrictSelect, UpazilaSelect } from "@/components/Selects";
import { uploadToImgBB } from "@/lib/api";
import PasswordInput from "@/components/PasswordInput";

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", bloodGroup: "", district: "", upazila: "", password: "", confirm_password: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  function chooseAvatar(event) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const avatar = await uploadToImgBB(file);
      await register({ ...form, avatar });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <form onSubmit={submit} className="card w-full max-w-2xl p-8">
        <Logo />
        <h1 className="mt-8 text-3xl font-black">Register as donor</h1>
        <div className="register-avatar-block">
          <div className="profile-avatar register-avatar">
            {preview ? <img src={preview} alt="Selected profile preview" /> : <MdPerson className="register-avatar-placeholder" aria-hidden="true" />}
            <label className="camera-button" htmlFor="register-avatar-input" title="Upload profile photo" aria-label="Upload profile photo">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5 10.5 3h3L15 5h3a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h3Z" /><circle cx="12" cy="12.5" r="3.5" /></svg>
            </label>
            <input id="register-avatar-input" className="sr-only" type="file" accept="image/*" onChange={chooseAvatar} required />
          </div>
          <p>Upload profile photo</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <input className="field" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="field" type="email" placeholder="yourname@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <BloodGroupSelect value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })} required />
          <DistrictSelect value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value, upazila: "" })} required />
          <UpazilaSelect district={form.district} value={form.upazila} onChange={(e) => setForm({ ...form, upazila: e.target.value })} required />
          <PasswordInput placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <PasswordInput placeholder="Confirm password" value={form.confirm_password} onChange={(e) => setForm({ ...form, confirm_password: e.target.value })} required />
        </div>
        {error && <p className="mt-4 rounded-lg bg-[#FFECEC] p-3 text-sm font-bold text-[#D92D20]">{error}</p>}
        <button className="btn-primary mt-6 w-full" disabled={busy}>{busy ? "Creating..." : "Register"}</button>
        <p className="mt-5 text-center text-sm text-[#667085]">Already registered? <Link className="font-black text-[#E02B22]" href="/login">Login</Link></p>
      </form>
    </main>
  );
}
