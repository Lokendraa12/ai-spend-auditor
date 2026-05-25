import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

import { generateSummary } from "../utils/generateSummary";
import { exportAuditPDF } from "../utils/exportAudit";

function AuditResults({ audit }) {

  if (!audit) {
    return (
      <section className="px-6 py-24 text-center text-white">

        <div className="text-8xl mb-8">
          📊
        </div>

        <h2 className="text-5xl font-bold">
          No Audit Generated Yet
        </h2>

        <p className="text-slate-400 mt-6 text-lg">
          Generate your first AI cost optimization audit.
        </p>

      </section>
    );
  }

  const summary = generateSummary(audit);

  const optimizationScore =
    audit.totalMonthlySpend > 0
      ? Math.max(
          10,
          100 -
            Math.round(
              (audit.totalMonthlySavings /
                audit.totalMonthlySpend) *
                100
            )
        )
      : 100;

  const topRecommendation =
    [...audit.results].sort(
      (a, b) =>
        b.monthlySavings -
        a.monthlySavings
    )[0];

  return (

    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 py-20 text-white"
    >

      <div className="max-w-6xl mx-auto">

        {/* SUMMARY */}

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-12 hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300">

          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500 px-4 py-2 rounded-xl text-green-400 mb-6">
            <CheckCircle size={18} />
            Audit Confidence: High
          </div>

          <h3 className="text-3xl font-bold mb-5">
            AI Audit Summary
          </h3>

          <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-line">
            {summary}
          </p>

          <button
            onClick={() => {
              navigator.clipboard.writeText(summary);
            }}
            className="mt-5 bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-2xl transition"
          >
            Copy Summary
          </button>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300">

            <p className="text-slate-400 mb-3">
              Monthly Spend
            </p>

            <h2 className="text-3xl md:text-5xl font-bold">
              $
              {audit.totalMonthlySpend}
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:shadow-green-500/20 hover:shadow-2xl transition-all duration-300">

            <p className="text-slate-400 mb-3">
              Monthly Savings
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-green-400">
              $
             {audit.totalMonthlySavings}
            </h2>

          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-300">

            <p className="text-slate-400 mb-3">
              Annual Savings
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-purple-400">
              $
              {audit.totalAnnualSavings}
            </h2>

          </div>

        </div>

        {/* OPTIMIZATION SCORE */}

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl mt-10 hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300">

          <div className="flex justify-between mb-3">

            <span className="text-lg">
              Optimization Score
            </span>

            <span className="font-bold">
              {optimizationScore}%
            </span>

          </div>

          <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">

            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-700"
              style={{
                width: `${optimizationScore}%`,
              }}
            />

          </div>

        </div>

        {/* TOP RECOMMENDATION */}

        {topRecommendation && (

          <div className="bg-blue-500/10 border border-blue-500 p-8 rounded-3xl mt-10 hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300">

            <h3 className="text-3xl font-bold mb-4">
              Top Recommendation
            </h3>

            <p className="text-slate-300 text-lg">
              {topRecommendation.action}
            </p>

            <p className="text-slate-400 mt-3">
              Potential Monthly Savings:
              ${topRecommendation.monthlySavings}
            </p>

          </div>

        )}

        {/* RESULTS */}

        <div className="mt-12 space-y-8">

          {audit.results.map((item, index) => (

            <div
              key={index}
              className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>

                  <h3 className="text-3xl font-bold">
                    {item.tool}
                  </h3>

                  <p className="text-slate-400 mt-2">
                    Current Plan: {item.plan}
                  </p>

                  <p className="text-slate-400">
                    Seats: {item.seats}
                  </p>

                </div>

                <div className="text-left md:text-right">

                  <p className="text-slate-400">
                    Potential Monthly Savings
                  </p>

                  <h2 className="text-4xl font-bold text-green-400 mt-2">
                    ${item.monthlySavings}
                  </h2>

                </div>

              </div>

              <div className="mt-8 bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">

                <h4 className="text-xl font-semibold mb-3">
                  Recommended Action
                </h4>

                <p className="text-blue-400 font-medium">
                  {item.action}
                </p>

                <p className="text-slate-300 mt-4 leading-relaxed">
                  {item.reason}
                </p>

              </div>

            </div>

          ))}

        </div>

        {/* HIGH SAVINGS CTA */}

        {audit.isHighSavings && (

          <div className="mt-14 bg-gradient-to-r from-red-500 to-orange-500 p-10 rounded-3xl text-white">

            <div className="inline-block bg-white/20 px-4 py-2 rounded-xl mb-5">
              High Overspending Detected
            </div>

            <h2 className="text-4xl font-bold">
              Your team could save
              {" "}
              ${audit.totalAnnualSavings}/year
            </h2>

            <p className="mt-4 text-lg text-white/90">
              Large AI spend inefficiencies detected across your stack.
            </p>

            <button className="mt-8 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
              Book Credex Consultation
            </button>

          </div>

        )}

        {/* EXPORT */}

        <div className="mt-12">

          <button
            onClick={() => exportAuditPDF(audit)}
            className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition"
          >
            Export Audit PDF
          </button>

          <p className="text-slate-500 text-sm mt-6">
            Powered by Credex Intelligence Layer
          </p>

        </div>

      </div>

    </motion.section>
  );
}

export default AuditResults;