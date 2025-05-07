// hooks/useCancelSubscription.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/app/hooks/use-toast";
import {
  cancelSubscription,
} from "@/services/api";
import { CancelSubResponse } from "@/types/standard-response";

export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation<
    CancelSubResponse,        // now we get the API payload back
    Error & { statusCode?: number },  
    string                    // subscription ID
  >({
    mutationFn: cancelSubscription,
    onSuccess: (res) => {
      toast({
        title: `${res.statusCode} – ${res.message}`,  // “200 – Subscription cancellation scheduled”
        description: res.data.message,               // “Your subscription has been cancelled…”
      });
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
    },
    onError: (err) => {
      console.error(err);
      toast({
        title: `Error ${err.statusCode ?? 0}`,
        description: err.message,
        variant: "destructive",
      });
    },
  });
}
