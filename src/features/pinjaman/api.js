import {fetchAPI} from "../../services/http";

export async function fetchListPinjaman() {
  const res = await fetchAPI("/v1/admin/loan");
  return res.data;
}

export async function fetchPinjamanDetail(id) {
  const res = await fetchAPI(`/v1/admin/loan/${id}`);
  return res;
}

export async function createPinjaman(data) {
  const payload = {
    ...data,
    user_id: parseInt(data.user_id),
    installment_qty_target: parseInt(data.installment_qty_target),
    amount: parseInt(data.amount),
    loan_type_id: parseInt(data.loan_type_id),
    transaction_date: new Date(data.transaction_date).toISOString(),
  };

  return fetchAPI("/v1/admin/loan", {
    method: "POST",
    body: payload,
  });
}

export async function updatePinjaman(data) {
  const payload = {
    name: data.name,
    loan_type_id: parseInt(data.loan_type_id),
    amount: parseInt(data.amount),
    installment_qty_target: parseInt(data.installment_qty_target),
    transaction_date: new Date(data.transaction_date).toISOString(),
    notes: data.notes,
  };

  console.log("data", data);

  return fetchAPI(`/v1/admin/loan/${data.id}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deletePinjaman(id) {
  return fetchAPI(`/v1/admin/loan/${id}`, {method: "DELETE"});
}
