import { setupTwoFactor } from "@/api/user/setupTwoFactorApi";
import { useMutation } from "@tanstack/react-query";

export const useTwoFactorSetup = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: () => setupTwoFactor(),
  });

  return { mutate, isPending, data };
};
