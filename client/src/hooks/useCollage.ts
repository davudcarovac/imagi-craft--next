import { useMutation } from "@tanstack/react-query";
import { collageImage } from "@/api/collageApi";

export const useCollage = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (collageData: FormData) => collageImage(collageData),
  });

  return { mutate, isPending, data };
};
