import { getUser } from "@/api/user/getUserApi";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => getUser(),
  });

  const user = data?.user;
  return { user, isPending, error };
};
