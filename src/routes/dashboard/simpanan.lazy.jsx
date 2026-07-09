import {createLazyFileRoute} from "@tanstack/react-router";
import DataTable from "../../component/Datatable/Datatable";
import {mapListSimpanan} from "../../features/simpanan/mapper";
import {useListSimpanan} from "../../features/simpanan/hooks.js";
import "../../styles/dashboard-simpanan.css";
import {useEffect, useState} from "react";
import {createSimpanan, deleteSimpanan, updateSimpanan} from "../../features/simpanan/api.js";
import Modal from "../../modal/Modal.jsx";
import SimpananForm from "../../features/simpanan/SimpananForm.jsx";
import {FiEdit, FiTrash2} from "react-icons/fi";
import {toast} from "sonner";
import SearchBar from "../../component/SearchBar/SearchBar.jsx";
import Pagination from "../../component/Pagination/Pagination.jsx";

export const Route = createLazyFileRoute("/dashboard/simpanan")({
  component: SimpananRouteComponent,
});

function SimpananRouteComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const {
    data: responseData,
    isLoading,
    refetch,
  } = useListSimpanan({page: currentPage, pageSize, keyword: searchKeyword});
  const rawData = responseData?.data || [];
  const pageInfo = responseData?.page_info || {page: 1, page_size: pageSize, count: 0};
  const displayData = rawData?.map(mapListSimpanan) || [];
  const totalPages = Math.max(1, Math.ceil(pageInfo.count / pageInfo.page_size));

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      console.error("Error creating simpanan:", error);
    } finally {
      setIsCreating(false);
    }
  };
  if (isLoading && !responseData) return <p>Memuat data simpanan...</p>;

  const columns = [
    {key: "id", label: "ID Simpanan"},
    {key: "saving_type_name", label: "Tipe Simpanan"},
    {key: "user_name", label: "Nama Anggota"},
    {key: "amount", label: "Jumlah"},
    {key: "transaction_type_name", label: "Tipe Transaksi"},
    {key: "transaction_date", label: "Tanggal Transaksi"},
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
        </div>
      ),
    },
  ];
  return (
    <div className="main__simpanan">
      <button className="button__simpanan--add" onClick={() => setIsCreateOpen(true)}>
        + Buat Simpanan
      </button>
      <SearchBar placeholder="Cari simpanan atau anggota.." value={searchInput} onChange={handleSearch} />
      <DataTable columns={columns} data={displayData} idKey="id"></DataTable>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={pageInfo.count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

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
