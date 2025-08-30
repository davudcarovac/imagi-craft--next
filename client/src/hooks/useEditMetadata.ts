import { editMetadata } from "@/api/editMetadataApi";
import { useMutation } from "@tanstack/react-query";

export const useEditMetadata = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (editMetadataData: FormData) => editMetadata(editMetadataData),
  });

  return { mutate, isPending, data };
};
