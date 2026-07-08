import {fetchAPI} from "./http";

export async function fetchLoanTypes(params) {
  let queryParams = "";
  if (params) {
    const queryArray = Object.entries(params).map(
      ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    );
    queryParams = `?${queryArray.join("&")}`;
  }
  const res = await fetchAPI(`/v1/admin/loan-type${queryParams}`);
  return res.data;
}

export async function fetchUserOptions(params) {
  let queryParams = "";
  if (params) {
    const queryArray = Object.entries(params).map(
      ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    );
    queryParams = `?${queryArray.join("&")}`;
  }
  const res = await fetchAPI(`/v1/admin/users${queryParams}`);
  return res.data;
}

export async function fetchSavingTypeOptions() {
  const res = await fetchAPI("/v1/admin/saving-type");
  return res.data;
}
