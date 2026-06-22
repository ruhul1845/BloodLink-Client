"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/Logo";
import PasswordInput from "@/components/PasswordInput";

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(form);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <form onSubmit={submit} className="card w-full max-w-md p-8">
        <Logo />
        <h1 className="mt-8 text-3xl font-black">Login</h1>
        <p className="mt-2 text-[#667085]">Access your BloodLink dashboard.</p>
        <div className="mt-8 grid gap-4">
          <input className="field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <PasswordInput placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </div>
        {error && <p className="mt-4 rounded-lg bg-[#FFECEC] p-3 text-sm font-bold text-[#D92D20]">{error}</p>}
        <button className="btn-primary mt-6 w-full" disabled={busy}>{busy ? "Signing in..." : "Login"}</button>
        <p className="mt-5 text-center text-sm text-[#667085]">New here? <Link className="font-black text-[#E02B22]" href="/register">Create account</Link></p>
      </form>
    </main>
  );
}
