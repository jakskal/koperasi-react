import {createLazyFileRoute, useNavigate} from "@tanstack/react-router";
import {useListAnggota} from "../../features/anggota/hooks";
import DataTable from "../../component/Datatable/Datatable";
import "../../styles/dashboard-anggota.css";
import {useEffect, useState} from "react";
import Modal from "../../modal/Modal";
import AnggotaForm from "../../features/anggota/AnggotaForm";
import {createAnggota, deleteAnggota, updateAnggota} from "../../features/anggota/api";
import {FiEdit, FiEye, FiTrash2} from "react-icons/fi";
import {mapListAnggota} from "../../features/anggota/mapper.js";
import {toast} from "sonner";
import SearchBar from "../../component/SearchBar/SearchBar";
import Pagination from "../../component/Pagination/Pagination";

export const Route = createLazyFileRoute("/dashboard/anggota")({
  component: AnggotaRouteComponent,
});

function AnggotaRouteComponent() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const {
    data: responseData,
    isLoading,
    refetch,
  } = useListAnggota({page: currentPage, pageSize, keyword: searchKeyword, roleID: 3});
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const rawData = responseData?.data || [];
  const pageInfo = responseData?.page_info || {page: 1, page_size: pageSize, count: 0};
  const displayData = rawData?.map(mapListAnggota) || [];
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
      await createAnggota(formData);
      setIsCreateOpen(false);
      refetch();
      let message = `Anggota ${formData.name} berhasil dibuat.`;
      toast.success(message, {duration: 2000, closeButton: true});
    } catch (error) {
      toast.error("Gagal membuat anggota.", {duration: 2000, closeButton: true});
      console.error("Error creating anggota:", error);
    } finally {
      setIsCreating(false);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus anggota ini?")) {
      return;
    }
    setIsDeleting(true);
    try {
      await deleteAnggota(id);
      refetch();
      toast.success("Anggota berhasil dihapus.", {duration: 2000, closeButton: true});
    } catch (error) {
      toast.error("Gagal menghapus anggota.", {duration: 2000, closeButton: true});
      console.error("Error deleting anggota:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  const handleEdit = async (id) => {
    const raw = rawData.find((r) => r.id === id);

    setSelectedRow(raw);
    setIsEditOpen(true);
  };
  const handleUpdate = async (formData) => {
    setIsUpdating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      await updateAnggota(formData);
      setIsEditOpen(false);
      setSelectedRow(null);
      refetch();
      toast.success("Anggota berhasil diubah.", {duration: 2000, closeButton: true});
    } catch (error) {
      toast.error("Gagal mengubah anggota.", {duration: 2000, closeButton: true});
      console.error("Error updating anggota:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const columns = [
    {key: "member_id", label: "Nomor Anggota"},
    {key: "name", label: "Nama"},
    {key: "email", label: "Email"},
    {key: "phone", label: "No. HP"},
    {key: "is_active", label: "Status"},
    {key: "join_date", label: "Tanggal Gabung"},
    {
      key: "action",
      label: "Aksi",
      render: (row) => (
        <div>
          <button onClick={() => handleEdit(row.id)} disabled={isUpdating} title="Edit Anggota">
            <FiEdit />
          </button>
          <button onClick={() => handleDelete(row.id)} disabled={isDeleting} title="Hapus Anggota">
            <FiTrash2 color="red" />
          </button>
          <button onClick={() => navigate({to: "/dashboard/anggota/" + row.id})} title="Detail">
            <FiEye />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading && !responseData) return <p>Memuat data anggota...</p>;

  return (
    <div className="main__anggota">
      <button className="button__anggota--add" onClick={() => setIsCreateOpen(true)}>
        + Buat Anggota
      </button>
      <SearchBar placeholder="Cari nama atau nomor anggota.." value={searchInput} onChange={handleSearch} />
      <DataTable columns={columns} data={displayData} idKey="id" />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={pageInfo.count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Buat Anggota">
        <AnggotaForm onSubmit={handleCreate} isLoading={isCreating} />
      </Modal>
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Anggota">
        <AnggotaForm data={selectedRow} onSubmit={handleUpdate} isLoading={isUpdating} />
      </Modal>
    </div>
  );
}
