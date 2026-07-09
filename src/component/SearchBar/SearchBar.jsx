import "./SearchBar.css";

export default function SearchBar({placeholder, keyWord, value, onChange = () => {}}) {
  const inputValue = value ?? keyWord ?? "";

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        className="search-bar__input"
      />
    </div>
  );
}
