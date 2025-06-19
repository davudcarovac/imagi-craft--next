import { useMutation } from "@tanstack/react-query";
import { compressImage } from "../api/compressApi";

export const useCompress = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (compressData: FormData) => compressImage(compressData),
  });

  return { mutate, isPending, data };
};
