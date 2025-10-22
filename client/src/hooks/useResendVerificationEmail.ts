import { resendVerificationEmail } from "@/api/user/resendVerificationEmailApi";
import { ResendVerificationEmailData } from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";

export const useResendVerificationEmail = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (userData: ResendVerificationEmailData) =>
      resendVerificationEmail(userData),
  });

  return { mutate, isPending, error };
};
