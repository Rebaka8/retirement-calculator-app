import React, { useContext } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label
} from 'recharts';
import { useFire } from '../../context/FireContext';

const FireGraph = ({ mode = 'income' }) => {
    const { fireNumbers, data: fireData } = useFire();

    // SAFETY: If missing data, return loading stub
    if (!fireData || !fireNumbers) return <div className="h-[300px] w-full bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">Loading Graph...</div>;

    const currentYear = new Date().getFullYear();
    const dataPoints = [];

    // -- Mode Specific Logic --
    // If 'income' mode: Project Growth based on Savings.
    // If 'goal' mode: Project Growth based on REQUIRED Savings (to show the path).

    let currentCorpus = fireData.currentCorpus || 0;
    let annualSavings = 0;
    let target = 0;

    if (mode === 'income') {
        annualSavings = Math.max(0, (fireData.annualIncome || 0) - (fireData.annualExpenses || 0));
        target = fireNumbers.traditional || 50000000;
    } else {
        // In Goal Mode, use the calculated required savings to show the 'Ideal Path'
        // We need to re-calc locally or pass it down. 
        // For simplicity, let's just show a linear path to the TargetCorpus from the user input.
        target = fireData.targetCorpus || 50000000;

        // Rough calc for graph visualization:
        const years = fireData.yearsToRetire || 15;
        const needed = Math.max(0, target - currentCorpus);
        annualSavings = needed / years; // Simplified linear for graph visual
    }

    const rate = (fireData.investmentReturnRate || 8) / 100;

    // Generate 40 Years
    for (let i = 0; i <= 40; i++) {
        dataPoints.push({
            year: currentYear + i,
            amount: Math.round(currentCorpus),
            formatted: `₹${(currentCorpus / 10000000).toFixed(2)} Cr`
        });
        currentCorpus = (currentCorpus + annualSavings) * (1 + rate);
    }

    const formatY = (val) => {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(0)}Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(0)}L`;
        return val;
    };

    return (
        <div className="h-[400px] w-full bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataPoints} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorSplit" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94beef', fontSize: 12 }} />
                    <YAxis tickFormatter={formatY} axisLine={false} tickLine={false} tick={{ fill: '#94beef', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        formatter={(value) => [`₹${(value / 10000000).toFixed(2)} Cr`, 'Net Worth']}
                    />
                    <Area type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={3} fill="url(#colorSplit)" />

                    {/* Show Target Line */}
                    <ReferenceLine y={target} stroke="#10b981" strokeDasharray="3 3">
                        <Label value="Target Goal" position="insideTopRight" fill="#10b981" fontSize={12} fontWeight="bold" />
                    </ReferenceLine>

                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default FireGraph;
