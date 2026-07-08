import "./Datatable.css";

export default function DataTable({columns, data}) {
  const rows = Array.isArray(data) ? data : [];

  return (
    <div className="table__wrapper">
      <table className="table__main">
        <thead>
          <tr className="table__head">
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="table__empty" colSpan={columns.length}>
                Tidak ada data.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
