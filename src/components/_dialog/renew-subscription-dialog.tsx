"use client";
import { RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export type RenewSubscriptionDialogProps = {
  onConfirm: () => void;
  loading: boolean;
};

export const RenewSubscriptionDialog = ({
  onConfirm,
  loading,
}: RenewSubscriptionDialogProps) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="outline" className="w-full mb-2">
        <RefreshCw className="h-4 w-4 mr-1" />
        Renew Subscription
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Reactivate Your Plan?</AlertDialogTitle>
        <AlertDialogDescription>
          You previously cancelled at period end. Would you like to resume now
          and keep your premium access without interruption?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Not Now</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
            variant="default"
            disabled={loading}
            onClick={onConfirm}
            className="w-full"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-1" />
            )}
            Yes, Resume Plan
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
