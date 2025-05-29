import { useEffect, useState } from "react";
import { units } from "./data/units";
import "./App.css";

function App() {
  const [category, setCategory] = useState("length");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const convert = () => {
    const fromFactor = units[category][fromUnit];
    const toFactor = units[category][toUnit];
    const converted = (parseFloat(value) * fromFactor) / toFactor;
    setResult(converted);

    if (value !== "" && value !== null && !isNaN(converted)) {
      const record = `${value} ${fromUnit} → ${converted.toFixed(4)} ${toUnit}`;
      setHistory([record, ...history.slice(0, 99)]); // Keep only 100 entries}
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  useEffect(() => {
    convert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, category]);

  return (
    <div className="min-h-screen p-6 font-montserrat">
      <h1 className="text-3xl font-bold text-center mb-6">
        🔁 Universal Unit Converter
      </h1>

      <div className="max-w-xl mx-auto p-6 rounded-xl shadow">
        <div className="mb-4">
          <label className="block mb-2 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded w-full select cursor-pointer"
          >
            {Object.keys(units).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <section>
            <label className="input">
              <span className="label">From</span>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter value"
                className="p-2 rounded w-full"
              />
            </label>
          </section>

          <section>
            <label className="input">
              <span className="label">To</span>
              <input
                type="text"
                value={result == null || isNaN(result) ? "" : result.toFixed(4)}
                readOnly
                className="p-2 rounded w-full cursor-not-allowed"
              />
            </label>
          </section>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="p-2 border rounded w-full select cursor-pointer"
          >
            {Object.keys(units[category]).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>

          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="p-2 border rounded w-full select cursor-pointer"
          >
            {Object.keys(units[category]).map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center mb-4">
          <button
            onClick={swapUnits}
            className="btn btn-soft text-base-800 cursor-pointer rounded"
          >
            🔄 Swap Units
          </button>
          <button
            onClick={convert}
            className="btn btn-secondary px-4 py-2 rounded cursor-pointer text-lg"
          >
            Convert
          </button>
        </div>

        {result !== null && !isNaN(result) && (
          <div className="flex flex-col items-center">
            <p className="text-base-800 font-bold text-2xl">Result:</p>
            <p className="text-xl text-secondary">
              {result.toFixed(4)} {toUnit}
            </p>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6">
            <h2 className="text-md font-semibold mb-2">
              📚 Conversion History:
            </h2>
            <ul className="list-disc pl-5 text-sm text-gray-600">
              {history.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <footer className="mt-8 text-center text-xs text-gray-500">
        🌐 Built by You |{" "}
        <a href="#" className="underline">
          GitHub
        </a>{" "}
        | <a href="#">Contact</a>
      </footer>
    </div>
  );
}

export default App;
