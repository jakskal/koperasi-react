import {generateRandomString} from "../../services/seed";
import {formatDate} from "../../utils/formatDate";
import {useState} from "react";
import {useSelectSavingTypeOptions, useSelectUserOptions} from "./hooks";

export default function SimpananForm({data, isEdit, onSubmit}) {
  const dateNow = new Date().toISOString();
  let dateStr = formatDate(dateNow);
  const [form, setForm] = useState({
    id: data?.id || null,
    user_id: data?.user_id || "",
    saving_type_id: data?.saving_type_id || 1,
    transaction_type_id: data?.transaction_type_id || 1,
    amount: data?.amount || 200000,
    transaction_date: data?.transaction_date ? formatDate(data.transaction_date) : dateStr,
    note: data?.note || generateRandomString(),
    change_note: data?.change_note || generateRandomString(),
  });

  const {data: members} = useSelectUserOptions();
  const {data: savingTypes} = useSelectSavingTypeOptions();

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
      <select name="saving_type_id" value={form.saving_type_id} onChange={handleChange}>
        <option value="">Pilih Jenis Simpanan</option>
        {savingTypes &&
          savingTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
      </select>
      <select name="transaction_type_id" value={form.transaction_type_id} onChange={handleChange}>
        <option value="">Pilih Tipe Transaksi</option>
        <option value="1">Penarikan</option>
        <option value="2">Deposit</option>
      </select>
      <input
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Jumlah Simpanan"
      />
      <input
        type="date"
        name="transaction_date"
        value={form.transaction_date}
        onChange={handleChange}
        placeholder="tanggal transaksi"
      />
      <input name="note" value={form.note} onChange={handleChange} placeholder="catatan" />
      {isEdit && (
        <input
          name="change_note"
          value={form.change_note}
          onChange={handleChange}
          placeholder="catatan perubahan data"
        />
      )}
      <button type="submit">{isEdit ? "Update" : "Buat"} Simpanan</button>
    </form>
  );
}
