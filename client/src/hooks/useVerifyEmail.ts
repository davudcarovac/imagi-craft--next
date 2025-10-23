import { verifyEmail } from "@/api/user/verifyEmailApi";
import { VerifyEmailData } from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";

export const useVerifyEmail = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (data: VerifyEmailData) => verifyEmail(data),
  });

  return { mutate, isPending, data };
};
