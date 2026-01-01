import React from 'react';
import ScrollArrow from '../UI/ScrollArrow';

const SimpleMath = () => {
    return (
        <section id="simple-math" className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 shadow-sm text-center max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">How is it calculated?</h3>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-lg">
                        <div className="bg-slate-50 px-6 py-4 rounded-xl border border-slate-100">
                            <span className="block text-sm text-slate-500 font-bold uppercase mb-1">Annual Expenses</span>
                            <span className="text-2xl font-mono font-bold text-slate-800">₹6,00,000</span>
                        </div>
                        <div className="text-slate-300 font-black text-2xl">×</div>
                        <div className="bg-slate-50 px-6 py-4 rounded-xl border border-slate-100 relative">
                            <div className="absolute -top-3 -right-3 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Rule of 25</div>
                            <span className="block text-sm text-slate-500 font-bold uppercase mb-1">Multiplier</span>
                            <span className="text-2xl font-mono font-bold text-blue-600">25</span>
                        </div>
                        <div className="text-slate-300 font-black text-2xl">=</div>
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-5 rounded-2xl shadow-xl shadow-blue-500/20 transform scale-105">
                            <span className="block text-xs text-blue-200 font-bold uppercase mb-1">Your FIRE Number</span>
                            <span className="text-3xl font-mono font-bold">₹1.5 Crore</span>
                        </div>
                    </div>
                    <p className="mt-8 text-slate-500 text-sm">
                        👉 With ₹1.5 Cr invested, you can withdraw ₹6 Lakhs/year safely while the rest keeps growing.
                    </p>
                </div>

                <ScrollArrow targetId="why-fire" />
            </div>
        </section>
    );
};

export default SimpleMath;
