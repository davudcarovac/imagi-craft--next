import { getUser } from "@/api/user/getUserApi";
import { getUserResponse } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "./useAuthContext";

export const useGetUser = () => {
  const { user: localUser } = useAuthContext();
  const { data, isPending, error } = useQuery<getUserResponse>({
    queryKey: ["user"],
    queryFn: async () => getUser(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: !!localUser,
  });

  const user = data?.user;
  return { user, isPending, error };
};
