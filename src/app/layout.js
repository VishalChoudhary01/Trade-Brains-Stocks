import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "./components/provider/ClientProvider";
import ThemeInitializer from "./features/ThemeInitializer";
import Navbar from "./components/moleclues/navbar";
import Footer from "./components/moleclues/footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Trade Brains",
  description: "Stocks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen `}
      >
        <ClientProvider>
        <Navbar/>
          <ThemeInitializer/>
          <main className="grow">
        {children}
          </main>
          <Footer/>
          </ClientProvider>
      </body>
    </html>
  );
}
