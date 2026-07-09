import {useState} from "react";
import {formatDate} from "../../utils/formatDate";
import {formatCurrencyInput, normalizeCurrencyInput} from "../../utils/currency";

export default function CicilanForm({loanId, onSubmit, onUpdate}) {
  const dateNow = new Date().toISOString();
  let dateStr = formatDate(dateNow);
  const [form, setForm] = useState({
    loan_id: loanId,
    transaction_type_id: 1, // Assuming 1 is the ID for 'Cicilan Pokok'
    amount: "",
    payment_date: dateStr,
    notes: "",
    status: "PENDING",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const handleCurrencyChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: normalizeCurrencyInput(value)});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__group">
        <label htmlFor="transaction_type">Tipe Transaksi</label>
        <select
          id="transaction_type"
          name="transaction_type_id"
          value={form.transaction_type_id}
          onChange={handleChange}
        >
          <option value="1">Cicilan Pokok</option>
          <option value="2">Bagi Hasil</option>
        </select>
      </div>
      <div className="form__group">
        <label htmlFor="amount">Jumlah Cicilan *</label>
        <input
          id="amount"
          type="text"
          name="amount"
          value={formatCurrencyInput(form.amount)}
          onChange={handleCurrencyChange}
          inputMode="numeric"
          placeholder="Masukkan jumlah cicilan"
          required
        />
      </div>

      <div className="form__group">
        <label htmlFor="payment_date">Tanggal Pembayaran *</label>
        <input
          id="payment_date"
          type="date"
          name="payment_date"
          value={form.payment_date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form__group">
        <label htmlFor="notes">Catatan</label>
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Catatan (opsional)"
          rows="3"
        />
      </div>

      <div className="form__group">
        <label htmlFor="status">Status Cicilan</label>
        <select id="status" name="status" value={form.status} onChange={handleChange}>
          <option value="PAID">Lunas</option>
          <option value="PENDING">Menunggu Pembayaran</option>
          <option value="OVERDUE">Jatuh Tempo</option>
          {onUpdate && <option value="CANCELLED">Dibatalkan</option>}
        </select>
      </div>

      <button type="submit" className="form__submit-btn">
        Simpan Cicilan
      </button>
    </form>
  );
}
