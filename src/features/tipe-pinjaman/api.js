import {fetchAPI} from "../../services/http";

export async function fetchListTipePinjaman() {
  const res = await fetchAPI("/v1/admin/loan-type");
  return res.data;
}

export async function createTipePinjaman(data) {
  console.log("API data:", data);
  const payload = {
    name: data.name,
    ratio_percentage: parseFloat(data.ratio_percentage),
    status: data.status || "INACTIVE",
  };

  return fetchAPI("/v1/admin/loan-type", {
    method: "POST",
    body: payload,
  });
}

export async function updateTipePinjaman(data) {
  const payload = {};

  if (data.name) {
    payload.name = data.name;
  }

  if (data.ratio_percentage !== undefined) {
    payload.ratio_percentage = parseFloat(data.ratio_percentage);
  }

  if (data.status !== undefined) {
    payload.status = data.status;
  }

  return fetchAPI(`/v1/admin/loan-type/${data.id}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteTipePinjaman(id) {
  return fetchAPI(`/v1/admin/loan-type/${id}`, {method: "DELETE"});
}
