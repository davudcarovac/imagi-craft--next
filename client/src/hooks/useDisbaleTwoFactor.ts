import { disableTwoFactor } from "@/api/user/disableTwoFactorApi";
import { useMutation } from "@tanstack/react-query";

export const useDisableTwoFactor = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (data: { currentPassword: string }) => disableTwoFactor(data),
  });

  return { mutate, isPending, data };
};
