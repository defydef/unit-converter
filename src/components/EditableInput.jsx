export default function EditableInput({ value, onSelect }) {
  return (
    <section>
      <label className="input">
        <span className="label">From</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onSelect(e.target.value)}
          placeholder="Enter value"
          className="p-2 rounded w-full"
        />
      </label>
    </section>
  );
}
