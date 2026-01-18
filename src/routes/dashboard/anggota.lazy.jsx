import {createLazyFileRoute} from "@tanstack/react-router";
import {useListAnggota} from "../../features/anggota/hooks";
import DataTable from "../../component/Datatable/Datatable";
import "../../styles/dashboard-anggota.css";
import {useState} from "react";
import Modal from "../../modal/Modal";
import AnggotaForm from "../../features/anggota/AnggotaForm";
import {createAnggota, deleteAnggota, updateAnggota} from "../../features/anggota/api";
import {FiEdit, FiTrash2} from "react-icons/fi";
import {mapListAnggota} from "../../features/anggota/mapper.js";
import {toast} from "sonner";

export const Route = createLazyFileRoute("/dashboard/anggota")({
  component: AnggotaRouteComponent,
});

function AnggotaRouteComponent() {
  const {data: rawData, isLoading, refetch} = useListAnggota();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const displayData = rawData?.map(mapListAnggota);

  const handleCreate = async (formData) => {
    try {
      await createAnggota(formData);
      setIsCreateOpen(false);
      refetch();
      let message = `Anggota ${formData.name} berhasil dibuat.`;
      toast.success(message, {duration: 2000, closeButton: true});
    } catch (error) {
      toast.error("Gagal membuat anggota.", {duration: 2000, closeButton: true});
      console.error("Error creating anggota:", error);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
      return;
    }
    try {
      await deleteAnggota(id);
      refetch();
      toast.success("Anggota berhasil dihapus.", {duration: 2000, closeButton: true});
    } catch (error) {
      toast.error("Gagal menghapus anggota.", {duration: 2000, closeButton: true});
      console.error("Error deleting anggota:", error);
    }
  };
  const handleEdit = async (id) => {
    const raw = rawData.find((r) => r.id === id);

    setSelectedRow(raw);
    setIsEditOpen(true);
  };
  const handleUpdate = async (formData) => {
    try {
      await updateAnggota(formData);
      setIsEditOpen(false);
      setSelectedRow(null);
      refetch();
      toast.success("Anggota berhasil diubah.", {duration: 2000, closeButton: true});
    } catch (error) {
      toast.error("Gagal mengubah anggota.", {duration: 2000, closeButton: true});
      console.error("Error updating anggota:", error);
    }
  };

  const columns = [
    {key: "member_id", label: "Nomor Anggota"},
    {key: "name", label: "Nama"},
    {key: "email", label: "Email"},
    {key: "phone", label: "Phone"},
    {key: "is_active", label: "Status"},
    {key: "join_date", label: "Tanggal Gabung"},
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <div>
          <button onClick={() => handleEdit(row.id)} title="Edit Member">
            <FiEdit />
          </button>
          <button onClick={() => handleDelete(row.id)} title="Hapus Member">
            <FiTrash2 color="red" />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <p>loading...</p>;

  return (
    <div className="main__anggota">
      <button className="button__anggota--add" onClick={() => setIsCreateOpen(true)}>
        + Buat Anggota
      </button>
      <DataTable columns={columns} data={displayData} idKey="id" />

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Buat Anggota">
        <AnggotaForm onSubmit={handleCreate} />
      </Modal>
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Anggota">
        <AnggotaForm data={selectedRow} onSubmit={handleUpdate} />
      </Modal>
    </div>
  );
}
