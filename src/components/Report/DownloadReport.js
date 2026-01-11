import jsPDF from 'jspdf';

// Exported Helper to Create PDF Document
export const createReportDoc = (data, fireNumbers, mode) => {
    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    // -- HEADER --
    doc.setFillColor(10, 37, 64); // Navy #0A2540
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text("FIRE Freedom Plan", 20, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${date}`, 20, 30);
    doc.text("Every reality begins as a dream.", 140, 28);

    // -- SECTION 1: Inputs --
    doc.setTextColor(50);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("1. Your Inputs", 20, 60);

    // Divider
    doc.setDrawColor(226, 232, 240); // Slate-200
    doc.setLineWidth(0.5);
    doc.line(20, 63, 190, 63);

    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(80);

    const inputData = [
        `Current Age: ${data.currentAge || 25} Years`,
        `Return Rate Assumption: ${data.investmentReturnRate}%`,
        `Inflation Assumption: ${data.inflationRate}%`,
        `Current Corpus: Rs. ${(data.currentCorpus / 100000).toFixed(2)} L`
    ];

    if (mode === 'income') {
        inputData.unshift(`Annual Income: Rs. ${(data.annualIncome / 100000).toFixed(2)} L`);
        inputData.splice(2, 0, `Annual Expenses: Rs. ${(data.annualExpenses / 100000).toFixed(2)} L`);
    } else {
        inputData.unshift(`Dream Target: Rs. ${(data.targetCorpus / 10000000).toFixed(2)} Cr`);
        inputData.splice(2, 0, `Timeline: ${data.yearsToRetire} Years`);
    }

    let y = 70;
    inputData.forEach(text => {
        doc.text(`• ${text}`, 25, y);
        y += 8;
    });

    // -- SECTION 2: The Numbers --
    y += 10;
    doc.setTextColor(50);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("2. The Strategy", 20, y);

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.line(20, y + 3, 190, y + 3);

    y += 10;

    // Summary Box
    doc.setFillColor(241, 245, 249); // slate-100
    doc.rect(20, y, 170, 40, 'F');
    doc.setTextColor(30);
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');

    let summaryText = "";
    if (mode === 'income') {
        const savings = data.annualIncome - data.annualExpenses;
        const years = data.yearsToRetire || 'X';
        const freedomAge = (data.currentAge || 25) + parseInt(years);
        summaryText = `You will attain your financial freedom through Traditional FIRE in ${years} years (at Age ${freedomAge}). With current savings of Rs. ${(savings / 100000).toFixed(2)}L/yr, you're on track.`;
    } else {
        const freedomAge = (data.currentAge || 25) + parseInt(data.yearsToRetire);
        summaryText = `You will attain your financial freedom through your Goal-Based Plan in ${data.yearsToRetire} years (at Age ${freedomAge}). Focus on increasing income streams while keeping lifestyle inflation in check.`;
    }

    // Split text to fit
    const splitText = doc.splitTextToSize(summaryText, 160);
    doc.text(splitText, 25, y + 10);

    // -- SECTION 3: FIRE Types (Table) --
    if (mode === 'income') {
        y += 50;
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(50);
        doc.text("3. FIRE Benchmarks", 20, y);
        y += 10;

        const headers = ["Type", "Corpus Needed", "Time", "Freedom Age"];
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(headers[0], 25, y);
        doc.text(headers[1], 70, y);
        doc.text(headers[2], 120, y);
        doc.text(headers[3], 160, y);

        y += 5;
        doc.setLineWidth(0.5);
        doc.line(20, y, 190, y);
        y += 10;

        doc.setTextColor(50);
        doc.setFontSize(11);

        // All 6 FIRE Types
        const types = [
            { name: "Coast FIRE", val: fireNumbers.coast, desc: "Invest now, relax later" },
            { name: "Barista FIRE", val: fireNumbers.barista, desc: "Part-time work" },
            { name: "Lean FIRE", val: fireNumbers.lean, desc: "Minimalist living" },
            { name: "Traditional", val: fireNumbers.traditional, desc: "Standard retirement" },
            { name: "Slow FIRE", val: fireNumbers.slow, desc: "Enjoying the journey" },
            { name: "Fat FIRE", val: fireNumbers.fat, desc: "Luxury retirement" },
        ];

        // Helper to calculate years (copied logic from FireContext for standalone report)
        const calculateYears = (target) => {
            const netWorth = parseFloat(data.currentCorpus) || 0;
            if (netWorth >= target) return { years: 0, text: "Done!" };

            const savings = data.annualIncome - data.annualExpenses;
            const r = (parseFloat(data.investmentReturnRate) || 8) / 100;
            const i = (parseFloat(data.inflationRate) || 6) / 100;
            const realReturn = ((1 + r) / (1 + i)) - 1;

            if (savings <= 0) return { years: 999, text: "Impossible" };

            // NPER simplified
            if (Math.abs(realReturn) < 0.001) {
                const years = Math.ceil((target - netWorth) / savings);
                return { years, text: `${years} Years` };
            }

            const numerator = (savings + (target * realReturn));
            const denominator = (savings + (netWorth * realReturn));

            if (denominator <= 0 || numerator / denominator <= 0) return { years: 999, text: "Check Inputs" };

            const years = Math.log(numerator / denominator) / Math.log(1 + realReturn);
            const y = Math.max(0, Math.ceil(years));
            return { years: y, text: `${y} Years` };
        };

        types.forEach(t => {
            const val = t.val || 0;
            doc.text(t.name, 25, y);
            doc.text(`Rs. ${(val / 10000000).toFixed(2)} Cr`, 70, y);

            const result = calculateYears(val);
            doc.text(result.text, 120, y);

            // Freedom Age
            const currentAge = parseInt(data.currentAge) || 25;
            const freedomAge = result.years === 999 ? "Never" : (currentAge + result.years);
            doc.text(`${freedomAge}`, 160, y);

            y += 10;
        });
    }

    // -- FOOTER --
    doc.setTextColor(150);
    doc.setFontSize(9);
    doc.text("Generated by FIRE Tracker. Calculations are personalized estimates for educational purposes only, not financial advice.", 105, 275, { align: 'center' });
    doc.text("If anything in this report is not understood, please briefly go through the website.", 105, 280, { align: 'center' });
    doc.text("Thank you for using our website!", 105, 285, { align: 'center' });

    return doc;
};

// -- EXPORTED FUNCTION 1: Download --
export const generateFireReport = (data, fireNumbers, mode = 'income') => {
    const doc = createReportDoc(data, fireNumbers, mode);
    doc.save("FIRE_Freedom_Plan.pdf");
};

// -- EXPORTED FUNCTION 2: Get Blob (For Sharing) --
export const getFireReportBlob = (data, fireNumbers, mode = 'income') => {
    const doc = createReportDoc(data, fireNumbers, mode);
    return doc.output('blob');
};
