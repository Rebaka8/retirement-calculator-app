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
        const COAST_TARGET_AGE = 60;
        const IMPOSSIBLE = Number.POSITIVE_INFINITY;
        // const LOW_REAL_RETURN_THRESHOLD = 0.005; // Could be used for UI validation

        // Calculate Real Return for Coast FIRE logic validity
        const r = (parseFloat(data.investmentReturnRate) || 6) / 100;
        const i = (parseFloat(data.inflationRate) || 3) / 100;
        const realReturn = ((1 + r) / (1 + i)) - 1;

        // Multipliers based on Industry Standards & User Feedback
        const traditionalFire = expenses * 25;       // Standard 25x (4% rule)
        const leanFire = expenses * 20;              // 25x of 80% expenses (More frugal)
        const fatFire = expenses * 50;               // 50x expenses (2% withdrawal for luxury)
        const baristaFire = expenses * 15;           // 25x of 60% expenses (Assumes side gig covers 40%)

        // Coast FIRE: Amount needed TODAY to grow to Traditional FIRE by Age 60 without further contribution
        let coastFire;
        if (realReturn <= 0) {
            coastFire = IMPOSSIBLE;
        } else {
            const currentAge = parseFloat(data.currentAge) || 25; // Default age if missing
            const yearsToGrow = Math.max(0, COAST_TARGET_AGE - currentAge);
            coastFire = traditionalFire / Math.pow(1 + realReturn, yearsToGrow);
        }

        // Slow FIRE: Target is same as traditional, but implemented via verifying path with lower savings rate
        const slowFire = traditionalFire;

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

        // Check if goal is reachable
        // 1. If we are already there
        if (netWorth >= target) return '0';

        // 2. If savings are negative/zero AND we don't have enough growth from corpus to overcome it
        // If savings is 0, we can still reach target if realReturn > 0 and netWorth > 0
        if (savings <= 0) {
            if (realReturn <= 0) return '∞'; // No growth, no savings -> Never reach
            if (netWorth <= 0) return '∞';  // No corpus, no savings -> Never reach
            // If netWorth * realReturn + savings < 0, we are losing money faster than growing
            if ((netWorth * realReturn) + savings <= 0) return '∞';
        }

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
