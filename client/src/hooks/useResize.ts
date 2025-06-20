import { useMutation } from "@tanstack/react-query";
import { resizeImage } from "../api/resizeApi";

export const useResize = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (resizeData: FormData) => resizeImage(resizeData),
  });

  return { mutate, isPending, data };
};
