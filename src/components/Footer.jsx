import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-[#101828] py-14 text-white">
      <div className="container-pad grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo dark />
          <p className="mt-5 max-w-sm leading-7 text-[#98A2B3]">Connecting verified donors with urgent blood requests across Bangladesh.</p>
        </div>
        {[
          ["Platform", [["Search Donors", "/search"], ["Donation Requests", "/donation-requests"], ["Funding", "/funding"]]],
          ["For Users", [["Dashboard", "/dashboard"], ["Profile", "/dashboard/profile"], ["Register", "/register"]]],
          ["Support", [["Contact Us", "/#contact"], ["Login", "/login"], ["Home", "/"]]],
        ].map(([title, links]) => (
          <div key={title}>
            <h3 className="font-black">{title}</h3>
            <div className="mt-4 grid gap-3 text-[#98A2B3]">
              {links.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
