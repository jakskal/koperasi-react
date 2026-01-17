export function formatDate(dateString) {
  if (!dateString) return "";
  return dateString.split("T")[0];
}

export const formatDateWithTime = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  const dateStr = d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const timeStr = d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return `${dateStr} ${timeStr}`;
};
