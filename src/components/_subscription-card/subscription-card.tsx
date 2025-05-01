"use client";
import { ChevronRight, Lock, BadgeCheck, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useCancelSubscription } from "@/app/hooks/useCancelSubscription";
import { Subscription } from "@/types/payment-type";

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

  function handleCancelSubscription() {
    if (!subscription?.subscription_id) return;
    cancelSub(subscription.subscription_id);
  }

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
          <p className="text-sm text-green-600 font-medium mb-4">
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full mt-1">
                <X className="h-4 w-4" />
                Cancel Subscription
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to cancel your subscription?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You can still work out as long as your subscription is active.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    variant="destructive"
                    disabled={cancelLoading}
                    onClick={handleCancelSubscription}
                    className="w-full"
                  >
                    {cancelLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <X className="h-4 w-4" />
                        Cancel Subscription
                      </>
                    )}
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
