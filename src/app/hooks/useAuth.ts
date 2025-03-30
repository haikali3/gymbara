import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "@/utils/services/api";
import { UserDetails } from "@/types/type";

export const useAuth = () => {
  const { data, isLoading, isError } = useQuery<UserDetails>({
    queryKey: ["userDetails"],
    queryFn: fetchUserDetails,
  });

  return {
    user: data,
    isLoading,
    isError,
    isLoggedIn: !!data && !isError,
  };
};
