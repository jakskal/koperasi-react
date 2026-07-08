import {useQuery} from "@tanstack/react-query";
import {fetchListSimpanan} from "./api";
import {fetchSavingTypeOptions, fetchUserOptions} from "../../services/selectedOptions";

export function useListSimpanan() {
  return useQuery({
    queryKey: ["listSimpanan"],
    queryFn: fetchListSimpanan,
  });
}

export function useSelectSavingTypeOptions() {
  return useQuery({
    queryKey: ["savingTypeOptions"],
    queryFn: fetchSavingTypeOptions,
  });
}

export function useSelectUserOptions(page_size = 200) {
  return useQuery({
    queryKey: ["userOptions", page_size],
    queryFn: () => fetchUserOptions({page_size}),
  });
}
