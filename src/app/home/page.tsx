import CTASection from "@/components/_landing-page/cta-section";
import FeaturesSection from "@/components/_landing-page/features-section";
import HeroSection from "@/components/_landing-page/hero-section";
import PricingSection from "@/components/_landing-page/pricing-section";
import PageWrapper from "@/components/_layout/page-wrapper";
import React from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </>
  );
}
