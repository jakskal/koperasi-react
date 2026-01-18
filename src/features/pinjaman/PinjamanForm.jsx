import {useState} from "react";
import {generateRandomString} from "../../services/seed";
import {useSelectLoanTypes, useSelectUserOptions} from "./hooks";
import {formatDate} from "../../utils/formatDate";

export default function PinjamanForm({data, onSubmit}) {
  const dateNow = new Date().toISOString();
  let dateStr = formatDate(dateNow);
  const [form, setForm] = useState({
    id: data?.id || null,
    user_id: data?.user_id || "",
    loan_type_id: data?.loan_type_id || "",
    name: data?.name || generateRandomString(),
    installment_qty_target: data?.installment_qty_target || 12,
    amount: data?.amount || "",
    notes: data?.notes || generateRandomString(),
    transaction_date: data?.transaction_date ? formatDate(data.transaction_date) : dateStr,
  });

  const {data: members} = useSelectUserOptions();
  const {data: loanTypes} = useSelectLoanTypes({status: "ACTIVE"});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <select name="user_id" value={form.user_id} onChange={handleChange}>
        <option value="">Pilih Anggota</option>
        {members &&
          members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
      </select>
      <select name="loan_type_id" value={form.loan_type_id} onChange={handleChange}>
        <option value="">Pilih Jenis Pinjaman</option>
        {loanTypes &&
          loanTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
      </select>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nama, contoh: Modal Usaha"
      />
      <input
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Jumlah Pinjaman"
      />
      <input
        name="installment_qty_target"
        value={form.installment_qty_target}
        onChange={handleChange}
        placeholder="Target Jangka Cicilan (bulan)"
      />
      <input name="notes" value={form.notes} onChange={handleChange} placeholder="catatan" />
      <input
        type="date"
        name="transaction_date"
        value={form.transaction_date}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
