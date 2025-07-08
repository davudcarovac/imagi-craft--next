import { verifyEnableTwoFactor } from "@/api/user/verifyEnableTwoFactorApi";
import { verifyEnableTwoFactorData } from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";

export const useVerifyEnableTwoFactor = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (data: verifyEnableTwoFactorData) =>
      verifyEnableTwoFactor(data),
  });

  return { mutate, isPending, data };
};
