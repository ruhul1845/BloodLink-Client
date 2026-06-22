"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import RequestForm from "@/components/RequestForm";

export default function EditDonationRequestPage() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  useEffect(() => { api(`/api/requests/${id}`).then(setRequest); }, [id]);
  if (!request) return <p className="font-bold">Loading...</p>;
  return (
    <section>
      <h1 className="mb-8 text-4xl font-black">Edit Donation Request</h1>
      <RequestForm initial={request} editId={id} />
    </section>
  );
}
