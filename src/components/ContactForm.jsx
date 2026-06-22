"use client";

import { useToast } from "./Toast";

export default function ContactForm() {
  const toast = useToast();

  function submit(event) {
    event.preventDefault();
    event.currentTarget.reset();
    toast("Thanks for contacting BloodLink. We’ll get back to you soon.");
  }

  return (
    <form className="grid gap-4" onSubmit={submit}>
      <input className="field" name="name" placeholder="Your name" required />
      <input className="field" name="email" type="email" placeholder="Email address" required />
      <textarea className="field min-h-32" name="message" placeholder="Message" required />
      <button className="btn-primary w-fit" type="submit">Send Message</button>
    </form>
  );
}
