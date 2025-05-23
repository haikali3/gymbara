import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { PricingPlan } from "../_pricing-plan/pricing-plan";
import { Badge } from "../ui/badge";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-6">LIMITED TIME OFFER: SAVE RM20!</Badge>

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
            billingCycle="month"
            description="The perfect balance of features for fitness enthusiasts."
            features={[
              "Full workout library access",
              "Personalized workout plans",
              "Instant access after sign-up",
              "Early access supporter - help shape the future of Gymbara",
              "Ad-free experience",
              "Routine by real gym-goers for real progress",
              "Cancel anytime - no hidden fees",
            ]}
            isPopular
          />

          <PricingPlan
            name="Elite"
            price="RM99.99"
            billingCycle="year"
            description="The ultimate fitness experience with premium coaching."
            features={[
              "Everything in Premium",
              "Unlock all upcoming exclusive workouts",
              "Exclusive elite workouts",
              "Priority support & feature requests",
              "Early access to experimental features",
              "1-on-1 virtual coaching",
              "Priority support",
            ]}
            savingsText="Save 20% with annual billing"
          />
        </div>

        <div className="mt-12 text-center">
          <Badge className="mb-6 inline-block px-4 py-2 font-medium">
            100% Money-Back Guarantee
          </Badge>

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
