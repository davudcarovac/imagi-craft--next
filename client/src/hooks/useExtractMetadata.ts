import { extractMetadataImage } from "@/api/extractMetadataApi";
import { useMutation } from "@tanstack/react-query";

export const useExtractMetadata = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (cropfaceData: FormData) => extractMetadataImage(cropfaceData),
  });

  return { mutate, isPending, data };
};
