import {fetchAPI} from "../../services/http";

export async function fetchListAnggota(params = {}) {
  const {page = 1, pageSize = 10, keyword = "", roleID, excludeRoleID} = params;
  const queryParams = new URLSearchParams();

  queryParams.append("page", page);
  queryParams.append("page_size", pageSize);
  if (keyword) queryParams.append("keyword", keyword);
  if (roleID !== undefined) queryParams.append("role_id", roleID);
  if (excludeRoleID !== undefined) queryParams.append("exclude_role_id", excludeRoleID);

  return fetchAPI(`/v1/admin/users?${queryParams.toString()}`);
}

export async function fetchAnggotaDetail(id) {
  const res = await fetchAPI(`/v1/admin/user/${id}`);
  return res.data;
}

export async function fetchAnggotaSavingSummary(id) {
  const res = await fetchAPI(`/v1/admin/users/${id}/saving-summary`);
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
