import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

      <div className="max-w-4xl text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500 text-blue-400 text-sm"
        >
           AI Spend Optimization Platform
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Stop{" "}
          <span className="text-blue-500">
            Overpaying
          </span>{" "}
          for AI Tools
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-slate-300 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Analyze your AI stack, detect overspending,
          and optimize subscriptions in seconds with Credex Intelligence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col md:flex-row gap-4 justify-center"
        >

          <button className="bg-blue-500 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 transition shadow-lg shadow-blue-500/20">
            Run Free AI Audit
          </button>

          <button className="bg-white/10 border border-white/20 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition">
            View Sample Report
          </button>

        </motion.div>

        {/* Small stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-10 text-center">

          <div>
            <h3 className="text-3xl font-bold text-white">
              $2.4M+
            </h3>

            <p className="text-slate-400">
              AI Spend Audited
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">
              150+
            </h3>

            <p className="text-slate-400">
              Workflows Optimized
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">
              92%
            </h3>

            <p className="text-slate-400">
              Cost Efficiency Score
            </p>
          </div>

        </div>

        

      </div>
    </section>
  );
}

export default Hero;