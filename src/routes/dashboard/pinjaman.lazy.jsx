import {createLazyFileRoute, useNavigate} from "@tanstack/react-router";
import {mapListPinjaman} from "../../features/pinjaman/mapper";
import {useListPinjaman} from "../../features/pinjaman/hooks";
import DataTable from "../../component/Datatable/Datatable";
import {FiEdit, FiTrash2, FiEye} from "react-icons/fi";
import PinjamanForm from "../../features/pinjaman/PinjamanForm";
import {useEffect, useState} from "react";
import Modal from "../../modal/Modal";
import Pagination from "../../component/Pagination/Pagination";
import "../../styles/dashboard-pinjaman.css";
import {createPinjaman, deletePinjaman, updatePinjaman} from "../../features/pinjaman/api";
import {toast} from "sonner";
import SearchBar from "../../component/SearchBar/SearchBar";

export const Route = createLazyFileRoute("/dashboard/pinjaman")({
  component: PinjamanRouteComponent,
});

function PinjamanRouteComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pageSize, setPageSize] = useState(5);

  const {
    data: responseData,
    isLoading,
    refetch,
  } = useListPinjaman({page: currentPage, pageSize: pageSize, keyWord: searchKeyword});
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const rawData = Array.isArray(responseData) ? responseData : responseData?.data || [];
  const pageInfo = responseData?.page_info || {page: 1, page_size: 15, count: 0};
  const displayData = rawData?.map(mapListPinjaman);
  const totalPages = Math.max(1, Math.ceil(pageInfo.count / pageInfo.page_size));

  useEffect(() => {
    if (searchInput.trim() === "") {
      setCurrentPage(1);
      setSearchKeyword("");
      return;
    }

    const timer = setTimeout(() => {
      setCurrentPage(1);
      setSearchKeyword(searchInput.trim());
    }, 450);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSearch = (term) => {
    setSearchInput(term);
    if (term.trim() === "") {
      setCurrentPage(1);
      setSearchKeyword("");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleCreate = async (formData) => {
    setIsCreating(true);
    try {
      await createPinjaman(formData);
      setIsCreateOpen(false);
      refetch();
      toast.success("Pinjaman berhasil dibuat.", {duration: 2000, closeButton: true});
    } catch (error) {
      toast.error("Gagal membuat pinjaman.", {duration: 2000, closeButton: true});
      console.error("Error creating pinjaman:", error);
    } finally {
      setIsCreating(false);
    }
  };
  const handleEdit = async (id) => {
    const row = rawData.find((item) => item.id === id);
    setSelectedRow(row);
    setIsEditOpen(true);
  };
  const handleUpdate = async (formData) => {
    setIsUpdating(true);
    try {
      await updatePinjaman(formData);
      setIsEditOpen(false);
      setSelectedRow(null);
      refetch();
      toast.success("Pinjaman berhasil diubah.", {duration: 2000, closeButton: true});
    } catch (error) {
      toast.error("Gagal mengubah pinjaman.", {duration: 2000, closeButton: true});
      console.error("Error updating pinjaman:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus pinjaman ini?")) {
      return;
    }
    setIsDeleting(true);
    try {
      await deletePinjaman(id);
      refetch();
      toast.success("Pinjaman berhasil dihapus.", {duration: 2000, closeButton: true});
    } catch (error) {
      toast.error("Gagal menghapus pinjaman.", {duration: 2000, closeButton: true});
      console.error("Error deleting pinjaman:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const navigate = useNavigate();
  if (isLoading && !responseData) return <p>Memuat data pinjaman...</p>;

  const columns = [
    {key: "id", label: "ID Pinjaman"},
    {
      key: "member_id",
      label: "Nomor Anggota",
    },
    {key: "user_name", label: "Nama Anggota"},
    {key: "name", label: "Tujuan Pinjaman"},
    {key: "amount", label: "Jumlah Pinjaman"},
    {key: "loan_type", label: "Jenis Pinjaman"},
    {key: "installment_qty_target", label: "Jangka Cicilan"},
    {key: "total_ratio_amount", label: "Margin/Bagi Hasil"},
    {key: "transaction_date", label: "Tanggal Pinjaman"},
    {
      key: "action",
      label: "Aksi",
      render: (row) => (
        <div>
          <button onClick={() => handleEdit(row.id)} disabled={isUpdating} title="Edit">
            <FiEdit />
          </button>
          <button onClick={() => handleDelete(row.id)} disabled={isDeleting} title="Hapus">
            <FiTrash2 color="red" />
          </button>
          <button onClick={() => navigate({to: "/dashboard/pinjaman/" + row.id})} title="Detail">
            <FiEye />
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
      <SearchBar placeholder="Cari pinjaman.." value={searchInput} onChange={handleSearch} />
      <DataTable columns={columns} data={displayData} idKey="id" />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={pageInfo.count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Buat Pinjaman">
        <PinjamanForm onSubmit={handleCreate} isLoading={isCreating} />
      </Modal>
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Pinjaman">
        <PinjamanForm data={selectedRow} onSubmit={handleUpdate} isLoading={isUpdating} />
      </Modal>
    </div>
  );
}
