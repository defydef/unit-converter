export default function Footer() {
  return (
    <footer className="mt-8 text-center text-xs text-gray-500">
      🌐 Built by{" "}
      <a href="https://github.com/defydef" className="underline">
        defydef
      </a>{" "}
      © {new Date().getFullYear()} defydef. All rights reserved.
    </footer>
  );
}
