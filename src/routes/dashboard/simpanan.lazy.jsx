import {createLazyFileRoute} from "@tanstack/react-router";
import DataTable from "../../component/Datatable/Datatable";
import {mapListSimpanan} from "../../features/simpanan/mapper";
import {useListSimpanan} from "../../features/simpanan/hooks.js";
import "../../styles/dashboard-simpanan.css";
import {useState} from "react";
import {createSimpanan, deleteSimpanan, updateSimpanan} from "../../features/simpanan/api.js";
import Modal from "../../modal/Modal.jsx";
import SimpananForm from "../../features/simpanan/SimpananForm.jsx";
import {FiEdit, FiTrash2} from "react-icons/fi";
import {toast} from "sonner";

export const Route = createLazyFileRoute("/dashboard/simpanan")({
  component: SimpananRouteComponent,
});

function SimpananRouteComponent() {
  const {data: rawData, isLoading, refetch} = useListSimpanan();
  const displayData = rawData?.map(mapListSimpanan) || [];

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = async (id) => {
    const row = rawData.find((item) => item.id == id);
    setSelectedRow(row);
    setIsEditOpen(true);
  };

  const handleUpdate = async (formData) => {
    setIsUpdating(true);
    try {
      await updateSimpanan(formData);
      setIsEditOpen(false);
      setSelectedRow(null);
      refetch();
      toast.success("Simpanan berhasil diubah.", {duration: 2000, closeButton: true});
    } catch (error) {
      toast.error("Gagal mengubah simpanan.", {duration: 2000, closeButton: true});
      console.error("Error updating simpanan:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus simpanan ini?")) {
      return;
    }
    setIsDeleting(true);
    try {
      await deleteSimpanan(id);
      refetch();
      toast.success("Simpanan berhasil dihapus.", {duration: 2000, closeButton: true});
    } catch (error) {
      toast.error("Gagal menghapus simpanan.", {duration: 2000, closeButton: true});
      console.error("Error deleting simpanan:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreate = async (formData) => {
    setIsCreating(true);
    try {
      await createSimpanan(formData);
      setIsCreateOpen(false);
      refetch();
      toast.success("Simpanan berhasil dibuat.", {duration: 2000, closeButton: true});
    } catch (error) {
      toast.error("Gagal membuat simpanan.", {duration: 2000, closeButton: true});
      console.log("Error creating simpanan:", error);
    } finally {
      setIsCreating(false);
    }
  };
  if (isLoading) return <p>loading...</p>;

  const columns = [
    {key: "id", label: "ID Simpanan"},
    {key: "saving_type_name", label: "Tipe Simpanan"},
    {key: "user_name", label: "Nama Anggota"},
    {key: "amount", label: "Jumlah Simpanan"},
    {key: "transaction_type_name", label: "Tipe Transaksi"},
    {key: "transaction_date", label: "Tanggal Simpanan"},
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <div>
          <button onClick={() => handleEdit(row.id)} disabled={isUpdating} title="Edit">
            <FiEdit />
          </button>
          <button onClick={() => handleDelete(row.id)} disabled={isDeleting} title="Hapus">
            <FiTrash2 color="red" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="main__simpanan">
      <button className="button__simpanan--add" onClick={() => setIsCreateOpen(true)}>
        {" "}
        + Buat Simpanan
      </button>
      <DataTable columns={columns} data={displayData} idKey="id"></DataTable>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Simpanan">
        <SimpananForm
          data={selectedRow}
          isEdit={true}
          onSubmit={handleUpdate}
          isLoading={isUpdating}
        />
      </Modal>

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Buat Simpanan">
        <SimpananForm isEdit={false} onSubmit={handleCreate} isLoading={isCreating} />
      </Modal>
    </div>
  );
}
