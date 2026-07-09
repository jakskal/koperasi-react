import {useState} from "react";
import {formatDate} from "../../utils/formatDate";

export default function AnggotaForm({data, onSubmit, isLoading = false}) {
  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 15);
  };
  const generateMemberId = () => {
    const random = Math.floor(Math.random() * 10000);
    return `MEM${random}`;
  };

  const dateNow = new Date().toISOString();
  let dateStr = formatDate(dateNow);
  const formData = {
    name: "anggota ke " + Math.floor(Math.random() * 1000),
    email: generateRandomString() + "@yopmail.com",
    phone: 62881092839,
    password: "password",
    status_id: 1,
    role_id: 3,
    attribute: {
      member_id: generateMemberId(),
      is_active_member: true,
      join_date: dateStr,
      birth: dateStr,
      birth_place: "bandung",
      address: "jalan puter",
      profession: "wiraswasta",
    },
  };
  const [form, setForm] = useState(
    data
      ? {
          ...data,
          attribute: {
            ...data.attribute,
            join_date: formatDate(data.attribute.join_date),
            birth: formatDate(data.attribute.birth),
          },
        }
      : formData,
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const {name, type, checked, value} = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setForm({...form, [name]: inputValue});
  };

  const handleNestedChange = (parent, e) => {
    const {name, type, checked, value} = e.target;
    const inputValue = type === "checkbox" ? checked : name === "is_active_member" ? value === "true" : value;
    setForm({
      ...form,
      [parent]: {
        ...form[parent],
        [name]: inputValue,
      },
    });
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <label>
        Nama
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nama" />
      </label>
      <label>
        Password
        <div style={{position: "relative"}}>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)"}}
          >
            {showPassword ? "Sembunyikan" : "Tampilkan"}
          </button>
        </div>
      </label>
      <label>
        Email
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
        />
      </label>
      <label>
        No. HP
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="No. HP"
          type="phone"
        />
      </label>
      <label>
        Peran
        <select name="role_id" value={form.role_id} onChange={handleChange}>
          <option value=""> -- Pilih Peran --</option>
          <option value="2">Admin</option>
          <option value="3">Anggota</option>
        </select>
      </label>
      <label>
        Status Keanggotaan
        <select name="status_id" value={form.status_id} onChange={handleChange}>
          <option value=""> -- Status Keanggotaan --</option>
          <option value="1">Baru</option>
          <option value="2">Sudah Terverifikasi</option>
        </select>
      </label>
      <label>
        Nomor Anggota
        <input
          name="member_id"
          value={form.attribute.member_id}
          onChange={(e) => handleNestedChange("attribute", e)}
          placeholder="Nomor Anggota"
          required={String(form.role_id) === "3"}
        />
      </label>
      <label>
        Status Anggota
        <select
          name="is_active_member"
          value={String(form.attribute.is_active_member)}
          onChange={(e) => handleNestedChange("attribute", e)}
        >
          <option value="true">Aktif</option>
          <option value="false">Tidak Aktif</option>
        </select>
      </label>
      <label>
        Tanggal Bergabung
        <input
          type="date"
          name="join_date"
          value={form.attribute.join_date}
          onChange={(e) => handleNestedChange("attribute", e)}
        />
      </label>
      <label>
        Tanggal Lahir
        <input
          type="date"
          name="birth"
          value={form.attribute.birth}
          onChange={(e) => handleNestedChange("attribute", e)}
        />
      </label>
      <label>
        Tempat Lahir
        <input
          name="birth_place"
          value={form.attribute.birth_place}
          onChange={(e) => handleNestedChange("attribute", e)}
          placeholder="Tempat Lahir"
        />
      </label>
      <label>
        Alamat
        <input
          name="address"
          value={form.attribute.address}
          onChange={(e) => handleNestedChange("attribute", e)}
          placeholder="Alamat"
        />
      </label>
      <label>
        Profesi
        <input
          name="profession"
          value={form.attribute.profession}
          onChange={(e) => handleNestedChange("attribute", e)}
          placeholder="Profesi"
        />
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}
