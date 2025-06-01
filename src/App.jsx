import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./App.css";

import { engineering } from "./data/engineering";
import { digital } from "./data/digital";
import { astronomy } from "./data/astronomy";
import { cooking } from "./data/cooking";
import { groups } from "./data/groups";

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
  const [category, setCategory] = useState("Energy");
  const [group, setGroup] = useState("Engineering");
  const [units, setUnits] = useState(engineering);
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  const convert = () => {
    if (units[category] !== null && units[category] !== undefined) {
      const fromFactor = units[category][fromUnit];
      const toFactor = units[category][toUnit];
      const converted = (parseFloat(value) * fromFactor) / toFactor;
      setResult(converted);

      if (value !== "" && value !== null && !isNaN(converted)) {
        const record = `${value} ${fromUnit} → ${converted.toFixed(
          4
        )} ${toUnit}`;
        setHistory([record, ...history.slice(0, 99)]); // Keep only 100 entries}
      }
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  function formatNumber(value) {
    // return value % 1 === 0 ? value.toFixed(0) : value.toFixed(4);
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 10,
    }).format(value);
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${result} ${toUnit}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // execute convert function each time value, category, fromUnit, toUnit are changed
  useEffect(() => {
    convert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, category, fromUnit, toUnit]);

  // Set default from and to units according to selected category
  useEffect(() => {
    if (units[category] !== null && units[category] !== undefined) {
      setFromUnit(Object.keys(units[category])[0]);
      setToUnit(Object.keys(units[category])[1]);
    }
  }, [category, units]);

  // Set units and category when group is changed
  useEffect(() => {
    switch (group) {
      case "Engineering":
        setUnits(engineering);
        setCategory(Object.keys(engineering)[0]);
        break;
      case "Digital":
        setUnits(digital);
        setCategory(Object.keys(digital)[0]);
        break;
      case "Astronomy":
        setUnits(astronomy);
        setCategory(Object.keys(astronomy)[0]);
        break;
      case "Cooking":
        setUnits(cooking);
        setCategory(Object.keys(cooking)[0]);
        break;
      default:
        setUnits(engineering);
    }
  }, [group]);

  return (
    <>
      <Helmet>
        {/* Title */}
        <title>
          Universal Converter | Convert Engineering, Digital, Cooking, Astronomy
          Units
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Free and easy-to-use online unit converter. Instantly convert values across Engineering, Digital Storage, Cooking, and Astronomy categories with accurate results."
        />

        {/* Keywords */}
        <meta
          name="keywords"
          content="unit converter, engineering unit converter, cooking measurements, digital storage conversion, astronomy units, GB to MB, cups to grams, light years to km, online unit converter"
        />

        {/* Canonical URL */}
        <link
          rel="canonical"
          href="https://unit-converter-jade-nine.vercel.app/"
        />

        {/* Open Graph (Facebook/LinkedIn) */}
        <meta
          property="og:title"
          content="Unit Converter | Engineering, Digital, Cooking, Astronomy"
        />
        <meta
          property="og:description"
          content="Convert units instantly in multiple categories including engineering, digital, cooking, and astronomy."
        />
        <meta
          property="og:url"
          content="https://unit-converter-jade-nine.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://unit-converter-jade-nine.vercel.app/unit-converter-screenshot.png"
        />

        {/* Twitter Card (optional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Unit Converter App" />
        <meta
          name="twitter:description"
          content="Quickly convert units across engineering, cooking, digital storage, and astronomy categories."
        />
        <meta
          name="twitter:image"
          content="https://unit-converter-jade-nine.vercel.app/unit-converter-screenshot.png"
        />
      </Helmet>

      <main className="flex min-h-screen flex-col font-montserrat">
        <Header group={group} />

        <section className="max-w-xl mx-auto p-6 flex flex-col justify-center gap-4">
          <section>
            <h2 className="text-2xl font-bold tracking-wider mb-2">Group</h2>
            <Select
              value={group}
              onSelect={setGroup}
              items={groups}
              selectType="groups"
            />
          </section>
          <section>
            <h2 className="text-2xl font-bold tracking-wider mb-2">Category</h2>
            <ComboSelect
              items={Object.keys(units)}
              selected={category}
              onSelect={setCategory}
            />
          </section>

          <section>
            <h3 className="mb-2">From</h3>
            <div className="grid grid-cols-2 gap-4">
              <EditableInput value={value} onSelect={setValue} />
              <ComboSelect
                items={Object.keys(units[category] || [])}
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
                items={Object.keys(units[category] || [])}
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
          <SoftButton onClick={handleCopy}>
            {copied ? "Copied!" : "Copy Result"}
          </SoftButton>
          <History history={history} />
        </section>

        <Footer />
      </main>
    </>
  );
}

export default App;
