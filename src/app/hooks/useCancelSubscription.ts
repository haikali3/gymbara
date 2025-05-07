// hooks/useCancelSubscription.ts
"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/app/hooks/use-toast";
import {
  cancelSubscription,
} from "@/services/api";
import { CancelSubResponse } from "@/types/standard-response";

export function useCancelSubscription() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: cancelSubscription,
    onSuccess: async (response) => {
      toast({
        title: `${response.statusCode} – ${response.message}`,
        description: response.data.message,
      });
      // Invalidate and refetch immediately
      await qc.invalidateQueries({ queryKey: ["subscription"] });
      await qc.refetchQueries({ queryKey: ["subscription"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
