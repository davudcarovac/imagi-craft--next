import { axiosInstance } from "@/api/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type GeoResponse = {
  country: string;
  ip: string;
  city: string;
};

export const useGeo = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["geo"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<GeoResponse>("/geo");
        return response.data;
      } catch (error) {
        console.log("Axios error ===> ", error);
      }
    },
  });

  return { data, isPending, error };
};
