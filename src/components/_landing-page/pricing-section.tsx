import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Check, Star } from "lucide-react";

type PricingPlanProps = {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  savingsText?: string;
};

const PricingPlan = ({
  name,
  price,
  description,
  features,
  isPopular = false,
  savingsText,
}: PricingPlanProps) => (
  <div
    className={`p-8 border rounded-xl bg-white flex flex-col shadow-sm ${
      isPopular ? "border-gray-300 shadow-md" : "border-gray-200"
    }`}
  >
    {isPopular && (
      <Typography
        variant="small"
        className="bg-gray-800 text-white text-sm font-medium py-1 px-3 rounded-full w-fit mx-auto mb-4"
      >
        Most Popular
      </Typography>
    )}

    <Typography variant="h3" className="mb-2">
      {name}
    </Typography>

    <div className="mb-4">
      <Typography variant="h2" className="text-gray-800">
        {price}
        {price !== "Free" && (
          <span className="text-base font-normal text-gray-500">/month</span>
        )}
      </Typography>
      {savingsText && (
        <Typography variant="small" className="text-gray-700 mt-1 block">
          {savingsText}
        </Typography>
      )}
    </div>

    <Typography variant="muted" className="mb-6">
      {description}
    </Typography>

    <div className="flex-grow">
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <Check
              size={18}
              className="text-gray-800 mr-2 mt-0.5 flex-shrink-0"
            />
            <Typography variant="small" className="text-gray-700">
              {feature}
            </Typography>
          </li>
        ))}
      </ul>
    </div>

    <Button
      className={`w-full rounded-full ${
        isPopular
          ? "bg-gray-900 text-white hover:bg-gray-800"
          : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"
      }`}
      variant={isPopular ? "default" : "outline"}
    >
      {price === "Free" ? "Sign Up Free" : "Start 14-Day Free Trial"}
    </Button>

    {isPopular && (
      <div className="mt-3 text-xs text-center text-gray-500">
        <div className="flex justify-center mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-amber-500 text-amber-500" />
          ))}
        </div>
        <span>4.9/5 from 2,000+ reviews</span>
      </div>
    )}
  </div>
);

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
            All plans include a <strong>14-day free trial</strong> with full
            access to premium features. No credit card required to start.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingPlan
            name="Basic"
            price="Free"
            description="Perfect for beginners starting their fitness journey."
            features={[
              "Access to basic workout library",
              "Manual workout logging",
              "Basic progress tracking",
              "Community forums access",
              "Ad-supported experience",
            ]}
          />

          <PricingPlan
            name="Premium"
            price="$9.99"
            description="The perfect balance of features for fitness enthusiasts."
            features={[
              "Everything in Basic",
              "Full workout library access",
              "Advanced progress analytics",
              "Personalized workout plans",
              "Nutrition tracking & meal plans",
              "Ad-free experience",
            ]}
            isPopular
            savingsText="Save 20% with annual billing"
          />

          <PricingPlan
            name="Elite"
            price="$19.99"
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
