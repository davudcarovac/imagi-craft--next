import { useMutation } from "@tanstack/react-query";
import { uploadProfileImage } from "@/api/user/uploadProfileImageApi";

export const useUploadProfileImage = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (data: FormData) => uploadProfileImage(data),
  });

  return { mutate, isPending, data };
};
