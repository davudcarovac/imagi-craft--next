import { signupUser } from "@/api/user/signupApi";
import { SignupUserData } from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (userData: SignupUserData) => signupUser(userData),
  });

  return { mutate, isPending, data };
};
