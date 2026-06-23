"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MdLockOutline } from "react-icons/md";
import { api } from "@/lib/api";
import RequestForm from "@/components/RequestForm";
import { useAuth } from "@/context/AuthContext";

export default function EditDonationRequestPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  useEffect(() => { api(`/api/requests/${id}`).then(setRequest); }, [id]);
  if (!request) return <p className="font-bold">Loading...</p>;
  const canEdit = user?.role === "admin" || (user?.role === "donor" && request.requesterId === user?._id && request.status === "pending");
  if (!canEdit) {
    return (
      <section className="blocked-request-notice card">
        <span><MdLockOutline aria-hidden="true" /></span>
        <h1>Editing unavailable</h1>
        <p>Donors can edit only their own pending donation requests. You can still view the request and delete it from your request list.</p>
        <Link href="/dashboard/my-donation-requests" className="btn-primary">Back to my requests</Link>
      </section>
    );
  }
  return (
    <section>
      <h1 className="mb-8 text-4xl font-black">Edit Donation Request</h1>
      <RequestForm initial={request} editId={id} />
    </section>
  );
}
