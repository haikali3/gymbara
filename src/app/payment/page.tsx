"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { createStripeCheckoutSession } from "@/services/paymentService";
import { fetchUserDetails } from "@/services/userService";
import { UserDetails } from "@/types/type";
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
import { toast } from "@/app/hooks/use-toast";
import PageWrapper from "@/components/_layout/page-wrapper";

export default function PaymentPage() {
  const router = useRouter();

  const { data: user, isLoading } = useQuery<UserDetails>({
    queryKey: ["userDetails"],
    queryFn: fetchUserDetails,
    retry: false,
  });

  const handleSubscribe = async () => {
    if (!user?.email) {
      toast({
        title: "Error",
        description: "User's email is missing.",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await createStripeCheckoutSession(user.email);
      window.location.href = res.url;
    } catch (error: any) {
      // Handle both API errors and network errors
      const errorMessage = error.message || "Payment initiation failed.";
      const statusCode = error.statusCode || 500;

      toast({
        title: `Error - ${statusCode}`,
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <PageWrapper>
      <Header title="gymbara" />

      <div className="grid gap-8 md:grid-cols-3 lg:gap-10 max-w-6xl mx-auto">
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
                onClick={plan.id === "pro" ? handleSubscribe : plan.onClick}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Footer />
    </PageWrapper>
  );
}
