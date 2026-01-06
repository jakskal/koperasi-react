import {createLazyFileRoute} from "@tanstack/react-router";
import {mapListPinjaman} from "../../features/pinjaman/mapper";
import {useListPinjaman} from "../../features/pinjaman/hooks";
import DataTable from "../../component/Datatable/Datatable";
import {FiEdit, FiTrash2} from "react-icons/fi";
import PinjamanForm from "../../features/pinjaman/PinjamanForm";
import {useState} from "react";
import Modal from "../../modal/Modal";
import "../../styles/dashboard-pinjaman.css";
import {createPinjaman, deletePinjaman, updatePinjaman} from "../../features/pinjaman/api";

export const Route = createLazyFileRoute("/dashboard/pinjaman")({
  component: PinjamanRouteComponent,
});

function PinjamanRouteComponent() {
  const {data: rawData, isLoading, refetch} = useListPinjaman();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const displayData = rawData?.map(mapListPinjaman);

  const handleCreate = async (formData) => {
    try {
      await createPinjaman(formData);
      setIsCreateOpen(false);
      refetch();
    } catch (error) {
      console.error("Error creating pinjaman:", error);
    }
  };
  const handleEdit = async (id) => {
    const row = rawData.find((item) => item.id === id);
    setSelectedRow(row);
    setIsEditOpen(true);
  };
  const handleUpdate = async (formData) => {
    try {
      await updatePinjaman(formData);
      setIsEditOpen(false);
      setSelectedRow(null);
      refetch();
    } catch (error) {
      console.error("Error updating pinjaman:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deletePinjaman(id);
      refetch();
    } catch (error) {
      console.error("Error deleting pinjaman:", error);
    }
  };
  if (isLoading) return <p>loading...</p>;

  const columns = [
    {key: "id", label: "ID Pinjaman"},
    {key: "user_name", label: "Nama Anggota"},
    {key: "name", label: "Tujuan Pinjaman"},
    {key: "amount", label: "Jumlah Pinjaman"},
    {key: "loan_type", label: "Jenis Pinjaman"},
    {key: "installment_qty_target", label: "Jangka Cicilan"},
    {key: "total_ratio_amount", label: "Margin/Bagi Hasil"},
    {key: "transaction_date", label: "Tanggal Pinjaman"},
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <div>
          <button onClick={() => handleEdit(row.id)} title="Edit">
            <FiEdit />
          </button>
          <button onClick={() => handleDelete(row.id)} title="Hapus">
            <FiTrash2 color="red" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="main__pinjaman">
      <button className="button__pinjaman--add" onClick={() => setIsCreateOpen(true)}>
        + Buat Pinjaman
      </button>
      <DataTable columns={columns} data={displayData} idKey="id" />

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Buat Pinjaman">
        <PinjamanForm onSubmit={handleCreate} />
      </Modal>
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Pinjaman">
        <PinjamanForm data={selectedRow} onSubmit={handleUpdate} />
      </Modal>
    </div>
  );
}
