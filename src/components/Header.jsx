export default function Header({ group }) {
  const mapGroup = (group) => {
    switch (group) {
      case "Engineering":
        return "👷🏽‍♂️ Engineering";
      case "Digital":
        return "💻 Digital";
      default:
        return "";
    }
  };

  return (
    <section className="flex justify-center items-center flex-col pt-8 gap-2 pb-2">
      <h1 className="text-3xl font-extrabold text-secondary">
        Universal Unit Converter
      </h1>
      <h2 className="text-xl">{mapGroup(group)}</h2>
    </section>
  );
}
