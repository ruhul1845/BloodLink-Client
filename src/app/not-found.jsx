import Link from "next/link";
import { MdHome, MdPersonSearch, MdSearchOff } from "react-icons/md";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="not-found-page">
        <div className="not-found-card">
          <span className="not-found-icon"><MdSearchOff aria-hidden="true" /></span>
          <p className="not-found-code">404</p>
          <h1>Page not found</h1>
          <p className="not-found-copy">The page you requested may have moved, been removed, or the address might be incorrect.</p>
          <div className="not-found-actions">
            <Link href="/" className="btn-primary"><MdHome aria-hidden="true" />Back to home</Link>
            <Link href="/search" className="btn-ghost"><MdPersonSearch aria-hidden="true" />Search donors</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
