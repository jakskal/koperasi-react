import {useQuery} from "@tanstack/react-query";
import {fetchInstallmentByLoanId} from "./api";

export function useInstallmentByLoanId(loanId) {
  // Placeholder for actual implementation
  // This function would typically use a data fetching library like React Query or SWR
  // to fetch and cache the installment data based on the provided loanId.
  // For example:
  //
  // return useQuery(['installments', loanId], () => fetchInstallmentByLoanId(loanId));
  return useQuery({
    queryKey: ["installments", loanId],
    queryFn: () => fetchInstallmentByLoanId(loanId),
    enabled: !!loanId,
  });
}
