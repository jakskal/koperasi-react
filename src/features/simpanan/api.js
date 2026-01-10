import {fetchAPI} from "../../services/http";

export async function fetchListSimpanan() {
  const res = await fetchAPI("/v1/admin/saving");
  console.log("res", res);
  return res.data;
}

export async function createSimpanan(data) {
  const payload = {
    user_id: parseInt(data.user_id),
    saving_type_id: parseInt(data.saving_type_id),
    transaction_type_id: parseInt(data.transaction_type_id),
    transaction_date: new Date(data.transaction_date).toISOString(),
    amount: parseInt(data.amount),
    notes: data.notes,
  };

  return fetchAPI("/v1/admin/saving", {
    method: "POST",
    body: payload,
  });
}

export async function updateSimpanan(data) {
  const payload = {
    transaction_type_id: parseInt(data.transaction_type_id),
    amount: parseInt(data.amount),
    notes: data.notes,
    change_notes: data.change_notes,
  };

  return fetchAPI(`/v1/admin/saving/${data.id}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteSimpanan(id) {
  return fetchAPI(`/v1/admin/saving/${id}`, {
    method: "DELETE",
  });
}
