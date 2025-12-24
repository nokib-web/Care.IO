import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";

export const dynamic = 'force-dynamic';

import Footer from "@/components/layouts/Footer";



const poppins = Poppins({
  weight: ["100", "200", "400", "700", "800"],
  variable: "--font-poppins",
  subsets: ["latin"],
});


export const metadata = {
  title: {
    default: "Care.IO | Trusted Care Services",
    template: "%s | Care.IO"
  },
  description: "Professional Baby Sitting, Elderly Care, and Patient Support Services. Book trusted caregivers online instantly.",
  keywords: ["care services", "baby sitting", "elderly care", "sick care", "patient support", "home care", "care.io"],
  authors: [{ name: "Care.IO Team" }],
  creator: "Care.IO",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXTAUTH_URL || "https://care.io",
    title: "Care.IO | Your Trusted Care Partner",
    description: "Find and book professional caregivers for your loved ones. Reliable baby sitting, elderly care, and patient services.",
    siteName: "Care.IO",
  },
  twitter: {
    card: "summary_large_image",
    title: "Care.IO | Professional Care Services",
    description: "Book trusted caregivers for baby, elderly, and patient care.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} antialiased`}
      >
        <main className="max-w-7xl mx-auto px-2">
          <header>
            <Navbar />
          </header>
          <section className="min-h-[calc(100vh-290px)]">
            {children}
          </section>
          <footer>
            <Footer />
          </footer>
        </main>
      </body>
    </html>
  );
}
