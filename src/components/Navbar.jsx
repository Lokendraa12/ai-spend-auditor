function Navbar() {

  const scrollToAudit = () => {

    const auditSection =
      document.getElementById(
        "audit-section"
      );

    if (auditSection) {

      auditSection.scrollIntoView({
        behavior: "smooth",
      });

    }
  };

  const scrollToForm = () => {

    const formSection =
      document.getElementById(
        "spend-form"
      );

    if (formSection) {

      formSection.scrollIntoView({
        behavior: "smooth",
      });

    }
  };

  const scrollToHero = () => {

    const heroSection =
      document.getElementById(
        "hero"
      );

    if (heroSection) {

      heroSection.scrollIntoView({
        behavior: "smooth",
      });

    }
  };

  return (

    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">

      <nav className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* LOGO */}

        <div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">

            AI Spend Auditor

          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Enterprise AI Cost Optimization
          </p>

        </div>

        {/* NAV LINKS */}

        <div className="hidden md:flex items-center gap-8">

          <button
            onClick={scrollToHero}
            className="text-slate-300 hover:text-white transition"
          >
            Home
          </button>

          <button
            onClick={scrollToForm}
            className="text-slate-300 hover:text-white transition"
          >
            Spend Form
          </button>

          <button
            onClick={scrollToAudit}
            className="text-slate-300 hover:text-white transition"
          >
            Audit Results
          </button>

        </div>

        {/* CTA */}

        <button
          onClick={scrollToAudit}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 rounded-2xl font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/20"
        >

          Generate Audit

        </button>

        

      </nav>

    </header>

  );
}

export default Navbar;