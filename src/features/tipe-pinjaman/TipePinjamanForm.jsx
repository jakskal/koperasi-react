import {useState} from "react";

export default function TipePinjamanForm({data, onSubmit}) {
  const [formData, setFormData] = useState({
    id: data?.id || null,
    name: data?.name || "",
    ratio_percentage: data?.ratio_percentage || "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nama Tipe Pinjaman:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Bagi hasil (%):
        <input
          type="number"
          name="ratio_percentage"
          value={formData.ratio_percentage}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Simpan</button>
    </form>
  );
}
