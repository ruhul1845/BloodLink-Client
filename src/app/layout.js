import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/components/Toast";

export const metadata = {
  title: "BloodLink | Blood Donation Platform",
  description: "Find donors, manage blood requests, and fund emergency donation work.",
  icons: { icon: "/blood.webp" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem("bloodlink_theme")==="dark"||(!localStorage.getItem("bloodlink_theme")&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}` }} />
      </head>
      <body className="min-h-full bg-[#F7F8FB] text-[#101828]">
        <ToastProvider><AuthProvider>{children}</AuthProvider></ToastProvider>
      </body>
    </html>
  );
}
