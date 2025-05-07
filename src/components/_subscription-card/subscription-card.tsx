// src/components/_subscription-card/subscription-card.tsx
"use client";
import { ChevronRight, Lock, BadgeCheck, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCancelSubscription } from "@/app/hooks/useCancelSubscription";
import { useRenewSubscription } from "@/app/hooks/useRenewSubscription";
import { Subscription } from "@/types/payment-type";
import { CancelSubscriptionDialog } from "../_dialog/cancel-subscription-dialog";
import { RenewSubscriptionDialog } from "../_dialog/renew-subscription-dialog";

type Props = {
  isLoggedIn: boolean;
  loadingSub: boolean;
  subscription?: Subscription;
};

export const SubscriptionCard = ({
  isLoggedIn,
  loadingSub,
  subscription,
}: Props) => {
  const router = useRouter();
  const { mutate: cancelSub, isPending: cancelLoading } =
    useCancelSubscription();
  const { mutate: renewSub, isPending: renewLoading } = useRenewSubscription();

  const handleCancelSubscription = () => {
    if (!subscription?.subscription_id) return;
    cancelSub(subscription.subscription_id);
  };

  const handleRenewSubscription = () => {
    if (!subscription?.subscription_id) return;
    renewSub({
      subscription_id: subscription.subscription_id,
      customer_id: subscription.customer_id,
      price_id: subscription.price_id,
      frontend_url: window.location.origin,
    });
  };

  // helper to format e.g. "Jun 7"
  const formatShortDate = (d: string | number | Date) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

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
            <Lock className="h-4 w-4 mr-1" />
            Login Required
          </Button>
        </>
      ) : loadingSub ? (
        <p className="text-sm text-gray-600 animate-pulse">
          Checking subscription status...
        </p>
      ) : subscription?.is_active ? (
        <>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Active
            </span>
            {subscription.cancel_at_period_end && (
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                Cancels {formatShortDate(subscription.expiration_date)} ⏰
              </span>
            )}
          </div>

          <Button
            onClick={() => router.push("/payment")}
            className="w-full mb-2"
          >
            Manage Plan
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>

          {subscription.cancel_at_period_end ? (
            <RenewSubscriptionDialog
              onConfirm={handleRenewSubscription}
              loading={renewLoading}
            />
          ) : (
            // No pending cancel → show Cancel dialog
            <CancelSubscriptionDialog
              onConfirm={handleCancelSubscription}
              loading={cancelLoading}
            />
          )}
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600 pb-1">
            You're not subscribed to a premium plan.
          </p>
          <Button onClick={() => router.push("/payment")} className="w-full">
            Subscribe Now
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </>
      )}
    </div>
  );
};
