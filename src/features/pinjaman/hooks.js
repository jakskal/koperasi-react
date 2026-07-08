import {useQuery} from "@tanstack/react-query";
import {fetchListPinjaman, fetchPinjamanDetail} from "./api";
import {fetchLoanTypes, fetchUserOptions} from "../../services/selectedOptions";

export function useListPinjaman(params = {}) {
  const {
    page = 1,
    pageSize = 2,
    status = "",
    loanType = "",
    sortBy = "transaction_date",
    sortOrder = "desc",
    keyWord = "",
  } = params;
  return useQuery({
    queryKey: ["listPinjaman", page, pageSize, loanType, status, sortBy, sortOrder, keyWord],
    queryFn: () =>
      fetchListPinjaman({page, pageSize, loanType, status, sortBy, sortOrder, keyWord}),
  });
}

export function useSelectLoanTypes(params) {
  return useQuery({
    queryKey: ["loanTypes"],
    queryFn: () => fetchLoanTypes(params),
  });
}

export function useSelectUserOptions(page_size = 200) {
  return useQuery({
    queryKey: ["userOptions", page_size],
    queryFn: () => fetchUserOptions({page_size}),
  });
}

export function usePinjamanDetail(id) {
  return useQuery({
    queryKey: ["pinjamanDetail", id],
    queryFn: () => fetchPinjamanDetail(id),
    enabled: !!id,
  });
}
