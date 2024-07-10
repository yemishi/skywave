import { useQuery } from "@tanstack/react-query";
import { ResponseType } from "../../types";

type DataType =
  | {
      error: true;
      message: string;
    }
  | ResponseType;

export default function UseQuery({ location }: { location: string }) {
  const fetchData = async () => {
    const data: DataType = await fetch(
      `${import.meta.env.VITE_API_URL}?city=${location}`
    ).then((res) => res.json());
    return data;
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
