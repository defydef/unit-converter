export default function Result({ result, toUnit, formatNumber }) {
  return (
    result !== null &&
    !isNaN(result) && (
      <div className="flex flex-col items-center">
        <p className="text-base-800 font-bold text-2xl">Result:</p>
        <p className="text-xl text-secondary">
          {formatNumber(result)} {toUnit}
        </p>
      </div>
    )
  );
}
