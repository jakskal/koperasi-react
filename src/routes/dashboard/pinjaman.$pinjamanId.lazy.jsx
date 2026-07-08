import {createLazyFileRoute, useNavigate} from "@tanstack/react-router";
import {usePinjamanDetail} from "../../features/pinjaman/hooks";
import {useInstallmentByLoanId as useInstallmentsByLoanId} from "../../features/installment/hooks";
import {FiArrowLeft} from "react-icons/fi";
import "../../styles/dashboard-pinjaman-detail.css";
import {useState} from "react";
import DataTable from "../../component/Datatable/Datatable";
import Modal from "../../modal/Modal";
import CicilanForm from "../../features/installment/CicilanForm";
import {createInstallment, markInstallmentAsCancelled} from "../../features/installment/api";
import {FiEdit, FiEye} from "react-icons/fi";
import {markInstallmentAsPaid} from "../../features/installment/api";
import {formatDateWithTime} from "../../utils/formatDate";
import {toast} from "sonner";

export const Route = createLazyFileRoute("/dashboard/pinjaman/$pinjamanId")({
  component: RouteComponent,
});

function RouteComponent() {
  const {pinjamanId} = Route.useParams();
  const {data, isLoading, refetch} = usePinjamanDetail(pinjamanId);
  const {
    data: installments,
    isLoading: isInstallmentsLoading,
    refetch: refetchInstallments,
  } = useInstallmentsByLoanId(pinjamanId);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(null);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isMarkingPaidOpen, setIsMarkingPaidOpen] = useState(false);
  const [cancelNotes, setCancelNotes] = useState("");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState(null);

  const navigate = useNavigate();

  function openDetailsModal(installment) {
    setSelectedInstallment(installment);
    setIsDetailsOpen(true);
  }

  function openCancelModal(installment) {
    setConfirmPaid({id: installment.id});
    setIsCancelOpen(true);
  }

  async function handleCreateInstallment(formData) {
    console.log("Create installment with data:", formData);
    try {
      await createInstallment(formData);
      setIsCreateOpen(false);
      refetchInstallments();
      refetch();
      toast.success("Cicilan berhasil dibuat.", {duration: 2000, closeButton: true});
    } catch (error) {
      toast.error("Gagal membuat cicilan.", {duration: 2000, closeButton: true});
      console.error("Error creating installment:", error);
    }
  }

  async function markAsPaid(installmentId) {
    try {
      // Call API to mark installment as paid
      await markInstallmentAsPaid(installmentId);
      // Refetch installments data
      refetchInstallments();
      setIsMarkingPaidOpen(false);
      toast.success("Cicilan berhasil ditandai sebagai lunas.", {
        duration: 2000,
        closeButton: true,
      });
    } catch (error) {
      toast.error("Gagal menandai cicilan sebagai lunas.", {duration: 2000, closeButton: true});
      console.error("Error marking installment as paid:", error);
    }
  }

  async function markAsCancelled(installmentId, notes) {
    try {
      await markInstallmentAsCancelled(installmentId, notes);
      refetchInstallments();
      toast.success("Cicilan berhasil dibatalkan.", {duration: 2000, closeButton: true});
    } catch (error) {
      toast.error("Gagal membatalkan cicilan.", {duration: 2000, closeButton: true});
      console.error("Error marking installment as cancelled:", error);
    }
  }

  const mapStatusToLabel = {
    PAID: "Lunas",
    PENDING: "Menunggu Pembayaran",
    OVERDUE: "Jatuh Tempo",
    CANCELLED: "Dibatalkan",
  };

  function getStatusLabel(status) {
    return mapStatusToLabel[status] || status;
  }
  if (isLoading) return <p>loading...</p>;
  if (isInstallmentsLoading) return <p>loading installments...</p>;
  console.log("installments:", installments);

  const installmentColumns = [
    {label: "ID", key: "id"},
    {
      label: "Status",
      key: "status",
      render: (value) => {
        const statusMap = {
          PAID: "Lunas",
          PENDING: "Menunggu Pembayaran",
          OVERDUE: "Jatuh Tempo",
          CANCELLED: "Dibatalkan",
        };
        return statusMap[value.status] || value.status;
      },
    },
    {label: "Tipe Transaksi", key: "transaction_type_name"},
    {
      label: "Tanggal Transaksi",
      key: "payment_date",
      render: (value) => {
        try {
          const date = new Date(value.payment_date);
          return isNaN(date) ? "-" : formatDateWithTime(date);
        } catch {
          return "-";
        }
      },
    },
    {
      label: "Terakhir Diubah",
      key: "updated_at",
      render: (value) => {
        try {
          const date = new Date(value.updated_at);
          return isNaN(date) ? "-" : formatDateWithTime(date);
        } catch {
          return "-";
        }
      },
    },
    {label: "Jumlah Pokok", key: "principal_amount"},
    {label: "Bagi Hasil", key: "interest_amount"},
    {label: "Catatan", key: "notes"},
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <>
          {row.status === "PENDING" && (
            <button
              onClick={() => {
                console.log("Marking as paid:", row);
                let amount =
                  parseInt(row.principal_amount) > 0
                    ? row.principal_amount
                    : row.interest_amount > 0
                      ? row.interest_amount
                      : 0;
                setConfirmPaid({id: row.id, amount: amount});
                setIsMarkingPaidOpen(true);
              }}
            >
              Tandai Lunas
            </button>
          )}
          {row.status !== "CANCELLED" && (
            <button onClick={() => openCancelModal(row)}>Batalkan</button>
          )}
          <button onClick={() => openDetailsModal(row)}>Riwayat</button>
        </>
      ),
    },
  ];

  return (
    <div>
      <button
        onClick={() => navigate({to: "/dashboard/pinjaman"})}
        style={{marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem"}}
      >
        <FiArrowLeft /> Back to List
      </button>
      <div className="pinjaman__detail--header">
        <h3>Detail Pinjaman #{pinjamanId}</h3>
      </div>
      <div className="pinjaman__detail--info">
        <div className="pinjaman-detail__field">
          <span className="pinjaman-detail__field-label">Nama Peminjam: </span>
          <span className="pinjaman-detail__field-value">{data.data.user.name}</span>
        </div>
        <div className="pinjaman-detail__field">
          <span className="pinjaman-detail__field-label">Tujuan Pinjaman:</span>
          <span className="pinjaman-detail__field-value">{data.data.name}</span>
        </div>
        <div className="pinjaman-detail__field">
          <span className="pinjaman-detail__field-label">Tipe Pinjaman:</span>
          <span className="pinjaman-detail__field-value">{data.data.loan_type.name}</span>
        </div>
        <div className="pinjaman-detail__field">
          <span className="pinjaman-detail__field-label">Cicilan Target:</span>
          <span className="pinjaman-detail__field-value">{data.data.installment_qty_target}x</span>
        </div>
        <div className="pinjaman-detail__field">
          <span className="pinjaman-detail__field-label">Tanggal Transaksi:</span>
          <span className="pinjaman-detail__field-value">
            {new Date(data.data.transaction_date).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="pinjaman-detail__field">
          <span className="pinjaman-detail__field-label">Pinjaman:</span>
          <span className="pinjaman-detail__field-value">
            Rp {parseInt(data.data.amount - data.data.total_ratio_amount).toLocaleString("id-ID")}
          </span>
        </div>
        <div className="pinjaman-detail__field">
          <span className="pinjaman-detail__field-label">Bagi Hasil:</span>
          <span className="pinjaman-detail__field-value">
            Rp {parseInt(data.data.total_ratio_amount).toLocaleString("id-ID")}
          </span>
        </div>
        <div className="pinjaman-detail__field">
          <span className="pinjaman-detail__field-label">Total Pinjaman:</span>
          <span className="pinjaman-detail__field-value">
            Rp {parseInt(data.data.amount).toLocaleString("id-ID")}
          </span>
        </div>
        <div className="pinjaman-detail__field">
          <span className="pinjaman-detail__field-label">Pinjaman Terbayar:</span>
          <span className="pinjaman-detail__field-value">
            Rp {parseInt(data.data.total_principal_paid).toLocaleString("id-ID")}
          </span>
        </div>
        <div className="pinjaman-detail__field">
          <span className="pinjaman-detail__field-label">Bagi Hasil Terbayar:</span>
          <span className="pinjaman-detail__field-value">
            Rp {parseInt(data.data.total_interest_paid).toLocaleString("id-ID")}
          </span>
        </div>
        <div className="pinjaman-detail__field">
          <span className="pinjaman-detail__field-label">Sisa Pinjaman Belum Terbayar:</span>
          <span className="pinjaman-detail__field-value">
            Rp {parseInt(data.data.remaining_principal).toLocaleString("id-ID")}
          </span>
        </div>
        <div className="pinjaman-detail__field">
          <span className="pinjaman-detail__field-label">Sisa Bagi Hasil Belum Terbayar:</span>
          <span className="pinjaman-detail__field-value">
            Rp {parseInt(data.data.remaining_interest).toLocaleString("id-ID")}
          </span>
        </div>
      </div>
      <div className="pinjaman__detail--header">
        <h3>Cicilan {data.data.name}</h3>
        <button className="pinjaman__button--add" onClick={() => setIsCreateOpen(true)}>
          + Bayar Cicilan
        </button>
      </div>
      {installments ? (
        <div>
          <DataTable columns={installmentColumns} data={installments} />
        </div>
      ) : (
        <p>No installments available.</p>
      )}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Bayar   Cicilan">
        <CicilanForm loanId={pinjamanId} onSubmit={handleCreateInstallment} />
      </Modal>
      <Modal
        isOpen={isMarkingPaidOpen}
        onClose={() => {
          setIsMarkingPaidOpen(false);
        }}
        title="Konfirmasi Pembayaran"
      >
        <p>
          Konfirmasi pembayaran Rp{" "}
          {confirmPaid?.amount ? confirmPaid.amount.toLocaleString("id-ID") : 0}
        </p>
        <button
          onClick={() => {
            markAsPaid(confirmPaid.id);
            setConfirmPaid(null);
          }}
        >
          Ya
        </button>
        <button onClick={() => setConfirmPaid(null)}>Batal</button>
      </Modal>
      <Modal isOpen={isCancelOpen} onClose={() => setIsCancelOpen(false)} title="Batalkan Cicilan">
        <form>
          <label>Alasan Pembatalan:</label>
          <textarea
            value={cancelNotes}
            onChange={(e) => setCancelNotes(e.target.value)}
            rows="4"
            cols="50"
            placeholder="Masukkan alasan pembatalan..."
            required
          />
          <p>Apakah Anda yakin ingin membatalkan cicilan ini?</p>
          <button
            onClick={() => {
              // Implement cancel logic here
              markAsCancelled(confirmPaid.id, cancelNotes);
              setIsCancelOpen(false);
            }}
          >
            Ya
          </button>
          <button
            onClick={() => {
              setIsCancelOpen(false);
              setCancelNotes("");
            }}
          >
            Batal
          </button>
        </form>
      </Modal>
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title="Detail Cicilan">
        {selectedInstallment ? (
          <div>
            <p>ID: {selectedInstallment.id}</p>
            <p>Status Saat ini: {getStatusLabel(selectedInstallment.status)}</p>
            <p>Tipe Transaksi: {selectedInstallment.transaction_type_name}</p>
            <p>
              Tanggal Transaksi: {formatDateWithTime(new Date(selectedInstallment.payment_date))}
            </p>
            <p>Terakhir Diubah: {formatDateWithTime(new Date(selectedInstallment.updated_at))}</p>
            <p>Jumlah Pokok: {selectedInstallment.principal_amount}</p>
            <p>Bagi Hasil: {selectedInstallment.interest_amount}</p>
            <p>Catatan: {selectedInstallment.notes}</p>

            <div className="cicilan-changes">
              <h4>Riwayat Perubahan</h4>
              {selectedInstallment.installment_changes &&
              selectedInstallment.installment_changes.length > 0 ? (
                <div className="change-item">
                  {selectedInstallment.installment_changes.map((changes, index) => (
                    <div className="change-item__main" key={index}>
                      <div className="change-item__header">
                        <p>Tanggal Perubahan: {formatDateWithTime(new Date(changes.created_at))}</p>
                        <p>Status Sebelumnya: {getStatusLabel(changes.Status)}</p>
                      </div>
                      <p className="change-item__notes">
                        Catatan Atas Perubahan: {changes.ChangesNotes}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Tidak ada riwayat perubahan.</p>
              )}
            </div>
          </div>
        ) : (
          <p>No installment details available.</p>
        )}
      </Modal>
    </div>
  );
}
