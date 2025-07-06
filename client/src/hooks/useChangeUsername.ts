import { changeName } from "@/api/user/changeNameApi";

import { useMutation } from "@tanstack/react-query";

export const useChangeUsername = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (newName: string) => changeName(newName),
  });

  return { mutate, isPending, data };
};
