export default function SoftButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-soft text-base-800 cursor-pointer rounded"
    >
      {children}
    </button>
  );
}
