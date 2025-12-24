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
  title: "Care.IO",
  description: "Baby Sitting & Elderly Care Service Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
