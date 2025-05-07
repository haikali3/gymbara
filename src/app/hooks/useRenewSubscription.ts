import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/app/hooks/use-toast";
import { StandardResponse } from "@/types/standard-response";
import { renewSubscription } from "@/services/api";

export function useRenewSubscription() {
  const qc = useQueryClient();
  return useMutation<StandardResponse<{ message: string; next_renewal: string }>, Error & { statusCode?: number }>({
    mutationFn: renewSubscription,
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
        title: `Error ${error.statusCode ?? 400}`,
        description: error.message || "Failed to renew subscription",
        variant: "destructive",
      });
    }
  });
}
