import { forgotPasswordUser } from "@/api/user/forgotPasswordApi";
import { useMutation } from "@tanstack/react-query";

export const useForgotPassword = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (userData: { email: string }) => forgotPasswordUser(userData),
  });

  return { mutate, isPending, error };
};
