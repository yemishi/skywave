import { useQuery } from "@tanstack/react-query";
import { ResponseType } from "../../types";

interface DataType extends ResponseType {
  error: false,
  message: string
}



export default function UseQuery({ location }: { location: string }) {
  const fetchData = async () => {
    if (!location) return;
    try {
      const data: DataType = await fetch(
        `${import.meta.env.VITE_API_URL}/suggest-music?city=${location}`
      ).then((res) => res.json());
      return data;
    } catch (error) {
      const data = {
        error: true,
        message: "We encountered an error while trying to retrieve the data.",
      }
      return data as DataType 
        }
  };
  const { data, refetch, isLoading } = useQuery({
    queryKey: [location],
    queryFn: fetchData,
    enabled: false,
  });

  return {
    data,
    refetch: () => refetch(),
    isLoading,
  };
}
