import React from "react";
import Footer from "@/components/Footer";
import TopNav from "@/components/TopNav";
import MobileNav from "@/components/MobileNav";
import PaymentMethod from "@/components/PaymentMethod";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    
  return (
    <section className="flex flex-col h-screen w-full">
        <TopNav />
            {children}
          <MobileNav />
        <Footer />
        <PaymentMethod />
    </section>
  );
}
