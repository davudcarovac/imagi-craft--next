import { logoutUser } from "@/api/user/logoutApi";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => logoutUser(),
  });

  return { mutate, isPending, error };
};
