import { useEffect, useState } from "react";
import { units } from "./data/units";
import "./App.css";
import ComboSelect from "./components/ComboSelect";
import EditableInput from "./components/EditableInput";
import DisplayedValue from "./components/DisplayedValue";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Select from "./components/Select";
import SoftButton from "./components/SoftButton";
import Button from "./components/Button";
import Result from "./components/Result";
import History from "./components/History";

function App() {
  const [category, setCategory] = useState("length");
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState(Object.keys(units[category])[0]);
  const [toUnit, setToUnit] = useState(Object.keys(units[category])[1]);
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

  function formatNumber(value) {
    return value % 1 === 0 ? value.toFixed(0) : value.toFixed(4);
  }

  // execute convert function each time value, category, fromUnit, toUnit are changed
  useEffect(() => {
    convert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, category, fromUnit, toUnit]);

  // Set default from and to units according to selected category
  useEffect(() => {
    setFromUnit(Object.keys(units[category])[0]);
    setToUnit(Object.keys(units[category])[1]);
  }, [category]);

  return (
    <main className="min-h-screen p-6 font-montserrat">
      <Header />

      <section className="max-w-xl mx-auto p-6 flex flex-col justify-center gap-4">
        <section>
          <h2 className="text-2xl font-bold tracking-wider">Category</h2>
          <Select value={category} onSelect={setCategory} items={units} />
        </section>

        <section>
          <h3 className="mb-2">From</h3>
          <div className="grid grid-cols-2 gap-4">
            <EditableInput value={value} onSelect={setValue} />
            <ComboSelect
              items={Object.keys(units[category])}
              selected={fromUnit}
              onSelect={setFromUnit}
            />
          </div>
        </section>
        <section>
          <h3 className="mb-2">To</h3>
          <section className="grid grid-cols-2 gap-4 mb-4">
            <DisplayedValue value={result} formatNumber={formatNumber} />
            <ComboSelect
              items={Object.keys(units[category])}
              selected={toUnit}
              onSelect={setToUnit}
            />
          </section>
        </section>

        <section className="flex justify-between items-center mb-4">
          <SoftButton onClick={swapUnits}>🔄 Swap Units</SoftButton>
          <Button onClick={convert}>Convert</Button>
        </section>

        <Result result={result} toUnit={toUnit} formatNumber={formatNumber} />
        <History history={history} />
      </section>

      <Footer />
    </main>
  );
}

export default App;
