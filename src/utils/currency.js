export function normalizeCurrencyInput(value) {
  return String(value ?? "").replace(/\D/g, "");
}

export function formatCurrencyInput(value) {
  const digits = normalizeCurrencyInput(value);
  if (!digits) return "";

  return `Rp ${Number(digits).toLocaleString("id-ID")}`;
}
