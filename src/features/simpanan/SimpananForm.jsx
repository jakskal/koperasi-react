import {generateRandomString} from "../../services/seed";
import {formatDate} from "../../utils/formatDate";
import {useState} from "react";
import {useSelectSavingTypeOptions, useSelectUserOptions} from "./hooks";
import {formatCurrencyInput, normalizeCurrencyInput} from "../../utils/currency";

export default function SimpananForm({data, isEdit, onSubmit, isLoading = false}) {
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
        Jenis Simpanan
        <select name="saving_type_id" value={form.saving_type_id} onChange={handleChange}>
          <option value="">Pilih Jenis Simpanan</option>
          {savingTypes &&
            savingTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
        </select>
      </label>
      <label>
        Tipe Transaksi
        <select name="transaction_type_id" value={form.transaction_type_id} onChange={handleChange}>
          <option value="">Pilih Tipe Transaksi</option>
          <option value="1">Setoran</option>
          <option value="2">Penarikan</option>
        </select>
      </label>
      <label>
        Jumlah
        <input
          name="amount"
          value={formatCurrencyInput(form.amount)}
          onChange={handleCurrencyChange}
          inputMode="numeric"
          placeholder="Jumlah Simpanan"
        />
      </label>
      <label>
        Tanggal Transaksi
        <input
          type="date"
          name="transaction_date"
          value={form.transaction_date}
          onChange={handleChange}
          placeholder="Tanggal transaksi"
        />
      </label>
      <label>
        Catatan
        <input name="note" value={form.note} onChange={handleChange} placeholder="Catatan" />
      </label>
      {isEdit && (
        <label>
          Catatan Perubahan
          <input
            name="change_note"
            value={form.change_note}
            onChange={handleChange}
            placeholder="Catatan perubahan data"
          />
        </label>
      )}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Menyimpan..." : `${isEdit ? "Ubah" : "Buat"} Simpanan`}
      </button>
    </form>
  );
}
