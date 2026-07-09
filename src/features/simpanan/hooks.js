import {useQuery} from "@tanstack/react-query";
import {fetchListSimpanan} from "./api";
import {fetchSavingTypeOptions, fetchUserOptions} from "../../services/selectedOptions";

export function useListSimpanan(params = {}) {
  const {page = 1, pageSize = 10, keyword = ""} = params;

  return useQuery({
    queryKey: ["listSimpanan", page, pageSize, keyword],
    queryFn: () => fetchListSimpanan({page, pageSize, keyword}),
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
    queryKey: ["userOptions", page_size, 3],
    queryFn: () => fetchUserOptions({page_size, role_id: 3}),
  });
}
