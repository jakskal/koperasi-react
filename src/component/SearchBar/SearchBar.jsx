import "./SearchBar.css";

export default function SearchBar({placeholder, keyWord, onChange}) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={keyWord}
        onChange={(e) => onChange(e.target.value)}
        className="search-bar__input"
      />
    </div>
  );
}
