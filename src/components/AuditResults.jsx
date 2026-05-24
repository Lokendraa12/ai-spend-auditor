import { TrendingDown, DollarSign, BadgeCheck, CheckCircle } from "lucide-react";
import { generateSummary } from "../utils/generateSummary";
import { motion } from "framer-motion";

function AuditResults({ audit }) {
  if (!audit) return null;
  const summary = generateSummary(audit);

  return (
    <section className="px-6 py-20 bg-slate-950 text-white">
  
      <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="max-w-6xl mx-auto"
>

        {/* Hero Section */}

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-10 mb-12 shadow-2xl">
          <h2 className="text-5xl font-bold mb-4">
            Your AI Spend Audit
          </h2>

          <p className="text-xl text-blue-100">
            Here’s how much your team could save with smarter AI tool usage.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <DollarSign size={32} />

              <h3 className="text-3xl font-bold mt-4">
                ${audit.totalMonthlySpend}
              </h3>

              <p className="text-blue-100 mt-2">
                Current Monthly Spend
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <TrendingDown size={32} />

              <h3 className="text-3xl font-bold mt-4">
                ${audit.totalMonthlySavings}
              </h3>

              <p className="text-blue-100 mt-2">
                Potential Monthly Savings
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <BadgeCheck size={32} />

              <h3 className="text-3xl font-bold mt-4">
                ${audit.totalAnnualSavings}
              </h3>

              <p className="text-blue-100 mt-2">
                Estimated Annual Savings
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-12">
  <h3 className="text-3xl font-bold mb-5">
    AI Audit Summary
  </h3>

  <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-line">
    {summary}
  </p>
</div>

        {/* Optimized State */}

        {audit.isOptimized && (
          <div className="bg-green-500/10 border border-green-500 rounded-2xl p-6 mb-10">
            <h3 className="text-2xl font-semibold text-green-400">
              Your AI spending looks healthy <CheckCircle size={24} className="inline-block ml-2" />
            </h3>

            <p className="text-slate-300 mt-2">
              We couldn’t find major savings opportunities right now.
            </p>
          </div>
        )}

        {/* Tool Breakdown */}

        <div className="space-y-8">
          {audit.results.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>
                  <h3 className="text-3xl font-bold">
                    {item.tool}
                  </h3>

                  <p className="text-slate-400 mt-2">
                    Current Plan: {item.plan}
                  </p>
                </div>

                <div className="text-right">
                  <h4 className="text-4xl font-bold text-blue-400">
                    ${item.monthlySavings}
                  </h4>

                  <p className="text-slate-400">
                    Monthly Savings
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-10">

                <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800">
                  <p className="text-slate-400 mb-2">
                    Recommended Action
                  </p>

                  <h4 className="text-2xl font-semibold">
                    {item.action}
                  </h4>
                </div>

                <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800">
                  <p className="text-slate-400 mb-2">
                    Recommendation Reason
                  </p>

                  <h4 className="text-lg leading-relaxed">
                    {item.reason}
                  </h4>
                </div>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-5">

                <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800">
                  <p className="text-slate-400">
                    Current Spend
                  </p>

                  <h4 className="text-2xl font-bold mt-2">
                    ${item.currentSpend}
                  </h4>
                </div>

                <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800">
                  <p className="text-slate-400">
                    Recommended Cost
                  </p>

                  <h4 className="text-2xl font-bold mt-2">
                    ${item.recommendedMonthlyCost}
                  </h4>
                </div>

                <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800">
                  <p className="text-slate-400">
                    Annual Savings
                  </p>

                  <h4 className="text-2xl font-bold mt-2">
                    ${item.annualSavings}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Credex CTA */}

        {audit.isHighSavings && (

  <div className="mt-12 bg-gradient-to-r from-red-500 to-orange-500 p-10 rounded-3xl">

    <div className="inline-block bg-white/20 px-4 py-2 rounded-xl mb-5">
      High Overspending Detected
    </div>

    <h2 className="text-4xl font-bold">
      Your team could save ${audit.totalAnnualSavings}/year
    </h2>

    <p className="mt-4 text-lg text-white/90">
      Large AI spend inefficiencies detected across your stack.
      Credex may help reduce costs through smarter seat allocation,
      tool consolidation, and usage optimization.
    </p>

    <div className="grid md:grid-cols-3 gap-5 mt-8">

      <div className="bg-white/10 p-5 rounded-2xl">
        <h3 className="text-3xl font-bold">
          ${audit.totalMonthlySavings}
        </h3>

        <p>Monthly Savings</p>
      </div>

      <div className="bg-white/10 p-5 rounded-2xl">
        <h3 className="text-3xl font-bold">
          ${audit.totalAnnualSavings}
        </h3>

        <p>Annual Savings</p>
      </div>

      <div className="bg-white/10 p-5 rounded-2xl">
        <h3 className="text-3xl font-bold">
          ${audit.totalAnnualSavings * 3}
        </h3>

        <p>3-Year Projection</p>
      </div>
    </div>

    <button className="mt-8 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
      Book Credex Consultation
    </button>
  </div>
)}
      </motion.div>
      
    </section>
  );
}

export default AuditResults;