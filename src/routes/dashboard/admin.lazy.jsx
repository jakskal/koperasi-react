import {createLazyFileRoute} from "@tanstack/react-router";
import {useEffect, useState} from "react";
import DataTable from "../../component/Datatable/Datatable";
import Pagination from "../../component/Pagination/Pagination";
import SearchBar from "../../component/SearchBar/SearchBar";
import {useListAnggota} from "../../features/anggota/hooks";
import "../../styles/dashboard-anggota.css";
import {getRoleLabel, getUserStatusLabel} from "../../utils/labels";

export const Route = createLazyFileRoute("/dashboard/admin")({
  component: AdminRouteComponent,
});

function AdminRouteComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const {data: responseData, isLoading} = useListAnggota({
    page: currentPage,
    pageSize,
    keyword: searchKeyword,
    excludeRoleID: 3,
  });

  const rawData = responseData?.data || [];
  const pageInfo = responseData?.page_info || {page: 1, page_size: pageSize, count: 0};
  const totalPages = Math.max(1, Math.ceil(pageInfo.count / pageInfo.page_size));
  const displayData = rawData.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || "-",
    role: getRoleLabel(user.role_id),
    status: getUserStatusLabel(user.status_id),
  }));

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

  if (isLoading && !responseData) return <p>Memuat data admin...</p>;

  const columns = [
    {key: "id", label: "ID"},
    {key: "name", label: "Nama"},
    {key: "email", label: "Email"},
    {key: "phone", label: "No. HP"},
    {key: "role", label: "Peran"},
    {key: "status", label: "Status"},
  ];

  return (
    <div className="main__anggota">
      <SearchBar placeholder="Cari nama atau email admin.." value={searchInput} onChange={handleSearch} />
      <DataTable columns={columns} data={displayData} idKey="id" />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={pageInfo.count}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
