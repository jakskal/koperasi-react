import {createLazyFileRoute} from "@tanstack/react-router";
import {useListipePinjaman} from "../../features/tipe-pinjaman/hooks";
import DataTable from "../../component/Datatable/Datatable";
import {useState} from "react";
import Modal from "../../modal/Modal";
import "../../styles/dashboard-tipe-pinjaman.css";
import TipePinjamanForm from "../../features/tipe-pinjaman/TipePinjamanForm";
import {toast} from "sonner";
import {updateTipePinjaman, createTipePinjaman} from "../../features/tipe-pinjaman/api";
import {getRecordStatusLabel} from "../../utils/labels";

export const Route = createLazyFileRoute("/dashboard/tipe-pinjaman")({
  component: RouteComponent,
});

function RouteComponent() {
  const {data, isLoading, error, refetch} = useListipePinjaman();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  async function handleCreate(formData) {
    try {
      await createTipePinjaman(formData);
      setIsCreateOpen(false);
      toast.success(`Tipe pinjaman ${formData.name} berhasil dibuat.`, {
        duration: 2000,
        closeButton: true,
      });
      refetch();
    } catch (error) {
      console.error("Error creating tipe pinjaman:", error);
      toast.error("Gagal membuat tipe pinjaman.", {duration: 2000, closeButton: true});
    }
  }

  function handleEdit(id) {
    const row = data.find((item) => item.id === id);
    setSelectedRow(row);
    setIsEditOpen(true);
  }

  async function handleUpdate(formData) {
    try {
      await updateTipePinjaman(formData);
      setIsEditOpen(false);
      setSelectedRow(null);
      toast.success("Tipe pinjaman berhasil diubah.", {duration: 2000, closeButton: true});
      refetch();
    } catch (error) {
      console.error("Error updating tipe pinjaman:", error);
      toast.error("Gagal mengubah tipe pinjaman.", {duration: 2000, closeButton: true});
    }
  }

  async function markActive(id) {
    try {
      await updateTipePinjaman({id, status: "ACTIVE"});
      toast.success(
        `Tipe pinjaman ${data.find((item) => item.id === id)?.name} berhasil diaktifkan.`,
        {duration: 2000, closeButton: true},
      );
      refetch();
    } catch (error) {
      console.error("Error marking tipe pinjaman active:", error);
      toast.error("Gagal mengaktifkan tipe pinjaman.", {duration: 2000, closeButton: true});
    }
  }

  async function markInactive(id) {
    try {
      await updateTipePinjaman({id, status: "INACTIVE"});
      toast.success(
        `Tipe pinjaman ${data.find((item) => item.id === id)?.name} berhasil dinonaktifkan.`,
        {duration: 2000, closeButton: true},
      );
      refetch();
    } catch (error) {
      console.error("Error marking tipe pinjaman inactive:", error);
      toast.error("Gagal menonaktifkan tipe pinjaman.", {duration: 2000, closeButton: true});
    }
  }

  if (isLoading) {
    return <div>Memuat tipe pinjaman...</div>;
  }

  if (error) {
    return <div>Gagal memuat tipe pinjaman.</div>;
  }
  const columns = [
    {
      label: "Nama Tipe Pinjaman",
      key: "name",
    },
    {
      label: "Bagi hasil (%)",
      key: "ratio_percentage",
    },
    {
      label: "Status",
      key: "status",
      render: (row) => getRecordStatusLabel(row.status),
    },
    {
      label: "Aksi",
      key: "actions",
      render: (row) => (
        <div>
          <button onClick={() => handleEdit(row.id)}>Edit</button>
          {row.status === "ACTIVE" ? (
            <button onClick={() => markInactive(row.id)}>Nonaktifkan</button>
          ) : (
            <button onClick={() => markActive(row.id)}>Aktifkan</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="tipe-pinjaman__main">
      <button className="tipe-pinjaman__button--add" onClick={() => setIsCreateOpen(true)}>
        + Buat Tipe Pinjaman
      </button>
      <DataTable data={data} columns={columns} />
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Buat Tipe Pinjaman"
      >
        <TipePinjamanForm onSubmit={handleCreate} />
      </Modal>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Tipe Pinjaman">
        <TipePinjamanForm data={selectedRow} onSubmit={handleUpdate} />
      </Modal>
    </div>
  );
}
