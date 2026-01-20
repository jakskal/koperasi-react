import {fetchAPI} from "./http";

export async function login(email, password) {
  const response = await fetchAPI("/v1/login", {
    method: "POST",
    body: {email, password},
  });
  return response;
}

export async function logout() {
  localStorage.removeItem("token");
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export async function getProfile() {
  return await fetchAPI("/v1/user/profile");
}
