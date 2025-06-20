import { useMutation } from "@tanstack/react-query";
import { cropImage } from "../api/cropApi";

export const useCrop = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (cropData: FormData) => cropImage(cropData),
  });

  return { mutate, isPending, data };
};
