import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";
import { BorderBeam } from "@/components/magicui/border-beam"; // Adjust if needed

type PricingPlanProps = {
  name: string;
  price: string;
  billingCycle?: "month" | "year";
  description: string;
  features: string[];
  isPopular?: boolean;
  savingsText?: string;
};

export const PricingPlan = ({
  name,
  price,
  billingCycle,
  description,
  features,
  isPopular = false,
  savingsText,
}: PricingPlanProps) => (
  <div
    className={`relative overflow-hidden rounded-xl border bg-white p-8 shadow-sm ${
      isPopular ? "border-gray-0" : "border-gray-200"
    }`}
  >
    {/* Only render beam borders if it's the popular plan */}
    {isPopular && (
      <>
        <BorderBeam
          duration={6}
          size={400}
          className="from-transparent via-orange-500 to-transparent"
        />
        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          className="from-transparent via-red-500 to-transparent"
        />
      </>
    )}

    {isPopular && (
      <Typography
        variant="small"
        className="mx-auto mb-4 w-fit rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-white"
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
          <span className="text-base font-normal text-gray-500">
            /{billingCycle === "year" ? "year" : "month"}
          </span>
        )}
      </Typography>
      {savingsText && (
        <Typography variant="small" className="mt-1 block text-gray-700">
          {savingsText}
        </Typography>
      )}
    </div>

    <Typography variant="muted" className="mb-6">
      {description}
    </Typography>

    <div className="flex-grow">
      <ul className="mb-8 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <Check
              size={18}
              className="mr-2 mt-0.5 flex-shrink-0 text-gray-800"
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
      {price === "Free" ? "Sign Up Free" : "Start Seeing Results Today"}
    </Button>
  </div>
);
