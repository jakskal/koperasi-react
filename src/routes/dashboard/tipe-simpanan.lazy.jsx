import {createLazyFileRoute} from "@tanstack/react-router";
import {useListTipeSimpanan} from "../../features/tipe-simpanan/hooks";
import DataTable from "../../component/Datatable/Datatable";
import Modal from "../../modal/Modal";
import "../../styles/dashboard-tipe-simpanan.css";
import TipeSimpananForm from "../../features/tipe-simpanan/TipeSimpananForm";
import {useState} from "react";
import {toast} from "sonner";
import {createTipeSimpanan, updateTipeSimpanan} from "../../features/tipe-simpanan/api";

export const Route = createLazyFileRoute("/dashboard/tipe-simpanan")({
  component: RouteComponent,
});

function RouteComponent() {
  const {data, isLoading, error, refetch} = useListTipeSimpanan();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    {
      label: "Nama",
      key: "name",
    },

    {
      label: "Status",
      key: "status",
      render: (row) => (row.status == "ACTIVE" ? "Aktif" : "Tidak Aktif"),
    },
    {
      label: "Actions",
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

  async function handleCreate(formData) {
    try {
      // Placeholder for create logic
      setIsCreateOpen(false);
      await createTipeSimpanan(formData);
      toast.success(`Tipe simpanan ${formData.name} berhasil dibuat.`, {
        duration: 2000,
        closeButton: true,
      });
      refetch();
    } catch (error) {
      console.error("Error creating tipe simpanan:", error);
      toast.error("Gagal membuat tipe simpanan.", {duration: 2000, closeButton: true});
    }
  }

  async function handleEdit(id) {
    const row = data.find((item) => item.id === id);
    setSelectedRow(row);
    setIsEditOpen(true);
  }

  async function handleUpdate(formData) {
    try {
      // Placeholder for update logic
      await updateTipeSimpanan(formData);
      setIsEditOpen(false);
      setSelectedRow(null);
      toast.success("Tipe simpanan berhasil diubah.", {duration: 2000, closeButton: true});
      refetch();
    } catch (error) {
      console.error("Error updating tipe simpanan:", error);
      toast.error("Gagal mengubah tipe simpanan.", {duration: 2000, closeButton: true});
    }
  }

  async function markActive(id) {
    try {
      // Placeholder for mark active logic
      await updateTipeSimpanan({id, status: "ACTIVE"});
      toast.success(
        `Tipe simpanan ${data.find((item) => item.id === id)?.name} berhasil diaktifkan.`,
        {duration: 2000, closeButton: true},
      );
      refetch();
    } catch (error) {
      console.error("Error marking tipe simpanan active:", error);
      toast.error("Gagal mengaktifkan tipe simpanan.", {duration: 2000, closeButton: true});
    }
  }

  async function markInactive(id) {
    try {
      // Placeholder for mark inactive logic
      await updateTipeSimpanan({id, status: "INACTIVE"});
      toast.success(
        `Tipe simpanan ${data.find((item) => item.id === id)?.name} berhasil dinonaktifkan.`,
        {duration: 2000, closeButton: true},
      );
      refetch();
    } catch (error) {
      console.error("Error marking tipe simpanan inactive:", error);
      toast.error("Gagal menonaktifkan tipe simpanan.", {duration: 2000, closeButton: true});
    }
  }

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>Error loading tipe simpanan.</p>;
  return (
    <div className="tipe-simpanan__main">
      <button className="tipe-simpanan__button--add" onClick={() => setIsCreateOpen(true)}>
        + Buat Tipe Simpanan
      </button>
      <DataTable data={data} columns={columns} />

      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Buat Tipe Simpanan"
      >
        <TipeSimpananForm onSubmit={handleCreate} />
      </Modal>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Tipe Simpanan">
        <TipeSimpananForm data={selectedRow} onSubmit={handleUpdate} />
      </Modal>
    </div>
  );
}
