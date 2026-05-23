import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SpendForm from "./components/SpendForm";
import AuditResults from "./components/AuditResults";

function App() {
  const [audit, setAudit] = useState(() => {
    const savedAudit = localStorage.getItem("auditResult");
    return savedAudit ? JSON.parse(savedAudit) : null;
  });

  useEffect(() => {
    if (audit) {
      localStorage.setItem("auditResult", JSON.stringify(audit));
    }
  }, [audit]);

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />
      <Hero />

      <SpendForm setAudit={setAudit} />

      <AuditResults audit={audit} />
    </div>
  );
}

export default App;