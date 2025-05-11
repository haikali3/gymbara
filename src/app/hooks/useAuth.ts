import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "@/services/userService";
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
