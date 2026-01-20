import {Link, useNavigate} from "@tanstack/react-router";
import {useState} from "react";

export default function SideBar() {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleClick = (key) => {
    setSelectedMenu(key);
  };

  const navigate = useNavigate();

  const selectedClass = "dashboard__sidebar--selected";

  return (
    <div>
      <ul>
        <li
          key="admin"
          className={selectedMenu == "admin" ? selectedClass : ""}
          style={{cursor: "pointer"}}
          onClick={() => {
            handleClick("admin");
            navigate({to: "/dashboard/admin"});
          }}
        >
          <Link to="/dashboard/admin">Admin</Link>
        </li>
        <li
          key="anggota"
          className={selectedMenu == "anggota" ? selectedClass : ""}
          style={{cursor: "pointer"}}
          onClick={() => {
            handleClick("anggota");
            navigate({to: "/dashboard/anggota"});
          }}
        >
          <Link to="/dashboard/anggota">Anggota</Link>
        </li>

        <li
          key="pinjaman"
          className={selectedMenu == "pinjaman" ? selectedClass : ""}
          style={{cursor: "pointer"}}
          onClick={() => {
            handleClick("pinjaman");
            navigate({to: "/dashboard/pinjaman"});
          }}
        >
          <Link to="/dashboard/pinjaman">Pinjaman</Link>
        </li>
        <li
          key="tipe-pinjaman"
          className={selectedMenu == "tipe-pinjaman" ? selectedClass : ""}
          style={{cursor: "pointer"}}
          onClick={() => {
            handleClick("tipe-pinjaman");
            navigate({to: "/dashboard/tipe-pinjaman"});
          }}
        >
          <Link to="/dashboard/tipe-pinjaman">Tipe Pinjaman</Link>
        </li>
        <li
          key="simpanan"
          className={selectedMenu == "simpanan" ? selectedClass : ""}
          style={{cursor: "pointer"}}
          onClick={() => {
            handleClick("simpanan");
            navigate({to: "/dashboard/simpanan"});
          }}
        >
          <Link to="/dashboard/simpanan">Simpanan</Link>
        </li>
        <li
          key="tipe-simpanan"
          className={selectedMenu == "tipe-simpanan" ? selectedClass : ""}
          style={{cursor: "pointer"}}
          onClick={() => {
            handleClick("tipe-simpanan");
            navigate({to: "/dashboard/tipe-simpanan"});
          }}
        >
          <Link to="/dashboard/tipe-simpanan">Tipe Simpanan</Link>
        </li>
      </ul>
    </div>
  );
}
