import React from 'react';
import { TrendingUp, Shield, Clock, Heart } from 'lucide-react';
import ScrollArrow from '../UI/ScrollArrow';

const Education = () => {
    return (
        <section id="education-section" className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* 1. SIMPLE FIRE EDUCATION (Light Cards) */}
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

                {/* 2. REAL LIFE IMPACT */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 text-center">
                    <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
                    <h3 className="text-3xl font-bold text-slate-900 mb-8">Real-Life Impact: Why You Should Care</h3>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <div className="bg-white p-6 rounded-xl shadow-md flex-1">
                            <p className="text-lg text-slate-700 italic">"If I save 50%, I can retire <span className="text-blue-600 font-bold">10 years earlier</span>."</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md flex-1">
                            <p className="text-lg text-slate-700 italic">"Starting early matters <span className="text-blue-600 font-bold">more</span> than earning more."</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md flex-1">
                            <p className="text-lg text-slate-700 italic">"Small expense cuts = <span className="text-blue-600 font-bold">Huge Impact</span> on your Freedom Date."</p>
                        </div>
                    </div>
                </div>

                <ScrollArrow targetId="simple-math" />
            </div>
        </section>
    );
};

export default Education;
