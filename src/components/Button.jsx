export default function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-secondary px-4 py-2 rounded cursor-pointer text-lg"
    >
      {children}
    </button>
  );
}
