import {useState} from "react";
import {generateRandomString} from "../../services/seed";
import {useSelectLoanTypes, useSelectUserOptions} from "./hooks";
import {formatDate} from "../../utils/formatDate";
import {formatCurrencyInput, normalizeCurrencyInput} from "../../utils/currency";

export default function PinjamanForm({data, onSubmit, isLoading = false}) {
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

  const {data: members} = useSelectUserOptions(100);
  const {data: loanTypes} = useSelectLoanTypes({status: "ACTIVE"});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const handleCurrencyChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: normalizeCurrencyInput(value)});
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <label>
        Anggota
        <select name="user_id" value={form.user_id} onChange={handleChange}>
          <option value="">Pilih Anggota</option>
          {members &&
            members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
        </select>
      </label>
      <label>
        Jenis Pinjaman
        <select name="loan_type_id" value={form.loan_type_id} onChange={handleChange}>
          <option value="">Pilih Jenis Pinjaman</option>
          {loanTypes &&
            loanTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
        </select>
      </label>
      <label>
        Tujuan Pinjaman
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama, contoh: Modal Usaha"
        />
      </label>
      <label>
        Jumlah Pinjaman
        <input
          name="amount"
          value={formatCurrencyInput(form.amount)}
          onChange={handleCurrencyChange}
          inputMode="numeric"
          placeholder="Jumlah Pinjaman"
        />
      </label>
      <label>
        Jangka Cicilan
        <input
          name="installment_qty_target"
          value={form.installment_qty_target}
          onChange={handleChange}
          placeholder="Target Jangka Cicilan (bulan)"
        />
      </label>
      <label>
        Catatan
        <input name="notes" value={form.notes} onChange={handleChange} placeholder="Catatan" />
      </label>
      <label>
        Tanggal Pinjaman
        <input
          type="date"
          name="transaction_date"
          value={form.transaction_date}
          onChange={handleChange}
        />
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Menyimpan..." : "Simpan Pinjaman"}
      </button>
    </form>
  );
}
