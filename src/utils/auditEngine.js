import { pricingData } from "../data/pricing";

export function generateAudit(auditData) {
  const { tools, teamSize, useCase } = auditData;

  const results = tools.map((item) => {
    const   currentSpend = Number(item.monthlySpend) || 0;
    const seats = Number(item.seats) || 1;
    const team = Number(teamSize) || seats;

    const basePrice = pricingData[item.tool]?.[item.plan] || 0;

    let recommendedPlan = item.plan;
    let recommendedTool = item.tool;
    let recommendedMonthlyCost = currentSpend;
    let action = "Keep current plan";
    let reason = "Your current plan looks reasonable for your team size and use case.";

    const expectedPlanCost = basePrice * seats;

if (
  basePrice > 0 &&
  currentSpend > expectedPlanCost * 1.25
) {
  recommendedMonthlyCost = expectedPlanCost;

  action = "Review billing and right-size seats";

  reason = `Your entered spend is significantly higher than the estimated ${item.plan} pricing for ${seats} seats. This may indicate unused seats, premium add-ons, or inefficient billing.`;
}

    if (team <= 2 && ["Team", "Business", "Enterprise", "Teams"].includes(item.plan)) {
      recommendedPlan = item.tool === "GitHub Copilot" ? "Individual" : "Pro";
      recommendedMonthlyCost = (pricingData[item.tool]?.[recommendedPlan] || basePrice) * seats;
      action = `Downgrade to ${recommendedPlan}`;
      reason = "Small teams usually do not need admin, SSO, or enterprise controls.";
    }

    if (useCase === "coding" && item.tool === "ChatGPT" && item.plan === "Team") {
      recommendedTool = "Cursor";
      recommendedPlan = "Pro";
      recommendedMonthlyCost = pricingData.Cursor.Pro * seats;
      action = "Switch coding users to Cursor Pro";
      reason = "For coding-heavy teams, Cursor gives IDE-native AI assistance at a lower estimated monthly cost.";
    }

    

    if (useCase === "coding" && item.tool === "Claude" && item.plan === "Max") {
      recommendedTool = "Cursor";
      recommendedPlan = "Pro";
      recommendedMonthlyCost = pricingData.Cursor.Pro * seats;
      action = "Use Cursor Pro for coding workflows";
      reason = "Claude Max is powerful, but coding-only users may get enough value from Cursor Pro at lower cost.";
    }

    if (item.tool.includes("API") && currentSpend > 100) {
      recommendedMonthlyCost = Math.round(currentSpend * 0.75);
      action = "Apply usage optimization and discounted credits";
      reason = "High API spend can often be reduced using prompt caching, batching, model routing, and discounted credits.";
    }

    const monthlySavings = Math.max(0, currentSpend - recommendedMonthlyCost);
    const annualSavings = monthlySavings * 12;

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

  const totalMonthlySpend = results.reduce((sum, item) => sum + item.currentSpend, 0);
  const totalMonthlySavings = results.reduce((sum, item) => sum + item.monthlySavings, 0);
  const totalAnnualSavings = totalMonthlySavings * 12;

  return {
    results,
    totalMonthlySpend,
    totalMonthlySavings,
    totalAnnualSavings,
    isHighSavings: totalMonthlySavings > 500,
    isOptimized: totalMonthlySavings < 100,
  };
}   