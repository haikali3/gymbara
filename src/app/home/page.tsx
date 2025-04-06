import CTASection from "@/components/_landing-page/cta-section";
import FeaturesSection from "@/components/_landing-page/features-section";
import HeroSection from "@/components/_landing-page/hero-section";
import PricingSection from "@/components/_landing-page/pricing-section";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Separator className="my-1 border-t border-gray-200 shadow-2xl" />
      <PricingSection />
      <CTASection />
    </>
  );
}
