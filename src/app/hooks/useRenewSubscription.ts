import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RenewSubscriptionResponse } from "@/types/payment-type";

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
    onSuccess: () => {
      // refetch subscription so UI updates
      qc.invalidateQueries({ queryKey: ["subscription"] });
      },
    }
  );
}
