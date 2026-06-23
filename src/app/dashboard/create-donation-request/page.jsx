"use client";

import Link from "next/link";
import { MdBlock } from "react-icons/md";
import RequestForm from "@/components/RequestForm";
import { useAuth } from "@/context/AuthContext";

export default function CreateDonationRequestPage() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.status !== "active") {
    return (
      <section className="blocked-request-notice card">
        <span><MdBlock aria-hidden="true" /></span>
        <h1>Request creation unavailable</h1>
        <p>Your account is blocked. Only active users can create blood donation requests.</p>
        <Link href="/dashboard" className="btn-primary">Return to dashboard</Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="mb-8 text-4xl font-black">Create Donation Request</h1>
      <RequestForm />
    </section>
  );
}
