import {useQuery} from "@tanstack/react-query";
import {fetchAnggotaDetail, fetchAnggotaSavingSummary, fetchListAnggota} from "./api";

export function useListAnggota(params = {}) {
  const {page = 1, pageSize = 10, keyword = "", roleID, excludeRoleID} = params;

  return useQuery({
    queryKey: ["listAnggota", page, pageSize, keyword, roleID, excludeRoleID],
    queryFn: () => fetchListAnggota({page, pageSize, keyword, roleID, excludeRoleID}),
  });
}

export function useAnggotaDetail(id) {
  return useQuery({
    queryKey: ["anggotaDetail", id],
    queryFn: () => fetchAnggotaDetail(id),
    enabled: !!id,
  });
}

export function useAnggotaSavingSummary(id) {
  return useQuery({
    queryKey: ["anggotaSavingSummary", id],
    queryFn: () => fetchAnggotaSavingSummary(id),
    enabled: !!id,
  });
}
