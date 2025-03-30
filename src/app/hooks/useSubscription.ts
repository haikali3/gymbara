import { useQuery } from "@tanstack/react-query";
import { fetchUserSubscription } from "@/utils/services/api";

export const useSubscription = (enabled: boolean) => {
  const { data, isLoading } = useQuery({
    queryKey: ["userSubscription"],
    queryFn: fetchUserSubscription,
    enabled,
  });

  return {
    subscription: data,
    isLoading,
  };
};
