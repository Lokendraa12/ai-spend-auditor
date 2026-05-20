import { useEffect, useState } from "react";
import { aiTools } from "../data/tools";
import { Trash2, Plus } from "lucide-react";

function SpendForm() {
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

  const removeTool = (index) => {
    const updated = tools.filter((_, i) => i !== index);
    setTools(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const auditData = {
      tools,
      teamSize,
      useCase,
    };

    console.log(auditData);

    alert("Audit data saved successfully!");
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

                    <input
                      type="number"
                      placeholder="Seats"
                      value={item.seats}
                      onChange={(e) =>
                        handleToolChange(index, "seats", e.target.value)
                      }
                      className="p-4 rounded-xl bg-slate-800 border border-slate-700"
                    />
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

          <button className="w-full mt-10 bg-blue-500 hover:bg-blue-600 transition p-5 rounded-2xl text-lg font-semibold">
            Generate AI Spend Audit
          </button>
        </form>
      </div>
    </section>
  );
}

export default SpendForm;