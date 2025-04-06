import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Check, Star } from "lucide-react";
import { PricingPlan } from "../_pricing-plan/pricing-plan";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Typography
            variant="small"
            className="inline-block text-gray-800 text-sm px-4 py-1 rounded-full mb-4 font-medium bg-gray-100"
          >
            SPECIAL OFFER
          </Typography>

          <Typography variant="h2" className="mb-4">
            Save 20% with Annual Plans
          </Typography>

          <Typography
            variant="lead"
            className="text-gray-600 md:max-w-2xl mx-auto"
          >
            Gymbara Premium and get instant access to all features for just
            <strong> RM10/month </strong> (or less with yearly billing).
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingPlan
            name="Basic"
            price="Free"
            description="Perfect for beginners starting their fitness journey."
            features={[
              "Sign up for free without commitment",
              "Upgrade anytime to unlock workouts, tracking & more",
            ]}
          />

          <PricingPlan
            name="Premium"
            price="RM10"
            description="The perfect balance of features for fitness enthusiasts."
            features={[
              "Full workout library access",
              "Personalized workout plans",
              "Cancel anytime - no hidden fees",
              "Instant access after sign-up",
              "Ad-free experience",
              "Built by real gym-goers for real progress",
              "Early access supporter - help shape the future of Gymbara",
            ]}
            isPopular
            savingsText="Save 20% with annual billing"
          />

          <PricingPlan
            name="Elite"
            price="RM99.99"
            description="The ultimate fitness experience with premium coaching."
            features={[
              "Everything in Premium",
              "1-on-1 virtual coaching",
              "Advanced health metrics",
              "Personalized nutrition advice",
              "Exclusive elite workouts",
              "Early access to new features",
              "Priority support",
            ]}
            savingsText="Save 20% with annual billing"
          />
        </div>

        <div className="mt-12 text-center">
          <Typography
            variant="small"
            className="mb-6 inline-block rounded-full px-4 py-2 bg-gray-100 font-medium text-gray-800"
          >
            100% Money-Back Guarantee
          </Typography>

          <Typography variant="muted" className="mb-2">
            Try risk-free with our 30-day money-back guarantee
          </Typography>

          <Typography variant="small" className="text-gray-500">
            Prices may vary by country. Annual billing available with 20%
            discount.
          </Typography>
        </div>
      </div>
    </section>
  );
}
