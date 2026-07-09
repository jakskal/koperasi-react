import {createFileRoute} from "@tanstack/react-router";
import {useContext} from "react";
import {AuthContext} from "../../context";

export const Route = createFileRoute("/dashboard/")({
  component: Index,
});

function Index() {
  const {user} = useContext(AuthContext);
  const isAdminRole = [0, 1, 2].includes(user?.role_id);

  if (!isAdminRole) {
    return (
      <div className="page-panel" style={{padding: "20px"}}>
        <h3>Dashboard member belum tersedia</h3>
        <p style={{marginBottom: 0}}>
          Akun ini terdaftar sebagai member. Silakan hubungi admin koperasi untuk melihat atau
          mengubah data simpanan dan pinjaman.
        </p>
      </div>
    );
  }

  return (
    <div className="page-panel" style={{padding: "20px"}}>
      <h3>Dashboard Admin</h3>
      <p style={{marginBottom: 0}}>Gunakan menu di samping untuk mengelola anggota, simpanan, dan pinjaman.</p>
    </div>
  );
}
