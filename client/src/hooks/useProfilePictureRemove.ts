import { removeProfileImage } from "@/api/user/removeProfileImageApi";
import { useMutation } from "@tanstack/react-query";

export const useProfilePictureRemove = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => removeProfileImage(),
  });

  return { mutate, isPending, error };
};
