import { extractMetadataImage } from "@/api/extractMetadataApi";
import { useMutation } from "@tanstack/react-query";

export const useExtractMetadata = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (extractMetadataData: FormData) =>
      extractMetadataImage(extractMetadataData),
  });

  return { mutate, isPending, data };
};
