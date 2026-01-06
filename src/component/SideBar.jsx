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
      </ul>
    </div>
  );
}
