import React, { createContext, useContext, useState, useEffect } from 'react';

const FireContext = createContext();

export const useFire = () => useContext(FireContext);

const INITIAL_DATA = {
    age: 30,
    currentCorpus: 0, // Using currentCorpus instead of currentNetWorth for consistency
    annualIncome: 1500000,
    annualExpenses: 800000,
    investmentReturnRate: 10.0, // percentage
    inflationRate: 6.0, // percentage
    targetCorpus: 50000000, // 5 Cr default for Goal Mode
    yearsToRetire: 15 // for Goal Mode
};

export const FireProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem('fire_data');
        return saved ? JSON.parse(saved) : INITIAL_DATA;
    });

    const [fireNumbers, setFireNumbers] = useState({});

    useEffect(() => {
        localStorage.setItem('fire_data', JSON.stringify(data));
        calculateAllFire(data);
    }, [data]);

    const updateData = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    const calculateAllFire = (input) => {
        const expenses = parseFloat(input.annualExpenses) || 0;
        // Standard Withdrawal Rate of 4% usually implies 25x expenses
        const multiplier = 25;

        // 1. Traditional FIRE
        const normalFire = expenses * multiplier;

        // 2. Lean FIRE (Expenses ~70% of normal)
        const leanFire = (expenses * 0.7) * multiplier;

        // 3. Fat FIRE (Expenses ~200% of normal)
        const fatExpenses = expenses * 2;
        const fatFire = fatExpenses * multiplier;

        // 4. Barista FIRE (Need 50% corpus, side job covers rest)
        const baristaFire = normalFire * 0.5;

        // 5. Coast FIRE
        // Corpus needed NOW to grow to NormalFire in (60 - Age) years
        // Formula: Target / (1 + r)^n
        const yearsTo60 = Math.max(0, 60 - (input.age || 30));
        // Real rate = Return - Inflation (approx)
        const realRate = (input.investmentReturnRate - input.inflationRate) / 100;
        const effectiveRate = realRate > 0 ? realRate : 0.001; // Avoid divide by zero

        const coastFire = normalFire / Math.pow(1 + effectiveRate, yearsTo60);

        // 6. Slow FIRE
        // Same target, just slower index. We'll use the Normal Target.
        const slowFire = normalFire;

        setFireNumbers({
            lean: leanFire,
            fat: fatFire,
            barista: baristaFire,
            coast: coastFire,
            slow: slowFire,
            traditional: normalFire
        });
    };

    const calculateYearsToTarget = (target, currentData, savingsOverride = null) => {
        if (!currentData || !target) return '∞';
        const netWorth = parseFloat(currentData.currentCorpus) || 0;

        // Determine Annual Savings
        let savings;
        if (savingsOverride !== null) {
            savings = parseFloat(savingsOverride);
        } else {
            const annualIncome = parseFloat(currentData.annualIncome) || 0;
            const annualExpenses = parseFloat(currentData.annualExpenses) || 0;
            savings = annualIncome - annualExpenses;
        }

        const returnRate = (parseFloat(currentData.investmentReturnRate) || 8) / 100;
        // We use nominal return for corpus growth usually, but inflation adjusts the Target. 
        // For simplicity in this display, let's use Real Return to see "Purchasing Power" parity years.
        const inflation = (parseFloat(currentData.inflationRate) || 6) / 100;
        const realReturn = ((1 + returnRate) / (1 + inflation)) - 1;

        if (savings <= 0 && netWorth < target) return '∞'; // Changed condition to allow coasting if NetWorth > Target
        if (netWorth >= target) return '0';

        // NPER logic
        // n = ln((PMT + PV*r) / (PMT - FV*r)) / ln(1+r) ? 
        // Simplified: Time to reach Target with monthly contributions + initial seed
        // We treat 'savings' as annual contribution (PMT)
        // FV = Target. PV = NetWorth.

        // Using Real Return avoids adjusting Target for inflation every year in loop
        if (Math.abs(realReturn) < 0.001) {
            // Avoid divide by zero if return is 0
            if (savings <= 0) return '∞';
            return Math.ceil((target - netWorth) / savings);
        }

        const numerator = (savings + (target * realReturn));
        const denominator = (savings + (netWorth * realReturn));

        if (denominator <= 0) return '∞'; // Should not happen if saving > 0 or networth sufficient

        // T = ln( (Target * r + c) / (Current * r + c) ) / ln(1+r)
        // Where c = annual savings

        // If numerator/denominator is negative, math.log implies unreachable with current parameters
        if (numerator / denominator <= 0) return '∞';

        const years = Math.log(numerator / denominator) / Math.log(1 + realReturn);
        return Math.max(0, Math.ceil(years));
    };

    // NEW: For Goal Mode (Reverse Calculator)
    // Returns: { monthlySavings, requiredIncome }
    const calculateRequiredSavings = () => {
        const target = parseFloat(data.targetCorpus) || 0;
        const years = parseFloat(data.yearsToRetire) || 15;
        const current = parseFloat(data.currentCorpus) || 0;

        const r = (parseFloat(data.investmentReturnRate) || 10) / 100;
        const i = (parseFloat(data.inflationRate) || 6) / 100;
        const realRate = ((1 + r) / (1 + i)) - 1; // Real Rate

        // FV formula: FV = PV*(1+r)^n + PMT * [((1+r)^n - 1) / r]
        // We need PMT.
        // PMT = (FV - PV*(1+r)^n) * r / ((1+r)^n - 1)

        if (years <= 0) return { monthlySavings: 0, requiredIncome: 0 };

        const growthFactor = Math.pow(1 + realRate, years);
        const futureValueCurrent = current * growthFactor;

        let remainingTarget = target - futureValueCurrent;
        if (remainingTarget <= 0) return { monthlySavings: 0, requiredIncome: 0 };

        // Annual Savings Needed
        let annualSavings = 0;
        if (Math.abs(realRate) < 0.001) {
            annualSavings = remainingTarget / years;
        } else {
            annualSavings = (remainingTarget * realRate) / (growthFactor - 1);
        }

        // If we assume a generic 30% savings rate (or make it 50% for aggressive FIRE)
        // Required Income = Annual Savings / 0.3
        const assumedSavingsRate = 0.4; // 40% savings rate is a good aggressive baseline
        const requiredIncome = annualSavings / assumedSavingsRate;

        return {
            monthlySavings: Math.round(annualSavings / 12),
            requiredAnnualIncome: Math.round(requiredIncome)
        };
    };

    const resetData = () => {
        setData(INITIAL_DATA);
        localStorage.removeItem('fire_data');
    };

    return (
        <FireContext.Provider value={{
            data,
            fireNumbers,
            updateData,
            resetData,
            calculateYearsToTarget,
            calculateRequiredSavings
        }}>
            {children}
        </FireContext.Provider>
    );
};
