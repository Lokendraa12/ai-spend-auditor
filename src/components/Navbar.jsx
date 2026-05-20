function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
      <h1 className="text-2xl font-bold text-blue-500">
        AI Spend Auditor
      </h1>

      <button className="bg-blue-500 px-5 py-2 rounded-lg font-medium hover:bg-blue-600 transition">
        Start Audit
      </button>
    </nav>
  );
}

export default Navbar;