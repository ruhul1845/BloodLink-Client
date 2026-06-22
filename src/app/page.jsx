import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const steps = [
    ["1", "Register as donor", "Create a verified profile with blood group, district, upazila and avatar."],
    ["2", "Search or request", "Find matching donors or publish an urgent blood donation request."],
    ["3", "Confirm donation", "Logged-in donors respond and the request moves to in progress."],
  ];
  const features = [
    ["Verified donor profiles", "Blood group, location and active/blocked status management."],
    ["Role-based dashboards", "Admin, donor and volunteer screens with precise permissions."],
    ["Secure funding workflow", "Private Stripe funding flow with organization fund records."],
    ["Request visibility", "Pending public requests and protected details for logged-in donors."],
  ];
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-[#FFF6F4]">
          <div className="container-pad grid min-h-[650px] items-center gap-10 py-16 lg:grid-cols-2">
            <div>
              <h1 className="max-w-2xl text-5xl font-black leading-[1.05] text-[#101828] md:text-7xl">Donate blood. Find donors. Save lives faster</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#667085]">BloodLink connects donors, patients, volunteers, and admins through secure request management, donor search, and funding support.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/register" className="btn-primary">Join as a donor</Link>
                <Link href="/search" className="btn-ghost">Search Donors</Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#FFE0DF]" />
              <div className="absolute bottom-2 right-[-20px] h-56 w-56 rounded-full bg-[#FFE083]" />
              <div className="relative mx-auto max-w-lg rounded-[28px] bg-white p-8 shadow-2xl">
                <p className="font-black text-[#667085]">Live urgent needs</p>
                <h2 className="mt-3 text-3xl font-black">Find matching blood within minutes</h2>
                {[
                  ["Rafiq Ahmed", "Dhaka, Mirpur", "A+"],
                  ["Sanjida Akter", "Sylhet, Sadar", "AB-"],
                ].map(([name, location, group]) => (
                  <div className="mt-5 rounded-2xl border border-[#E4E7EC] p-5" key={name}>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black">Recipient: {name}</h3>
                      <span className="status status-pending">pending</span>
                    </div>
                    <div className="mt-4 flex items-center gap-5">
                      <span className="grid h-16 w-16 place-items-center rounded-full bg-[#FFECEC] text-2xl font-black text-[#E02B22]">{group}</span>
                      <div className="grid gap-1 font-bold text-[#667085]">
                        <span>{location}</span>
                        <span className="text-[#101828]">Donation date: 24 June 2026</span>
                        <span className="text-[#101828]">Donation time: 10:30 AM</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="container-pad py-20">
          <h2 className="text-4xl font-black">How BloodLink Works</h2>
          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {steps.map(([num, title, text]) => (
              <div key={title} className="card p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#FFECEC] font-black text-[#E02B22]">{num}</span>
                <h3 className="mt-7 text-2xl font-black">{title}</h3>
                <p className="mt-4 leading-7 text-[#667085]">{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="container-pad pb-20">
          <h2 className="text-4xl font-black">Featured Platform Sections</h2>
          <div className="mt-9 grid gap-6 md:grid-cols-2">
            {features.map(([title, text], index) => (
              <div key={title} className="card flex gap-5 p-8">
                <span className={`mt-1 h-12 w-12 rounded-full ${["bg-[#FFECEC]", "bg-[#EAF4FF]", "bg-[#E9FBF2]", "bg-[#F1ECFF]"][index]}`} />
                <div>
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-2 leading-7 text-[#667085]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="contact" className="bg-white py-20">
          <div className="container-pad grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-black">Contact Us</h2>
              <p className="mt-4 text-lg leading-8 text-[#667085]">For emergency coordination or support, call +880 1711-000000 or send a message.</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
