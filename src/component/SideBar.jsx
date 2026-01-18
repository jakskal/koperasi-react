import {Link} from "@tanstack/react-router";
import {useState} from "react";

export default function SideBar() {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleClick = (key) => {
    setSelectedMenu(key);
  };

  const selectedClass = "dashboard__sidebar--selected";

  return (
    <div>
      <ul>
        <li
          key="admin"
          className={selectedMenu == "admin" ? selectedClass : ""}
          onClick={() => {
            handleClick("admin");
          }}
        >
          <Link to="/dashboard/admin">Admin</Link>
        </li>
        <li
          key="anggota"
          className={selectedMenu == "anggota" ? selectedClass : ""}
          onClick={() => {
            handleClick("anggota");
          }}
        >
          <Link to="/dashboard/anggota">Anggota</Link>
        </li>

        <li
          key="pinjaman"
          className={selectedMenu == "pinjaman" ? selectedClass : ""}
          onClick={() => {
            handleClick("pinjaman");
          }}
        >
          <Link to="/dashboard/pinjaman">Pinjaman</Link>
        </li>
        <li
          key="tipe-pinjaman"
          className={selectedMenu == "tipe-pinjaman" ? selectedClass : ""}
          onClick={() => {
            handleClick("tipe-pinjaman");
          }}
        >
          <Link to="/dashboard/tipe-pinjaman">Tipe Pinjaman</Link>
        </li>
        <li
          key="simpanan"
          className={selectedMenu == "simpanan" ? selectedClass : ""}
          onClick={() => {
            handleClick("simpanan");
          }}
        >
          <Link to="/dashboard/simpanan">Simpanan</Link>
        </li>
        <li
          key="tipe-simpanan"
          className={selectedMenu == "tipe-simpanan" ? selectedClass : ""}
          onClick={() => {
            handleClick("tipe-simpanan");
          }}
        >
          <Link to="/dashboard/tipe-simpanan">Tipe Simpanan</Link>
        </li>
      </ul>
    </div>
  );
}
