// hooks/useCancelSubscription.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/app/hooks/use-toast";
import { cancelSubscription } from "@/services/api";

export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error & { statusCode?: number; apiStatus?: string },
    string
  >({
    mutationFn: cancelSubscription,
    onSuccess: () => {
      toast({ description: "Subscription cancelled. Thank you" });
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
    },
    onError: (err) => {
      console.error(err);
      const code = err.statusCode ?? 0;
      toast({
        title: `Error ${code}`,
        description: err.message,
        variant: "destructive",
      });
    },
  });
}
