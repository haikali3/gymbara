// hooks/useCancelSubscription.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/app/hooks/use-toast";
import { cancelSubscription } from "@/services/api";   // ← import the new fn

export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    // now just calls your api helper
    mutationFn: cancelSubscription,
    onSuccess: () => {
      toast({ description: "Subscription cancelled. Thank you" });
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
    },
    onError: (err) => {
      console.error(err);
      toast({
        description: err.message ?? "Could not cancel. Please try again.",
        variant: "destructive",
      });
    },
  });
}
