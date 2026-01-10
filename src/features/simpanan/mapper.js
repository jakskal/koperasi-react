export function mapListSimpanan(data) {
  return {
    id: data.id,
    saving_type_name: data.saving_type.name,
    user_name: data.user.name,
    user_id: data.user_id,
    transaction_type_name:
      data.transaction_type_id == 1
        ? "Penarikan"
        : data.transaction_type_id == 2
          ? "Deposit"
          : "Undefined",
    transaction_date: new Date(data.transaction_date).toLocaleDateString("id-ID"),
    amount: `Rp ${parseInt(data.amount).toLocaleString("id-ID")}`,
  };
}
