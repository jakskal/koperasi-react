import {Link} from "@tanstack/react-router";

export default function SideBar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/anggota">Anggota</Link>
        </li>
      </ul>
    </div>
  );
}
