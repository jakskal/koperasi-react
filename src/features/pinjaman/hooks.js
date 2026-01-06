import {useQuery} from "@tanstack/react-query";
import {fetchListPinjaman} from "./api";
import {fetchLoanTypes, fetchUserOptions} from "../../services/selectedOptions";

export function useListPinjaman() {
  return useQuery({
    queryKey: ["listPinjaman"],
    queryFn: fetchListPinjaman,
  });
}

export function useSelectLoanTypes() {
  return useQuery({
    queryKey: ["loanTypes"],
    queryFn: fetchLoanTypes,
  });
}

export function useSelectUserOptions() {
  return useQuery({
    queryKey: ["userOptions"],
    queryFn: fetchUserOptions,
  });
}
