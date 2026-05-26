function Footer() {
    return (
        <footer className="border-t border-slate-800 mt-20 bg-slate-950 text-slate-400">

            <div className="max-w-6xl mx-auto px-6 py-12">

                <div className="grid md:grid-cols-3 gap-10 text-left">

                    {/* BRAND */}

                    <div>

                        <h2 className="text-2xl font-bold text-white">
                            Credex AI Audit
                        </h2>

                        <p className="mt-4 text-slate-400 leading-relaxed">
                            AI infrastructure cost optimization platform
                            designed to help teams reduce unnecessary
                            AI subscription and tooling spend.
                        </p>

                    </div>

                    {/* FEATURES */}

                    <div>

                        <h3 className="text-lg font-semibold text-white mb-4">
                            Features
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                AI Spend Analysis
                            </li>

                            <li>
                                Optimization Recommendations
                            </li>

                            <li>
                                Enterprise Audit Reports
                            </li>

                            <li>
                                PDF Export System
                            </li>

                        </ul>

                    </div>

                    {/* INFO */}

                    <div>

                        <h3 className="text-lg font-semibold text-white mb-4">
                            Project Info
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                Built for Credex Web Development Assignment
                            </li>

                            <li>
                                React + Tailwind CSS
                            </li>

                            <li>
                                AI Cost Optimization Dashboard
                            </li>

                            <li>
                                2026 Submission
                            </li>

                        </ul>

                    </div>

                </div>

                {/* BOTTOM */}

                <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

                    <p className="text-sm">
                        © 2026 Credex AI Audit. All rights reserved.
                    </p>

                    <p className="text-sm text-slate-500">
                        Built with React, Tailwind CSS & jsPDF
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;