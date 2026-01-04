import {fetchAPI} from "../../services/http";

export async function fetchListAnggota() {
  const res = await fetchAPI("/v1/admin/users");
  return res.data;
}

export async function createAnggota(data) {
  const payload = {
    ...data,
    phone: parseInt(data.phone),
    status_id: parseInt(data.status_id),
    role_id: parseInt(data.role_id),
    attribute: {
      ...data.attribute,
      join_date: new Date(data.attribute.join_date).toISOString(),
      birth: new Date(data.attribute.birth).toISOString(),
    },
  };

  return fetchAPI("/v1/admin/user", {
    method: "POST",
    body: payload,
  });
}

export async function deleteAnggota(id) {
  return fetchAPI(`/v1/admin/user/${id}`, {method: "DELETE"});
}

export async function updateAnggota(data) {
  const payload = {
    ...data,
    phone: parseInt(data.phone),
    status_id: parseInt(data.status_id),
    role_id: parseInt(data.role_id),
    attribute: {
      ...data.attribute,
      join_date: new Date(data.attribute.join_date).toISOString(),
      birth: new Date(data.attribute.birth).toISOString(),
    },
  };

  return fetchAPI(`/v1/admin/user/${data.id}`, {
    method: "PUT",
    body: payload,
  });
}
