import Link from "next/link";
import { MdBloodtype } from "react-icons/md";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="home-page">
        <section className="hero-section">
          <div className="container-pad flex min-h-[680px] items-center py-16">
            <div className="relative z-10 max-w-[610px]">
              <span className="hero-kicker"><MdBloodtype aria-hidden="true" /> Bangladesh&apos;s blood donation network</span>
              <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.04] text-[#101828] md:text-7xl">
                Give blood.<br /><span>Give someone time.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#667085]">BloodLink brings donors and patients together with faster search, trusted requests, and simple coordination when every minute matters.</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/register" className="btn-primary">Become a donor</Link>
                <Link href="/search" className="btn-ghost">Find blood now</Link>
              </div>
            </div>
          </div>
        </section>

        <HowItWorks />

        <section id="contact" className="home-contact py-20">
          <div className="container-pad grid gap-10 lg:grid-cols-2">
            <div>
              <span className="section-eyebrow">We&apos;re here to help</span>
              <h2 className="mt-3 text-4xl font-black">Contact us</h2>
              <p className="mt-4 max-w-lg text-lg leading-8 text-[#667085]">For emergency coordination or support, call +880 1711-000000 or send us a message.</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
