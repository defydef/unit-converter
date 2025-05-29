export default function DisplayedValue({ value, formatNumber }) {
  return (
    <section>
      <label className="input">
        <span className="label">To</span>
        <input
          type="text"
          value={value == null || isNaN(value) ? "" : formatNumber(value)}
          readOnly
          className="p-2 rounded w-full cursor-not-allowed"
        />
      </label>
    </section>
  );
}
