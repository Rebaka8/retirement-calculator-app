import React from 'react';
import { TrendingUp, Shield, Clock } from 'lucide-react';
import ScrollArrow from '../UI/ScrollArrow';

const SimpleTruths = () => {
    return (
        <section id="simple-truths" className="py-12 bg-white scroll-mt-28">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mt-2">The Simple Truths of FIRE</h2>
                    </div>

                    {/* Mobile Scroll Hint */}
                    <div className="md:hidden text-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
                        Swipe to explore &rarr;
                    </div>

                    <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
                        {/* Concept 1 */}
                        <div className="min-w-[85vw] md:min-w-0 snap-center bg-slate-50 p-8 rounded-3xl hover:shadow-lg transition-all group border border-slate-100 md:border-transparent">
                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Expenses {'>'} Income</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Earning more is good. Spending less is <span className="font-bold text-rose-500">better</span>. Every ₹10k you cut from monthly expenses reduces your required Freedom Number by ₹30 Lakhs!
                            </p>
                        </div>

                        {/* Concept 2 */}
                        <div className="min-w-[85vw] md:min-w-0 snap-center bg-slate-50 p-8 rounded-3xl hover:shadow-lg transition-all group border border-slate-100 md:border-transparent">
                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Time is the Secret Ingredient</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Money doubles roughly every 7-10 years. The earlier you plant the seed, the bigger the tree. Changing your start date by 5 years changes the result by Crores.
                            </p>
                        </div>

                        {/* Concept 3 */}
                        <div className="min-w-[85vw] md:min-w-0 snap-center bg-slate-50 p-8 rounded-3xl hover:shadow-lg transition-all group border border-slate-100 md:border-transparent">
                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Safety in Numbers</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                FIRE isn't gambling. It's based on the "Trinity Study". Having 25x your expenses invested allows you to weather market crashes and inflation safely.
                            </p>
                        </div>
                    </div>
                </div>

                <ScrollArrow targetId="real-life-impacts" />
            </div>
        </section>
    );
};

export default SimpleTruths;
