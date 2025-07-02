import { resetPasswordUser } from "@/api/user/resetPasswordApi";
import { ResetPasswordUserData } from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";

export const useResetPassword = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (userData: ResetPasswordUserData) =>
      resetPasswordUser(userData),
  });

  return { mutate, isPending, error };
};
