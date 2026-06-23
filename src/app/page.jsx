import Image from "next/image";
import Link from "next/link";
import {
  MdAttachMoney,
  MdBloodtype,
  MdPeopleAlt,
  MdPersonAddAlt1,
  MdSearch,
  MdVolunteerActivism,
} from "react-icons/md";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const steps = [
    [MdPersonAddAlt1, "Create your profile", "Register your blood group and location so the right people can find you."],
    [MdSearch, "Find the right match", "Search verified donors nearby or publish a request when blood is urgently needed."],
    [MdVolunteerActivism, "Connect & save a life", "Respond, coordinate the donation, and keep every request moving forward."],
  ];

  const stats = [
    [MdPeopleAlt, "1", "Total donors"],
    [MdAttachMoney, "$102,010", "Total funding"],
    [MdBloodtype, "4", "Blood requests"],
  ];

  return (
    <>
      <Navbar />
      <main className="home-page">
        <section className="hero-section">
          <div className="container-pad grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-[1.02fr_.98fr]">
            <div className="relative z-10">
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

            <div className="hero-visual">
              <div className="hero-image-wrap">
                <Image src="/banner.jpg" alt="Blood donation heartbeat illustration" fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />
                <div className="hero-image-shade" />
                <div className="hero-stats" aria-label="BloodLink coverage statistics">
                  {stats.map(([Icon, value, label]) => (
                    <div className="hero-stat" key={label}>
                      <span className="hero-stat-icon"><Icon aria-hidden="true" /></span>
                      <div><strong>{value}</strong><p>{label}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-pad py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Simple. Human. Fast.</span>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">How BloodLink works</h2>
            <p className="mt-4 text-lg leading-8 text-[#667085]">From signing up to saving a life, the path stays clear.</p>
          </div>
          <div className="process-flow mt-14">
            {steps.map(([Icon, title, text], index) => (
              <article key={title} className="process-card">
                <span className="process-number">0{index + 1}</span>
                <span className="process-icon"><Icon aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                {index < steps.length - 1 && <span className="process-connector" aria-hidden="true"><i /></span>}
              </article>
            ))}
          </div>
        </section>

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
