import { useMutation } from "@tanstack/react-query";
import { convertImage } from "../api/convertApi";

export const useConvert = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (convertData: FormData) => convertImage(convertData),
  });

  return { mutate, isPending, data };
};
