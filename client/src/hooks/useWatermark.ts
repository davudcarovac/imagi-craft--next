import { useMutation } from "@tanstack/react-query";
import { watermarkImage } from "../api/watermarkApi";

export const useWatermark = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (resizeData: FormData) => watermarkImage(resizeData),
  });

  return { mutate, isPending, data };
};
