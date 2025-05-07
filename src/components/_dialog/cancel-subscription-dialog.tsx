"use client";
import { X, Loader2 } from "lucide-react";
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

export type CancelSubscriptionDialogProps = {
  onConfirm: () => void;
  loading: boolean;
};

export const CancelSubscriptionDialog = ({
  onConfirm,
  loading,
}: CancelSubscriptionDialogProps) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="outline" className="w-full mb-2">
        <X className="h-4 w-4 mr-1" />
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
        <AlertDialogCancel>Keep My Plan</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
            variant="destructive"
            disabled={loading}
            onClick={onConfirm}
            className="w-full"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : (
              <X className="h-4 w-4 mr-1" />
            )}
            Cancel Subscription
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
