"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  fetchUserDetails,
  createStripeCheckoutSession,
} from "@/utils/services/api";
import { UserDetails } from "@/app/types/type";
import { Button } from "@/components/ui/button";
import Header from "@/components/_layout/header";
import Footer from "@/components/_layout/footer";
import { Check } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { pricingPlans } from "./pricing-plans";

export default function PaymentPage() {
  const router = useRouter();

  const { data: user, isLoading } = useQuery<UserDetails>({
    queryKey: ["userDetails"],
    queryFn: fetchUserDetails,
    retry: false,
  });

  const handleSubscribe = async () => {
    try {
      const { url } = await createStripeCheckoutSession();
      window.location.href = url;
    } catch (error) {
      alert("Payment initiation failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      <Header title="gymbara" />

      <div className="grid gap-8 md:grid-cols-3 lg:gap-10 max-w-6xl mx-auto px-4">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`flex flex-col relative ${
              plan.isPopular ? "border-primary" : ""
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-0 right-0 flex justify-center">
                <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                  {plan.highlight}
                </span>
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-xl">{plan.title}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">
                  {plan.priceSuffix}
                </span>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                variant={plan.buttonVariant}
                disabled={plan.buttonDisabled}
                onClick={plan.onClick}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Footer />
    </div>
  );
}
