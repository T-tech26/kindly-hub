'use client'

import ContactSection from "@/components/ContactSection";
import DonationSection from "@/components/DonationSection";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import MissionSection from "@/components/MissionSection";
import NewsSection from "@/components/NewsSection";
import ReportsViewer from "@/components/ReportsViewer";
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import TransparencySection from "@/components/TransparencySection";
import { useLayoutContext } from "@/context/LayoutContext";

export default function Home() {

  const { reports } = useLayoutContext();

  return (
    <section className="">

      <HeroSection />

      <MissionSection />

      <HowItWorksSection />

      <DonationSection />

      <SuccessStoriesSection />

      <TransparencySection />

      { reports === 'impact report' && (
        <ReportsViewer />
      )}

      { reports === 'audit report' && (
        <ReportsViewer />
      )}

      <NewsSection />

      <ContactSection />

      
    </section>
  );
}
