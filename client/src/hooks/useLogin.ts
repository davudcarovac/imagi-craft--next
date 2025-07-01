import { loginUser } from "@/api/user/loginApi";
import { LoginUserData } from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (userData: LoginUserData) => loginUser(userData),
  });

  return { mutate, isPending, data };
};
