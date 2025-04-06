import { Check, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";

type PricingPlanProps = {
  name: string;
  price: string;
  billingCycle: "month" | "year";
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
          <span className="text-base font-normal text-gray-500">
            /{billingCycle === "year" ? "year" : "month"}
          </span>
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
      {price === "Free" ? "Sign Up Free" : "Start Seeing Results Today"}
    </Button>

    {/* {isPopular && (
      <div className="mt-3 text-xs text-center text-gray-500">
        <div className="flex justify-center mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className="fill-amber-500 text-amber-500" />
          ))}
        </div>
        <span>4.9/5 from 2,000+ reviews</span>
      </div>
    )} */}
  </div>
);
