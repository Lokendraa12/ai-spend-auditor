import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SpendForm from "./components/SpendForm";
import AuditResults from "./components/AuditResults";
import Footer from "./components/Footer";
import { generateAudit } from "./utils/auditEngine";
import { CheckCircleIcon } from "lucide-react";

function App() {
  const [audit, setAudit] = useState(() => {
    const savedAudit = localStorage.getItem("auditResult");
    return savedAudit ? JSON.parse(savedAudit) : null;
  });
  const [showConsultation, setShowConsultation] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (data) => {

    setLoading(true);

    setTimeout(() => {

      const generatedAudit =
        generateAudit(data);

      setAudit(generatedAudit);

      setLoading(false);

    }, 2500);
  };
  useEffect(() => {
    if (audit) {
      localStorage.setItem("auditResult", JSON.stringify(audit));
    }
  }, [audit]);

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <Navbar />
      <div id="hero">
        <Hero />
      </div>

      <div id="spend-form">
        <SpendForm
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
      <div id="audit-section">
        <AuditResults
          audit={audit}
          setShowConsultation={setShowConsultation}
        />
      </div>

      {showConsultation && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6">

          <div className="bg-white/5 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 max-w-lg w-full relative animate-in fade-in zoom-in duration-300">

            {/* CLOSE */}

            <button
              onClick={() =>
                setShowConsultation(false)
              }
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl"
            >
              ×
            </button>

            {/* HEADER */}

            <div className="mb-6">

              <div className="inline-block bg-green-500/10 border border-green-500 text-green-400 px-4 py-2 rounded-xl mb-4">
                Enterprise Optimization
              </div>

              <h2 className="text-3xl font-bold text-white">
                Credex Consultation
              </h2>

            </div>

            {/* CONTENT */}

            <div className="space-y-5 text-slate-300">

              <p>
                Our AI infrastructure specialists
                identified significant optimization
                opportunities in your current stack.
              </p>

              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">

                <p className="text-slate-400">
                  Estimated Annual Savings
                </p>

                <h2 className="text-4xl font-bold text-green-400 mt-2">
                  ${audit?.totalAnnualSavings}
                </h2>

              </div>

              <ul className="space-y-3 text-sm">

                <li>
                  <CheckCircleIcon className="inline-block mr-2 text-green-400" />
                  AI seat optimization
                </li>

                <li>
                  <CheckCircleIcon className="inline-block mr-2 text-green-400" />
                  Tool consolidation analysis
                </li>

                <li>
                  <CheckCircleIcon className="inline-block mr-2 text-green-400" />
                  API cost reduction strategy
                </li>

                <li>
                  <CheckCircleIcon className="inline-block mr-2 text-green-400" />
                  Enterprise AI procurement review
                </li>

              </ul>

            </div>

            { /* FOOTER */ }

            <button
              onClick={() => {
                setShowConsultation(false);
                alert("Thank you for requesting a consultation! Our team will reach out to you within 24-48 hours to schedule your session.");
              }}
              className="w-full mt-8 bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-[1.02] text-white py-4 rounded-2xl font-semibold transition"
            >
              Request Consultation
            </button>

          </div>

        </div>

      )}
      <Footer />
    </div>
  );
}

export default App;