import { pricingData } from "../data/pricing";

export function generateAudit(auditData) {

  const { tools, teamSize, useCase } = auditData;

  const results = tools.map((item) => {

    const currentSpend =
      Number(item.monthlySpend) || 0;

    const seats =
      Number(item.seats) || 1;

    const team =
      Number(teamSize) || seats;

    const basePrice =
      pricingData[item.tool]?.[item.plan] || 0;

    const expectedPlanCost =
      basePrice * seats;

    let recommendedPlan = item.plan;

    let recommendedTool = item.tool;

    let recommendedMonthlyCost =
      expectedPlanCost;

    let action =
      "Keep current plan";

    let reason =
      "Your current plan looks reasonable for your team size and use case.";

    /*
    -----------------------------------
    OVERSPENDING DETECTION
    -----------------------------------
    */

    if (
      basePrice > 0 &&
      currentSpend > expectedPlanCost
    ) {

      recommendedMonthlyCost =
        expectedPlanCost;

      action =
        "Reduce unnecessary AI spend";

      reason =
        `Your current spend exceeds the estimated ${item.plan} pricing for ${seats} seats. You may be paying for unused seats or unnecessary upgrades.`;
    }

    /*
    -----------------------------------
    SMALL TEAM DOWNGRADE
    -----------------------------------
    */

    if (
      team <= 2 &&
      ["Team", "Business", "Enterprise", "Teams"].includes(item.plan)
    ) {

      recommendedPlan =
        item.tool === "GitHub Copilot"
          ? "Individual"
          : "Pro";

      recommendedMonthlyCost =
        (pricingData[item.tool]?.[recommendedPlan] || basePrice) * seats;

      action =
        `Downgrade to ${recommendedPlan}`;

      reason =
        "Small teams usually do not require enterprise collaboration or admin controls.";
    }

    /*
    -----------------------------------
    CHATGPT → CURSOR
    -----------------------------------
    */

    if (
      useCase === "coding" &&
      item.tool === "ChatGPT" &&
      item.plan === "Team"
    ) {

      recommendedTool = "Cursor";

      recommendedPlan = "Pro";

      recommendedMonthlyCost =
        pricingData.Cursor.Pro * seats;

      action =
        "Switch coding users to Cursor Pro";

      reason =
        "Cursor provides IDE-native AI coding workflows at a lower estimated cost for engineering teams.";
    }

    /*
    -----------------------------------
    CLAUDE MAX → CURSOR
    -----------------------------------
    */

    if (
      useCase === "coding" &&
      item.tool === "Claude" &&
      item.plan === "Max"
    ) {

      recommendedTool = "Cursor";

      recommendedPlan = "Pro";

      recommendedMonthlyCost =
        pricingData.Cursor.Pro * seats;

      action =
        "Use Cursor Pro for coding workflows";

      reason =
        "Claude Max is powerful, but coding-focused teams may achieve similar productivity using Cursor Pro at a lower monthly cost.";
    }

    /*
    -----------------------------------
    API COST OPTIMIZATION
    -----------------------------------
    */

    if (
      item.tool.includes("API") &&
      currentSpend > 100
    ) {

      recommendedMonthlyCost =
        Math.round(currentSpend * 0.75);

      action =
        "Optimize API usage";

      reason =
        "High API costs can often be reduced through prompt caching, batching, model routing, and usage optimization.";
    }

    /*
    -----------------------------------
    FINAL SAVINGS
    -----------------------------------
    */

    const monthlySavings =
      Math.max(
        0,
        currentSpend - recommendedMonthlyCost
      );

    const annualSavings =
      monthlySavings * 12;

    return {

      tool: item.tool,

      plan: item.plan,

      currentSpend,

      seats,

      recommendedTool,

      recommendedPlan,

      recommendedMonthlyCost,

      action,

      reason,

      monthlySavings,

      annualSavings,
    };
  });

  /*
  -----------------------------------
  TOTALS
  -----------------------------------
  */

  const totalMonthlySpend =
    results.reduce(
      (sum, item) => sum + item.currentSpend,
      0
    );

  const totalMonthlySavings =
    results.reduce(
      (sum, item) => sum + item.monthlySavings,
      0
    );

  const totalAnnualSavings =
    totalMonthlySavings * 12;

  return {

    results,

    totalMonthlySpend,

    totalMonthlySavings,

    totalAnnualSavings,

    isHighSavings:
      totalMonthlySavings > 500,

    isOptimized:
      totalMonthlySavings < 50,
  };
}