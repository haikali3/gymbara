export interface PricingPlan {
  id: string;
  title: string;
  description: string;
  price: string;
  priceSuffix: string;
  features: string[];
  highlight?: string;
  isPopular?: boolean;
  buttonText: string;
  buttonVariant?: "default" | "outline";
  buttonDisabled?: boolean;
  onClick?: () => void;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    title: "Free",
    description: "Perfect for getting started",
    price: "0 MYR",
    priceSuffix: "/month",
    features: [
      "5 projects",
      "Up to 10 users",
      "Basic analytics",
      "48-hour support response time",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
  },
  {
    id: "pro",
    title: "Pro",
    description: "Perfect for small teams",
    price: "29MYR",
    priceSuffix: "/month",
    features: [
      "Unlimited projects",
      "Up to 50 users",
      "Advanced analytics",
      "24-hour support response time",
      "Custom integrations",
      "API access",
    ],
    highlight: "Most Popular",
    isPopular: true,
    buttonText: "Subscribe Now",
    buttonVariant: "default",
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "For large organizations",
    price: "$99",
    priceSuffix: "/month",
    features: [
      "Unlimited everything",
      "Unlimited users",
      "Premium analytics",
      "1-hour support response time",
      "Advanced security",
      "Dedicated account manager",
      "Custom training",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    buttonDisabled: true,
  },
];
