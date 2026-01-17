import {fetchAPI} from "../../services/http";

export async function fetchInstallmentByLoanId(loanId) {
  const res = await fetchAPI(`/v1/admin/loan-installment?loan_id=${loanId}`);
  return res.data;
}

export async function createInstallment(data) {
  let principal_amount = 0;
  let interest_amount = 0;
  let transaction_type_id = parseInt(data.transaction_type_id);

  if (transaction_type_id === 1) {
    principal_amount = parseInt(data.amount);
  } else if (transaction_type_id === 2) {
    interest_amount = parseInt(data.amount);
  }
  const payload = {
    loan_id: parseInt(data.loan_id),
    transaction_type_id: parseInt(data.transaction_type_id),
    principal_amount: principal_amount,
    interest_amount: interest_amount,
    payment_date: new Date(data.payment_date).toISOString(),
    notes: data.notes,
    status: data.status,
  };

  return fetchAPI("/v1/admin/loan-installment", {
    method: "POST",
    body: payload,
  });
}

export async function updateInstallment(data) {
  const payload = {
    amount: parseInt(data.amount),
    payment_date: new Date(data.payment_date).toISOString(),
    notes: data.notes,
  };

  return fetchAPI(`/v1/admin/loan-installment/${data.id}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteInstallment(id) {
  return fetchAPI(`/v1/admin/loan-installment/${id}`, {method: "DELETE"});
}

export async function markInstallmentAsPaid(id) {
  const payload = {
    status: "PAID",
  };

  return fetchAPI(`/v1/admin/loan-installment/${id}/status`, {
    method: "PATCH",
    body: payload,
  });
}

export async function markInstallmentAsCancelled(id, notes) {
  const payload = {
    status: "CANCELLED",
    notes: notes,
  };

  return fetchAPI(`/v1/admin/loan-installment/${id}/status`, {
    method: "PATCH",
    body: payload,
  });
}
