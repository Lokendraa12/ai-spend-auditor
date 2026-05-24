export function generateSummary(audit) {

  if (!audit) return "";

  const {
    totalMonthlySavings,
    totalAnnualSavings,
    totalMonthlySpend,
    results,
  } = audit;



  if (totalMonthlySavings > 500) {

    return `
Your organization may be significantly overspending on AI tooling.

Based on the current audit, your team could potentially save $${totalMonthlySavings}/month ($${totalAnnualSavings}/year) through better seat allocation, tool consolidation, and pricing optimization.

Several enterprise-grade subscriptions appear underutilized or inefficiently configured. Credex may help reduce unnecessary AI infrastructure costs through centralized procurement and smarter AI stack management.
`;
  }



  if (totalMonthlySavings > 100) {

    return `
Your AI stack shows moderate optimization opportunities.

The audit identified approximately $${totalMonthlySavings}/month in potential savings through smarter plan selection and improved usage efficiency.

A few tools may currently be over-provisioned for your team size or workflow requirements.
`;
  }


  return `
Your AI spending currently appears relatively optimized.

We could not identify major cost inefficiencies based on the provided pricing and seat allocation data.

Your estimated monthly AI spend of $${totalMonthlySpend} appears aligned with your selected plans and team configuration.
`;
}