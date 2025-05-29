export default function Select({ value, onSelect, items }) {
  return (
    <select
      value={value}
      onChange={(e) => onSelect(e.target.value)}
      className="mt-2 p-2 border rounded w-full select cursor-pointer"
    >
      {Object.keys(items).map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
