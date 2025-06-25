import { cropfaceImage } from "@/api/cropfaceApi";
import { useMutation } from "@tanstack/react-query";

export const useCropface = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (cropfaceData: FormData) => cropfaceImage(cropfaceData),
  });

  return { mutate, isPending, data };
};
