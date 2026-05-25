import jsPDF from "jspdf";

export function exportAuditPDF(audit) {

    const doc = new jsPDF();

    /*
    -----------------------------------
    COLORS
    -----------------------------------
    */

    const primary = [15, 23, 42];
    const green = [34, 197, 94];
    const red = [239, 68, 68];
    const blue = [37, 99, 235];
    const gray = [100, 116, 139];

    /*
    -----------------------------------
    HELPERS
    -----------------------------------
    */

    const auditId =
        `CRX-2026-${Math.floor(
            1000 + Math.random() * 9000
        )}`;

    const optimizationScore =
        audit.totalMonthlySpend > 0
            ? Math.max(
                10,
                100 -
                Math.round(
                    (audit.totalMonthlySavings /
                        audit.totalMonthlySpend) *
                    100
                )
            )
            : 100;

    const wastePercentage =
        audit.totalMonthlySpend > 0
            ? Math.round(
                (audit.totalMonthlySavings /
                    audit.totalMonthlySpend) *
                100
            )
            : 0;

    let severity = "Optimized";

    if (audit.totalMonthlySavings > 500) {
        severity = "Critical Overspending";
    } else if (
        audit.totalMonthlySavings > 100
    ) {
        severity = "Moderate Waste";
    }

    /*
    -----------------------------------
    HEADER
    -----------------------------------
    */

    doc.setFillColor(...primary);

    doc.rect(0, 0, 210, 42, "F");

    doc.setTextColor(255, 255, 255);

    doc.setFontSize(24);

    doc.text(
        "Credex AI Spend Audit",
        20,
        20
    );

    doc.setFontSize(11);

    doc.text(
        "Enterprise AI Cost Optimization Report",
        20,
        30
    );

    /*
    -----------------------------------
    AUDIT INFO
    -----------------------------------
    */

    doc.setTextColor(...gray);

    doc.setFontSize(11);

    const generatedDate =
        new Date().toLocaleDateString();

    doc.text(
        `Generated: ${generatedDate}`,
        20,
        55
    );

    doc.text(
        `Audit ID: ${auditId}`,
        140,
        55
    );

    /*
    -----------------------------------
    SEVERITY BADGE
    -----------------------------------
    */

    if (severity === "Critical Overspending") {

        doc.setFillColor(254, 226, 226);

        doc.roundedRect(
            20,
            65,
            70,
            12,
            3,
            3,
            "F"
        );

        doc.setTextColor(...red);

    } else if (
        severity === "Moderate Waste"
    ) {

        doc.setFillColor(254, 249, 195);

        doc.roundedRect(
            20,
            65,
            55,
            12,
            3,
            3,
            "F"
        );

        doc.setTextColor(202, 138, 4);

    } else {

        doc.setFillColor(220, 252, 231);

        doc.roundedRect(
            20,
            65,
            45,
            12,
            3,
            3,
            "F"
        );

        doc.setTextColor(...green);
    }

    doc.setFontSize(10);

    doc.text(
        severity,
        25,
        73
    );

    /*
    -----------------------------------
    EXECUTIVE SUMMARY
    -----------------------------------
    */

    let y = 92;

    doc.setTextColor(...primary);

    doc.setFontSize(18);

    doc.text(
        "Executive Summary",
        20,
        y
    );

    y += 12;

    doc.setFontSize(12);

    doc.setTextColor(60, 60, 60);

    const summary =
        audit.totalMonthlySavings > 500
            ? "Large AI spend inefficiencies were detected across your stack. Credex identified strong optimization opportunities through seat consolidation, plan restructuring, and AI workflow optimization."
            : audit.totalMonthlySavings > 100
                ? "Moderate savings opportunities were identified through better pricing alignment and optimized AI seat allocation."
                : "Your AI infrastructure currently appears relatively optimized with minimal detected inefficiencies.";

    const summaryLines =
        doc.splitTextToSize(summary, 170);

    doc.text(
        summaryLines,
        20,
        y
    );

    y += summaryLines.length * 7 + 15;

    /*
    -----------------------------------
    OPTIMIZATION SCORE
    -----------------------------------
    */

    doc.setTextColor(...primary);

    doc.setFontSize(18);

    doc.text(
        "Optimization Score",
        20,
        y
    );

    y += 10;

    doc.setFillColor(248, 250, 252);

    doc.roundedRect(
        20,
        y,
        170,
        28,
        4,
        4,
        "F"
    );

    doc.setFontSize(26);

    doc.setTextColor(...blue);

    doc.text(
        `${optimizationScore}%`,
        25,
        y + 18
    );

    doc.setFontSize(11);

    doc.setTextColor(...gray);

    doc.text(
        `Estimated Waste: ${wastePercentage}% of current AI spend`,
        80,
        y + 18
    );

    y += 42;

    /*
    -----------------------------------
    KEY METRICS
    -----------------------------------
    */

    doc.setTextColor(...primary);

    doc.setFontSize(18);

    doc.text(
        "Key Metrics",
        20,
        y
    );

    y += 12;

    /*
    CARD 1
    */

    doc.setFillColor(248, 250, 252);

    doc.roundedRect(
        20,
        y,
        50,
        32,
        4,
        4,
        "F"
    );

    doc.setTextColor(...gray);

    doc.setFontSize(10);

    doc.text(
        "Monthly Spend",
        25,
        y + 10
    );

    doc.setTextColor(...primary);

    doc.setFontSize(18);

    doc.text(
        `$${audit.totalMonthlySpend}`,
        25,
        y + 23
    );

    /*
    CARD 2
    */

    doc.setFillColor(240, 253, 244);

    doc.roundedRect(
        80,
        y,
        50,
        32,
        4,
        4,
        "F"
    );

    doc.setTextColor(...gray);

    doc.setFontSize(10);

    doc.text(
        "Monthly Savings",
        85,
        y + 10
    );

    doc.setTextColor(...green);

    doc.setFontSize(18);

    doc.text(
        `$${audit.totalMonthlySavings}`,
        85,
        y + 23
    );

    /*
    CARD 3
    */

    doc.setFillColor(239, 246, 255);

    doc.roundedRect(
        140,
        y,
        50,
        32,
        4,
        4,
        "F"
    );

    doc.setTextColor(...gray);

    doc.setFontSize(10);

    doc.text(
        "Annual Savings",
        145,
        y + 10
    );

    doc.setTextColor(...blue);

    doc.setFontSize(18);

    doc.text(
        `$${audit.totalAnnualSavings}`,
        145,
        y + 23
    );

    y += 50;

    /*
    -----------------------------------
    AI INSIGHTS
    -----------------------------------
    */

    doc.setTextColor(...primary);

    doc.setFontSize(18);

    doc.text(
        "AI Insights",
        20,
        y
    );

    y += 12;

    doc.setFillColor(248, 250, 252);

    doc.roundedRect(
        20,
        y,
        170,
        35,
        4,
        4,
        "F"
    );

    doc.setTextColor(60, 60, 60);

    doc.setFontSize(11);

    const insight =
        audit.totalMonthlySavings > 500
            ? "Your organization is currently paying enterprise-tier AI subscription costs for workflows that could likely operate efficiently on lower-cost developer plans."
            : "Your current AI stack shows reasonable optimization, but a few subscriptions may still be oversized for your team structure.";

    const insightLines =
        doc.splitTextToSize(insight, 155);

    doc.text(
        insightLines,
        25,
        y + 12
    );

    y += 50;

    /*
    -----------------------------------
    TOP RECOMMENDATION
    -----------------------------------
    */

    const topRecommendation =
        [...audit.results].sort(
            (a, b) =>
                b.monthlySavings -
                a.monthlySavings
        )[0];

    if (topRecommendation) {

        doc.setFillColor(239, 246, 255);

        doc.roundedRect(
            20,
            y,
            170,
            35,
            4,
            4,
            "F"
        );

        doc.setTextColor(...blue);

        doc.setFontSize(16);

        doc.text(
            "Top Recommendation",
            25,
            y + 12
        );

        doc.setTextColor(...primary);

        doc.setFontSize(11);

        doc.text(
            topRecommendation.action,
            25,
            y + 24
        );

        y += 50;
    }

    /*
    -----------------------------------
    TOOL BREAKDOWN
    -----------------------------------
    */

    doc.setTextColor(...primary);

    doc.setFontSize(18);

    doc.text(
        "Tool Breakdown",
        20,
        y
    );

    y += 12;

    audit.results.forEach((item, index) => {

        if (y > 240) {
            doc.addPage();
            y = 20;
        }

        doc.setFillColor(248, 250, 252);

        doc.roundedRect(
            20,
            y,
            170,
            50,
            4,
            4,
            "F"
        );

        doc.setTextColor(...primary);

        doc.setFontSize(15);

        doc.text(
            `${index + 1}. ${item.tool}`,
            25,
            y + 12
        );

        doc.setFontSize(11);

        doc.setTextColor(...gray);

        doc.text(
            `Current Plan: ${item.plan}`,
            25,
            y + 24
        );

        doc.text(
            `Seats: ${item.seats}`,
            25,
            y + 32
        );

        doc.text(
            `Monthly Savings: $${item.monthlySavings}`,
            110,
            y + 24
        );

        doc.setTextColor(...primary);

        doc.text(
            `Recommendation: ${item.action}`,
            110,
            y + 32
        );

        y += 60;
    });

    /*
    -----------------------------------
    ENTERPRISE RECOMMENDATION
    -----------------------------------
    */

    if (audit.isHighSavings) {

        if (y > 220) {
            doc.addPage();
            y = 20;
        }

        doc.setFillColor(254, 242, 242);

        doc.roundedRect(
            20,
            y,
            170,
            45,
            4,
            4,
            "F"
        );

        doc.setTextColor(...red);

        doc.setFontSize(16);

        doc.text(
            "Enterprise Recommendation",
            25,
            y + 12
        );

        doc.setTextColor(...primary);

        doc.setFontSize(11);

        doc.text(
            "Credex recommends:",
            25,
            y + 24
        );

        doc.text(
            "• Seat consolidation",
            35,
            y + 32
        );

        doc.text(
            "• AI vendor optimization",
            100,
            y + 32
        );

        doc.text(
            "• Workflow-level AI routing",
            35,
            y + 40
        );

        y += 60;
    }

    /*
    -----------------------------------
    FOOTER
    -----------------------------------
    */

    doc.setTextColor(...gray);

    doc.setFontSize(10);

    doc.text(
        "Confidential AI Spend Optimization Report",
        20,
        285
    );

    doc.text(
        "Generated by Credex Intelligence Layer",
        120,
        285
    );

    /*
    -----------------------------------
    SAVE PDF
    -----------------------------------
    */

    doc.save("credex-ai-audit.pdf");
}