import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer border-t py-14 text-[#101828]">
      <div className="container-pad grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm leading-7">Connecting verified donors with urgent blood requests across Bangladesh.</p>
        </div>
        {[
          ["Platform", [["Search Donors", "/search"], ["Donation Requests", "/donation-requests"], ["Funding", "/funding"]]],
          ["For Users", [["Dashboard", "/dashboard"], ["Profile", "/dashboard/profile"], ["Register", "/register"]]],
          ["Support", [["Contact Us", "/#contact"], ["Login", "/login"], ["Home", "/"]]],
        ].map(([title, links]) => (
          <div key={title}>
            <h3 className="font-black">{title}</h3>
            <div className="mt-4 grid gap-3">
              {links.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
            </div>
          </div>
        ))}
      </div>
      <div className="footer-copyright container-pad mt-12 border-t pt-6 text-center text-sm font-bold">
        © {year} BloodLink. All rights reserved.
      </div>
    </footer>
  );
}
