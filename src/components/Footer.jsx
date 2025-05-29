export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-screen bg-base-300 p-4 text-center shadow">
      🌐 Built by{" "}
      <a href="https://github.com/defydef" className="underline">
        defydef
      </a>{" "}
      © {new Date().getFullYear()} defydef. All rights reserved.
    </footer>
  );
}
