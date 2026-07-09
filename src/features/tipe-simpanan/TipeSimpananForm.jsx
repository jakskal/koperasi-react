import {useState} from "react";

export default function TipeSimpananForm({data, onSubmit}) {
  const [formData, setFormData] = useState({
    id: data?.id || null,
    name: data?.name || "",
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
        Nama Tipe Simpanan
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <button type="submit">Simpan</button>
    </form>
  );
}
