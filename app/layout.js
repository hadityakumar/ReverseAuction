import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import CustomCursor from '@/app/components/CustomCursor';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export const metadata = {
  title: "Razzee",
  description: "A website for reverse auctions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        
        <div className="fixed inset-0 -z-20 w-full h-full bg-gray-900" />
        <video 
          autoPlay 
          loop 
          muted 
          preload="auto"
          className="fixed inset-0 -z-20 w-full h-full object-cover" // Added blur-sm
        >
          <source src="/bg3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="relative z-10 mt-24">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
