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
    description:
      "Explore Gymbara with limited access. Ideal for browsing.",
    price: "0 MYR",
    priceSuffix: "/month",
    features: [
      "Preview workout plans",
      "Basic profile setup",
      "Limited access to app features",
      "Upgrade anytime to unlock workouts",
    ],
    buttonText: "Try for Free",
    buttonVariant: "outline",
  },
  {
    id: "pro",
    title: "Pro",
    description:
      "Unlock all workouts, track your progress, and build strength. Perfect for committed gym-goers and fitness lovers.",
    price: "10.00 MYR",
    priceSuffix: "/month",
    features: [
      "Access all workout programs",
      "Track your sets, reps, and load",
      "Smart progress tracking",
      "Weekly performance insights",
      "Priority feature access",
      "Premium support",
    ],
    highlight: "Most Popular",
    isPopular: true,
    buttonText: "Subscribe Now",
    buttonVariant: "default",
  },
  {
    id: "forever",
    title: "Forever",
    description:
      "One-time payment for lifetime premium access. Best for dedicated users who are in it for the long run.",
    price: "199 MYR",
    priceSuffix: " (one-time)",
    features: [
      "Lifetime access to all premium workouts",
      "Unlimited progress tracking",
      "Priority updates & features",
      "Dedicated support",
      "Early access to future expansions",
      "No monthly fees ever again",
    ],
    buttonText: "Coming Soon",
    buttonVariant: "outline",
    buttonDisabled: true,
  },
];
