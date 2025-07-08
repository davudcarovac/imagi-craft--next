import { verifyLoginTwoFactor } from "@/api/user/verifyLoginTwoFactorApi";
import { VerifyLoginTwoFactorData } from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";

export const useVerifyLoginTwoFactor = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (data: VerifyLoginTwoFactorData) => verifyLoginTwoFactor(data),
  });

  return { mutate, isPending, data };
};
