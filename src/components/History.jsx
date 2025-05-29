export default function History({ history }) {
  return (
    history.length > 0 && (
      <div className="mt-6">
        <h2 className="text-md font-semibold mb-2">📚 Conversion History:</h2>
        <ul className="list-disc pl-5 text-sm text-gray-600">
          {history.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    )
  );
}
