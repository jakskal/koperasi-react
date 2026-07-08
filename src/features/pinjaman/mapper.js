export function mapListPinjaman(data) {
  return {
    id: data.id,
    user_id: data.user_id,
    user_name: data.user.name,
    name: data.name,
    amount: `Rp ${parseInt(data.amount).toLocaleString("id-ID")}`,
    loan_type: data.loan_type.name,
    installment_qty_target: `${data.installment_qty_target} bulan`,
    total_ratio_amount: `Rp ${parseInt(data.total_ratio_amount).toLocaleString("id-ID")}`,
    transaction_date: new Date(data.transaction_date).toLocaleDateString("id-ID"),
    member_id: data.user.attribute.member_id,
  };
}
