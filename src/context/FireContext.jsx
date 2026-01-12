import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const FireContext = createContext();

export const useFire = () => useContext(FireContext);

const INITIAL_DATA = {
    age: 30,
    currentCorpus: 0, // Using currentCorpus instead of currentNetWorth for consistency
    annualIncome: 1500000,
    annualExpenses: 800000,
    investmentReturnRate: 6.0, // percentage
    inflationRate: 3.0, // percentage
    targetCorpus: 50000000, // 5 Cr default for Goal Mode
    yearsToRetire: 15 // for Goal Mode
};

export const FireProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        // 1. Check URL Params (Permalink)
        const params = new URLSearchParams(window.location.search);
        if (params.has('inc')) {
            return {
                age: Number(params.get('age')) || 30,
                currentCorpus: Number(params.get('cur')) || 0,
                annualIncome: Number(params.get('inc')) || 0,
                annualExpenses: Number(params.get('exp')) || 0,
                investmentReturnRate: Number(params.get('ret')) || 6.0,
                inflationRate: Number(params.get('inf')) || 3.0,
                targetCorpus: Number(params.get('tar')) || 50000000,
                yearsToRetire: Number(params.get('yrs')) || 15
            };
        }

        // 2. Local Storage
        const saved = localStorage.getItem('fire_data');
        return saved ? JSON.parse(saved) : INITIAL_DATA;
    });

    const fireNumbers = useMemo(() => {
        const expenses = parseFloat(data.annualExpenses) || 0;

        // Multipliers based on User Definitions
        const traditionalFire = expenses * 25;       // Standard 4% rule
        const leanFire = expenses * 12.5;            // 8% withdrawal (50% expenses)
        const fatFire = expenses * 50;               // 2% withdrawal (Luxury)
        const baristaFire = expenses * 12.5;         // Same as Lean (Part-time covers rest)
        const slowFire = expenses * 33.33;           // 3% withdrawal (Conservative)

        // Coast FIRE: Amount needed NOW to hit Traditional FIRE by 60 without further saving
        const currentAgeVal = parseFloat(data.currentAge) || 30; // Changed to currentAge as per recent naming
        const yearsTo60 = Math.max(0, 60 - currentAgeVal);

        // Use Real Rate for Coasting calculation ?? Or Nominal?
        // Standard Coast FIRE usually uses Nominal Rate assumption for compounding (e.g. 8% growth)
        // User example used 1.08 assuming 8%. Let's use user's investmentReturnRate (nominal).
        const rate = (parseFloat(data.investmentReturnRate) || 6) / 100;
        const coastFire = traditionalFire / Math.pow(1 + rate, yearsTo60);

        return {
            lean: leanFire,
            fat: fatFire,
            barista: baristaFire,
            coast: coastFire,
            slow: slowFire,
            traditional: traditionalFire
        };
    }, [data]);

    const updateData = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        localStorage.setItem('fire_data', JSON.stringify(data));
    }, [data]);

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

        const returnRate = (parseFloat(currentData.investmentReturnRate) || 6) / 100;
        // We use nominal return for corpus growth usually, but inflation adjusts the Target. 
        // For simplicity in this display, let's use Real Return to see "Purchasing Power" parity years.
        const inflation = (parseFloat(currentData.inflationRate) || 3) / 100;
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

        const r = (parseFloat(data.investmentReturnRate) || 6) / 100;
        const i = (parseFloat(data.inflationRate) || 3) / 100;
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
