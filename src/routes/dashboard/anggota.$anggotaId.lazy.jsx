import {createLazyFileRoute, useNavigate} from "@tanstack/react-router";
import {FiArrowLeft, FiPlus} from "react-icons/fi";
import {useAnggotaDetail, useAnggotaSavingSummary} from "../../features/anggota/hooks";
import "../../styles/dashboard-anggota-detail.css";

export const Route = createLazyFileRoute("/dashboard/anggota/$anggotaId")({
  component: AnggotaDetailRouteComponent,
});

function formatCurrency(value) {
  return `Rp ${parseInt(value || 0).toLocaleString("id-ID")}`;
}

function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function AnggotaDetailRouteComponent() {
  const {anggotaId} = Route.useParams();
  const navigate = useNavigate();
  const {data: anggota, isLoading: isAnggotaLoading} = useAnggotaDetail(anggotaId);
  const {data: summary, isLoading: isSummaryLoading} = useAnggotaSavingSummary(anggotaId);

  if (isAnggotaLoading || isSummaryLoading) return <p>Memuat detail anggota...</p>;

  const attribute = anggota?.attribute || {};
  const byType = summary?.by_type || [];

  return (
    <div className="anggota-detail">
      <div className="anggota-detail__header">
        <h3>Detail Anggota</h3>
        <div className="anggota-detail__actions">
          <button onClick={() => navigate({to: "/dashboard/anggota"})}>
            <FiArrowLeft /> Kembali
          </button>
          <button className="button-primary" onClick={() => navigate({to: "/dashboard/simpanan"})}>
            <FiPlus /> Tambah Transaksi Simpanan
          </button>
        </div>
      </div>

      <section className="anggota-detail__section">
        <div className="anggota-detail__profile">
          <div className="anggota-detail__field">
            <span className="anggota-detail__label">Nama</span>
            <span className="anggota-detail__value">{anggota?.name || "-"}</span>
          </div>
          <div className="anggota-detail__field">
            <span className="anggota-detail__label">Nomor Anggota</span>
            <span className="anggota-detail__value">{attribute.member_id || "-"}</span>
          </div>
          <div className="anggota-detail__field">
            <span className="anggota-detail__label">Email</span>
            <span className="anggota-detail__value">{anggota?.email || "-"}</span>
          </div>
          <div className="anggota-detail__field">
            <span className="anggota-detail__label">Status</span>
            <span className="anggota-detail__value">
              {attribute.is_active_member ? "Aktif" : "Tidak Aktif"}
            </span>
          </div>
          <div className="anggota-detail__field">
            <span className="anggota-detail__label">Tanggal Bergabung</span>
            <span className="anggota-detail__value">{formatDate(attribute.join_date)}</span>
          </div>
          <div className="anggota-detail__field">
            <span className="anggota-detail__label">Profesi</span>
            <span className="anggota-detail__value">{attribute.profession || "-"}</span>
          </div>
        </div>
      </section>

      <section className="anggota-detail__section">
        <h4>Ringkasan Simpanan</h4>
        <div className="anggota-detail__summary">
          <div className="anggota-detail__metric">
            <span className="anggota-detail__label">Total Setoran</span>
            <span className="anggota-detail__value">{formatCurrency(summary?.total_deposit)}</span>
          </div>
          <div className="anggota-detail__metric">
            <span className="anggota-detail__label">Total Penarikan</span>
            <span className="anggota-detail__value">
              {formatCurrency(summary?.total_withdrawal)}
            </span>
          </div>
          <div className="anggota-detail__metric">
            <span className="anggota-detail__label">Saldo Akhir</span>
            <span className="anggota-detail__value">{formatCurrency(summary?.balance)}</span>
          </div>
        </div>

        {byType.length === 0 ? (
          <p className="anggota-detail__empty">Belum ada transaksi simpanan untuk anggota ini.</p>
        ) : (
          <div className="anggota-detail__table">
            <table>
              <thead>
                <tr>
                  <th>Tipe Simpanan</th>
                  <th>Total Setoran</th>
                  <th>Total Penarikan</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {byType.map((item) => (
                  <tr key={item.saving_type_id}>
                    <td>{item.saving_type_name}</td>
                    <td>{formatCurrency(item.total_deposit)}</td>
                    <td>{formatCurrency(item.total_withdrawal)}</td>
                    <td>{formatCurrency(item.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
