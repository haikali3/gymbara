"use client";
import { ChevronRight, Lock, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  isLoggedIn: boolean;
  loadingSub: boolean;
  subscription?: {
    is_active: boolean;
    expiration_date: string | number | Date;
  };
};

export const SubscriptionCard = ({
  isLoggedIn,
  loadingSub,
  subscription,
}: Props) => {
  const router = useRouter();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg p-4">
      <div className="flex gap-1 items-center pb-2">
        <BadgeCheck className="h-5 w-5 text-gray-800" />
        <h3 className="text-lg font-semibold text-gray-800">Subscription</h3>
      </div>

      {!isLoggedIn ? (
        <>
          <p className="text-sm text-gray-600 pb-1">
            Please sign in to manage your subscription.
          </p>
          <Button disabled className="w-full">
            <Lock className="h-4 w-4" />
            Login Required
          </Button>
        </>
      ) : loadingSub ? (
        <p className="text-sm text-gray-600 animate-pulse">
          Checking subscription status...
        </p>
      ) : subscription?.is_active ? (
        <>
          <p className="text-sm text-green-600 font-medium pb-2">
            Active until{" "}
            {new Date(subscription.expiration_date).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            )}
          </p>
          <Button onClick={() => router.push("/payment")} className="w-full">
            Manage Plan
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600 pb-1">
            You're not subscribed to a premium plan.
          </p>
          <Button onClick={() => router.push("/payment")} className="w-full">
            Subscribe Now
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
};
