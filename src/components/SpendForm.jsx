import { useEffect, useState } from "react";
import { aiTools } from "../data/tools";
import { Trash2, Plus } from "lucide-react";
import { pricingData } from "../data/pricing";

function SpendForm({
  onSubmit,
  loading,
}) {

  const [successMessage, setSuccessMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [loadingMessageIndex, setLoadingMessageIndex] =
    useState(0);

  const loadingMessages = [
    "Analyzing AI subscriptions...",
    "Optimizing pricing models...",
    "Generating enterprise recommendations...",
    "Detecting overspending patterns...",
  ];

  const [tools, setTools] = useState(() => {

    const saved =
      localStorage.getItem("auditTools");

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

  const [teamSize, setTeamSize] =
    useState(() => {
      return (
        localStorage.getItem("teamSize") || ""
      );
    });

  const [useCase, setUseCase] =
    useState(() => {
      return (
        localStorage.getItem("useCase") ||
        "coding"
      );
    });

  /*
  -----------------------------------
  LOADING MESSAGE ROTATION
  -----------------------------------
  */

  useEffect(() => {

    if (!loading) return;

    const interval = setInterval(() => {

      setLoadingMessageIndex((prev) =>
        prev === loadingMessages.length - 1
          ? 0
          : prev + 1
      );

    }, 1000);

    return () => clearInterval(interval);

  }, [loading]);

  /*
  -----------------------------------
  LOCAL STORAGE
  -----------------------------------
  */

  useEffect(() => {
    localStorage.setItem(
      "teamSize",
      teamSize
    );
  }, [teamSize]);

  useEffect(() => {
    localStorage.setItem(
      "useCase",
      useCase
    );
  }, [useCase]);

  useEffect(() => {
    localStorage.setItem(
      "auditTools",
      JSON.stringify(tools)
    );
  }, [tools]);

  /*
  -----------------------------------
  TOOL UPDATE
  -----------------------------------
  */

  const handleToolChange = (
    index,
    field,
    value
  ) => {

    const updated = [...tools];

    updated[index][field] = value;

    if (field === "tool") {

      const selectedTool =
        aiTools.find(
          (t) => t.name === value
        );

      updated[index].plan =
        selectedTool.plans[0];
    }

    setTools(updated);
  };

  /*
  -----------------------------------
  ADD TOOL
  -----------------------------------
  */

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

  /*
  -----------------------------------
  REMOVE TOOL
  -----------------------------------
  */

  const removeTool = (index) => {

    const updated =
      tools.filter(
        (_, i) => i !== index
      );

    setTools(updated);
  };

  /*
  -----------------------------------
  MAX SEATS
  -----------------------------------
  */

  const getMaxSeats = (
    tool,
    plan,
    spend
  ) => {

    const planPrice =
      pricingData[tool]?.[plan] || 1;

    const monthlySpend =
      Number(spend) || 0;

    return Math.floor(
      monthlySpend / planPrice
    );
  };

  /*
  -----------------------------------
  SEAT LIMIT ERROR
  -----------------------------------
  */

  const hasSeatLimitError =
    tools.some((item) => {

      const maxSeats =
        getMaxSeats(
          item.tool,
          item.plan,
          item.monthlySpend
        );

      return (
        Number(item.seats) > maxSeats
      );
    });

  /*
  -----------------------------------
  SUBMIT
  -----------------------------------
  */

  const handleSubmit = (e) => {

    e.preventDefault();

    setSuccessMessage("");

    setError("");

    /*
    VALIDATION
    */

    for (const item of tools) {

      const planPrice =
        pricingData[item.tool]?.[
        item.plan
        ] || 0;

      const seats =
        Number(item.seats) || 0;

      const spend =
        Number(item.monthlySpend) || 0;

      const minimumRequiredCost =
        planPrice * seats;

      const totalmonthlysavings =
        tools.reduce((total, tool) => {

          const toolPlanPrice =
            pricingData[tool.tool]?.[
            tool.plan
            ] || 0;
          const toolSeats =
            Number(tool.seats) || 0;
          const toolSpend =
            Number(tool.monthlySpend) || 0;
          const toolExpectedCost =
            toolPlanPrice * toolSeats;
          return (
            total +
            Math.max(
              0,
              toolSpend - toolExpectedCost
            )

          );
        }, 0);

      setTimeout(() => {
        setSuccessMessage(
          `Audit complete! Estimated monthly savings: $${totalmonthlysavings}`
        );
      }, 2500);

      if (
        spend < minimumRequiredCost
      ) {

        setError(
          `${item.tool} ${item.plan} requires at least $${minimumRequiredCost}/month for ${seats} seats.`
        );

        return;
      }
    }

    /*
    SEND DATA
    */

    onSubmit({
      tools,
      teamSize,
      useCase,
    });
    console.log(tools)


  };

  return (

    <section className="px-6 py-20 bg-slate-950 text-white">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-14">

          <h2 className="text-5xl font-bold mb-4">
            Audit Your AI Stack
          </h2>

          <p className="text-slate-400 text-lg">
            Discover where your startup is overspending on AI infrastructure.
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
        >

          <div className="space-y-8">

            {tools.map((item, index) => {

              const selectedTool =
                aiTools.find(
                  (tool) =>
                    tool.name === item.tool
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
                        onClick={() =>
                          removeTool(index)
                        }
                        className="text-red-400 hover:text-red-500"
                      >
                        <Trash2 />
                      </button>

                    )}

                  </div>

                  <div className="grid md:grid-cols-2 gap-5">

                    {/* TOOL */}

                    <div>

                      <label className="block mb-2 text-slate-300">
                        AI Tool
                      </label>

                      <select
                        value={item.tool}
                        onChange={(e) =>
                          handleToolChange(
                            index,
                            "tool",
                            e.target.value
                          )
                        }
                        className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 outline-none"
                      >

                        {aiTools.map((tool) => (

                          <option
                            key={tool.name}
                            value={tool.name}
                          >
                            {tool.name}
                          </option>

                        ))}

                      </select>

                    </div>

                    {/* PLAN */}

                    <div>

                      <label className="block mb-2 text-slate-300">
                        Plan
                      </label>

                      <select
                        value={item.plan}
                        onChange={(e) =>
                          handleToolChange(
                            index,
                            "plan",
                            e.target.value
                          )
                        }
                        className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 outline-none"
                      >

                        {selectedTool.plans.map(
                          (plan) => (

                            <option
                              key={plan}
                              value={plan}
                            >
                              {plan}
                            </option>

                          )
                        )}

                      </select>

                    </div>

                    {/* MONTHLY SPEND */}

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
                      className="p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 outline-none"
                    />

                    {/* SEATS */}

                    <div>

                      <input
                        type="number"
                        placeholder="Seats"
                        value={item.seats}
                        min="1"
                        onChange={(e) => {

                          const maxSeats =
                            getMaxSeats(
                              item.tool,
                              item.plan,
                              item.monthlySpend
                            );

                          let value =
                            Number(
                              e.target.value
                            );

                          if (
                            value > maxSeats
                          ) {
                            return;
                          }

                          handleToolChange(
                            index,
                            "seats",
                            value
                          );

                        }}
                        className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 outline-none"
                      />

                      {Number(item.seats) >=
                        getMaxSeats(
                          item.tool,
                          item.plan,
                          item.monthlySpend
                        ) &&
                        Number(
                          item.monthlySpend
                        ) > 0 && (

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

          {/* ADD TOOL */}

          <button
            type="button"
            onClick={addTool}
            className="mt-8 flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-5 py-3 rounded-xl transition"
          >

            <Plus size={18} />

            Add Another Tool

          </button>

          {/* TEAM */}

          <div className="grid md:grid-cols-2 gap-5 mt-10">

            <input
              type="number"
              placeholder="Total Team Size"
              value={teamSize}
              onChange={(e) =>
                setTeamSize(
                  e.target.value
                )
              }
              className="p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 outline-none"
            />

            <select
              value={useCase}
              onChange={(e) =>
                setUseCase(
                  e.target.value
                )
              }
              className="p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 outline-none"
            >

              <option value="coding">
                Coding
              </option>

              <option value="writing">
                Writing
              </option>

              <option value="data">
                Data
              </option>

              <option value="research">
                Research
              </option>

              <option value="mixed">
                Mixed
              </option>

            </select>

          </div>

          {/* SUBMIT */}

          <button
            disabled={
              loading ||
              hasSeatLimitError
            }
            className={`w-full mt-10 p-5 rounded-2xl text-lg font-semibold transition-all duration-300 ${loading ||
              hasSeatLimitError
              ? "bg-slate-700 cursor-not-allowed opacity-50"
              : "bg-blue-500 hover:bg-blue-600 hover:scale-[1.02]"
              }`}
          >

            {loading ? (

              <div className="flex flex-col items-center gap-2">

                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />

                <span>
                  {
                    loadingMessages[
                    loadingMessageIndex
                    ]
                  }
                </span>
                
              </div>

            ) : (
              "Generate AI Spend Audit"
            )}

          </button>

          {/* SUCCESS */}

          {successMessage && (

            <div className="mt-5 bg-green-500/10 border border-green-500 text-green-400 p-4 rounded-2xl">

              {successMessage}

            </div>

          )}

          {/* ERROR */}

          {error && (

            <div className="mt-5 bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-2xl">

              {error}

            </div>

          )}



        </form>
       
       {localStorage.getItem("auditTools") && (

  <button
    onClick={() => {

      console.log("Clearing stored audit data...");

      console.log({
        tools,
        teamSize,
        useCase,
      });

      localStorage.clear();

      window.location.reload();

    }}
    className="mt-6 bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl text-white transition"
  >

    Reset Data

  </button>

)}

      </div>

    </section>
  );
}

export default SpendForm;