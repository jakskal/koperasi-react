import {fetchAPI} from "../../services/http";

export async function fetchListTipeSimpanan() {
  const res = await fetchAPI("/v1/admin/saving-type");
  return res.data;
}

export async function createTipeSimpanan(data) {
  console.log("API data:", data);
  const payload = {
    name: data.name,
  };

  return fetchAPI("/v1/admin/saving-type", {
    method: "POST",
    body: payload,
  });
}

export async function updateTipeSimpanan(data) {
  const payload = {};

  if (data.name) {
    payload.name = data.name;
  }

  if (data.status !== undefined) {
    payload.status = data.status;
  }

  return fetchAPI(`/v1/admin/saving-type/${data.id}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteTipeSimpanan(id) {
  return fetchAPI(`/v1/admin/saving-type/${id}`, {method: "DELETE"});
}
