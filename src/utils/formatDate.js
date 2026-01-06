export function formatDate(dateString) {
  if (!dateString) return "";
  return dateString.split("T")[0];
}
