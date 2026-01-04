import {useQuery} from "@tanstack/react-query";
import {fetchListAnggota} from "./api";

export function useListAnggota() {
  return useQuery({
    queryKey: ["listAnggota"],
    queryFn: fetchListAnggota,
  });
}
