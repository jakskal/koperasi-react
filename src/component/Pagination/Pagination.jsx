import "./Pagination.css";

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        ← Prev
      </button>
      <span className="pagination__info">
        Halaman {currentPage} dari {totalPages} (Total: {totalItems})
      </span>
      <select
        className="pagination__page-size"
        value={pageSize}
        onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
      >
        <option value="5">5 per Halaman</option>
        <option value="10">10 per Halaman</option>
        <option value="20">20 per Halaman</option>
        <option value="50">50 per Halaman</option>
      </select>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next →
      </button>
    </div>
  );
}
