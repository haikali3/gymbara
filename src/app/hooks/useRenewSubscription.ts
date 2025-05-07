import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/app/hooks/use-toast";
import { StandardResponse } from "@/types/standard-response";
import { renewSubscription } from "@/services/api";

export function useRenewSubscription() {
  const qc = useQueryClient();
  return useMutation<StandardResponse<{ message: string; next_renewal: string }>, Error>({
    mutationFn: renewSubscription,
    onSuccess: (response) => {
      toast({
        title: `${response.statusCode} – ${response.message}`,
        description: response.data.message,
      });
      // refetch subscription so UI updates
      qc.invalidateQueries({ queryKey: ["subscription"] });
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
