import {useQuery} from "@tanstack/react-query";
import {fetchListTipePinjaman} from "./api";

export function useListipePinjaman() {
  // Placeholder for future hook implementation
  return useQuery({
    queryKey: ["listTipePinjaman"],
    queryFn: fetchListTipePinjaman,
  });
}
