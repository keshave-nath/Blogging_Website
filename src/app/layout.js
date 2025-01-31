'use client'
import localFont from "next/font/local";
import "./globals.css";
import  "bootstrap/dist/css/bootstrap.min.css"
import Maincontext from "./context/Maincontext";

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

// export const metadata = {
//   title: "Blogging Website",
//   description: "Created By Keshave Nath",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-dark text-white`}>
        <Maincontext>
        {children}
        </Maincontext>
        
      </body>
    </html>
  );
}
