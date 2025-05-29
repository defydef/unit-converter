export default function Select({ value, selectType, onSelect, items }) {
  return (
    <select
      value={value}
      onChange={(e) => onSelect(e.target.value)}
      className="p-2 border rounded w-full select cursor-pointer"
    >
      {selectType === "categories"
        ? Object.keys(items).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))
        : selectType === "groups"
        ? items.map((item) => (
            <option key={item.id} value={item.value}>
              {item.value}
            </option>
          ))
        : ""}
    </select>
  );
}
