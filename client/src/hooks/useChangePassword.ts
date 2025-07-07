import { changePasswordUser } from "@/api/user/changePasswordApi";
import { ChangePasswordData } from "@/types/apiTypes";

import { useMutation } from "@tanstack/react-query";

export const useChangePassword = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (data: ChangePasswordData) => changePasswordUser(data),
  });

  return { mutate, isPending, data };
};
