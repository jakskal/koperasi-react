import {useQuery} from "@tanstack/react-query";
import {fetchListTipeSimpanan} from "./api";

export function useListTipeSimpanan() {
  // Placeholder for future hook implementation
  return useQuery({
    queryKey: ["listTipeSimpanan"],
    queryFn: fetchListTipeSimpanan,
  });
}
