import { useEffect, useState } from "react";
import { aiTools } from "../data/tools";
import { Trash2, Plus } from "lucide-react";
import { generateAudit } from "../utils/auditEngine";
import { pricingData } from "../data/pricing";

function SpendForm({ setAudit }) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [tools, setTools] = useState(() => {
    const saved = localStorage.getItem("auditTools");

    return saved
      ? JSON.parse(saved)
      : [
        {
          tool: "Cursor",
          plan: "Pro",
          monthlySpend: "",
          seats: "",
        },
      ];
  });

  const [teamSize, setTeamSize] = useState(() => {
    return localStorage.getItem("teamSize") || "";
  });

  const [useCase, setUseCase] = useState(() => {
    return localStorage.getItem("useCase") || "coding";
  });

  useEffect(() => {
    localStorage.setItem("teamSize", teamSize);
  }, [teamSize]);

  useEffect(() => {
    localStorage.setItem("useCase", useCase);
  }, [useCase]);

  useEffect(() => {
    localStorage.setItem("auditTools", JSON.stringify(tools));
  }, [tools]);

  const handleToolChange = (index, field, value) => {
    const updated = [...tools];

    updated[index][field] = value;

    if (field === "tool") {
      const selectedTool = aiTools.find((t) => t.name === value);
      updated[index].plan = selectedTool.plans[0];
    }

    setTools(updated);
  };

  const addTool = () => {
    setTools([
      ...tools,
      {
        tool: "Cursor",
        plan: "Pro",
        monthlySpend: "",
        seats: "",
      },
    ]);
  };

const getMaxSeats = (tool, plan, spend) => {

  const planPrice =
    pricingData[tool]?.[plan] || 1;

  const monthlySpend =
    Number(spend) || 0;

  return Math.floor(
    monthlySpend / planPrice
  );
};
const hasSeatLimitError = tools.some((item) => {

  const maxSeats = getMaxSeats(
    item.tool,
    item.plan,
    item.monthlySpend
  );

  return Number(item.seats) > maxSeats;
});

  const removeTool = (index) => {
    const updated = tools.filter((_, i) => i !== index);
    setTools(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");

    setError("");

    for (const item of tools) {

      const planPrice =
        pricingData[item.tool]?.[item.plan] || 0;

      const seats = Number(item.seats) || 0;

      const spend = Number(item.monthlySpend) || 0;

      const minimumRequiredCost = planPrice * seats;

      if (spend < minimumRequiredCost) {

        setLoading(false);

        setError(
          `${item.tool} ${item.plan} requires at least $${minimumRequiredCost}/month for ${seats} seats.`
        );

        return;
      }
    }

    const auditData = {
      tools,
      teamSize,
      useCase,
    };

    setTimeout(() => {
      const auditResult = generateAudit(auditData);

      localStorage.setItem(
        "auditResult",
        JSON.stringify(auditResult)
      );

      setAudit(auditResult);

      setLoading(false);

      setSuccessMessage(
        `Audit generated successfully! You could save $${auditResult.totalMonthlySavings}/month.`
      );

      console.log(auditResult);

    }, 1500);
  };

  return (
    <section className="px-6 py-20 bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold mb-4">
            Audit Your AI Stack
          </h2>

          <p className="text-slate-400 text-lg">
            Discover where your startup is overspending on AI tools.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
        >
          <div className="space-y-8">
            {tools.map((item, index) => {
              const selectedTool = aiTools.find(
                (tool) => tool.name === item.tool
              );

              return (
                <div
                  key={index}
                  className="border border-slate-800 rounded-2xl p-6 bg-slate-950"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold">
                      Tool {index + 1}
                    </h3>

                    {tools.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTool(index)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <Trash2 />
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-slate-300">
                        AI Tool
                      </label>

                      <select
                        value={item.tool}
                        onChange={(e) =>
                          handleToolChange(index, "tool", e.target.value)
                        }
                        className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
                      >
                        {aiTools.map((tool) => (
                          <option key={tool.name} value={tool.name}>
                            {tool.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 text-slate-300">
                        Plan
                      </label>

                      <select
                        value={item.plan}
                        onChange={(e) =>
                          handleToolChange(index, "plan", e.target.value)
                        }
                        className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
                      >
                        {selectedTool.plans.map((plan) => (
                          <option key={plan} value={plan}>
                            {plan}
                          </option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="number"
                      placeholder="Monthly Spend ($)"
                      value={item.monthlySpend}
                      onChange={(e) =>
                        handleToolChange(
                          index,
                          "monthlySpend",
                          e.target.value
                        )
                      }
                      className="p-4 rounded-xl bg-slate-800 border border-slate-700"
                    />

                     <div>
  <input
    type="number"
    placeholder="Seats"
    value={item.seats}
    min="1"
    onChange={(e) => {

      const maxSeats = getMaxSeats(
        item.tool,
        item.plan,
        item.monthlySpend
      );

      let value = Number(e.target.value);

      if (value > maxSeats) {
        return;
      }

      handleToolChange(
        index,
        "seats",
        value
      );
    }}
    className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
  />

  {Number(item.seats) >=
  getMaxSeats(
    item.tool,
    item.plan,
    item.monthlySpend
  ) &&
  Number(item.monthlySpend) > 0 && (
    <p className="text-red-400 text-sm mt-2">
      Increase monthly spend to unlock more seats.
    </p>
)}
</div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={addTool}
            className="mt-8 flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl transition"
          >
            <Plus size={18} />
            Add Another Tool
          </button>

          <div className="grid md:grid-cols-2 gap-5 mt-10">
            <input
              type="number"
              placeholder="Total Team Size"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="p-4 rounded-xl bg-slate-800 border border-slate-700"
            />

            <select
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="p-4 rounded-xl bg-slate-800 border border-slate-700"
            >
              <option value="coding">Coding</option>
              <option value="writing">Writing</option>
              <option value="data">Data</option>
              <option value="research">Research</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>

          <button
  disabled={loading || hasSeatLimitError}
  className={`w-full mt-10 p-5 rounded-2xl text-lg font-semibold transition
  ${
    loading || hasSeatLimitError
      ? "bg-slate-700 cursor-not-allowed opacity-50"
      : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  {loading
    ? "Generating Audit..."
    : "Generate AI Spend Audit"}
</button>

          {successMessage && (
            <div className="mt-5 bg-green-500/10 border border-green-500 text-green-400 p-4 rounded-2xl">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mt-5 bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-2xl">
              {error}
            </div>
          )}
          
        </form>
      </div>
    </section>
  );
}

export default SpendForm;