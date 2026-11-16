'use client'

import ContactSection from "@/components/ContactSection";
import DonationSection from "@/components/DonationSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import MissionSection from "@/components/MissionSection";
import NewsSection from "@/components/NewsSection";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";

export default function Home() {

  return (
    <section className="">

      <HeroSection />

      <MissionSection />

      <HowItWorksSection />

      <DonationSection />

      <SuccessStoriesSection />

      <NewsSection />

      <ContactSection />

      
    </section>
  );
}
