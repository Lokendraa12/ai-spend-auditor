import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold leading-tight"
        >
          Stop Overpaying For AI Tools
        </motion.h1>

        <p className="mt-6 text-slate-300 text-xl">
          Discover hidden savings in your AI stack instantly.
        </p>

        <button className="mt-8 bg-blue-500 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-600 transition">
          Run Free Audit
        </button>
      </div>
    </section>
  );
}

export default Hero;