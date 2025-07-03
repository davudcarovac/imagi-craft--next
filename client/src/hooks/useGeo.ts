import { axiosInstance } from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGeo = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["geo"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/geo");
        return response.data;
      } catch (error) {
        console.log("Axios error ===> ", error);
      }
    },
  });

  return { data, isPending, error };
};
