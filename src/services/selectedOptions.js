import {fetchAPI} from "./http";

export async function fetchLoanTypes() {
  const res = await fetchAPI("/v1/admin/loan-type");
  return res.data;
}

export async function fetchUserOptions() {
  const res = await fetchAPI("/v1/admin/users");
  return res.data;
}

export async function fetchSavingTypeOptions() {
  const res = await fetchAPI("/v1/admin/saving-type");
  return res.data;
}
