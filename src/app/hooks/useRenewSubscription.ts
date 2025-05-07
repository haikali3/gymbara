import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RenewSubscriptionResponse } from "@/types/payment-type";
import { toast } from "@/app/hooks/use-toast";

interface RenewPayload {
  subscription_id: string;
  customer_id: string;
  price_id: string;
  frontend_url: string;
}

export function useRenewSubscription() {
  const qc = useQueryClient();
  return useMutation<RenewSubscriptionResponse, Error, RenewPayload>({
    mutationFn: (payload: RenewPayload) =>
      fetch("/payment/renew-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      }),
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
