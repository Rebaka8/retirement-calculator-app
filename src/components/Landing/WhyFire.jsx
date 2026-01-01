import React from 'react';
import { Target, Search } from 'lucide-react';
import ScrollArrow from '../UI/ScrollArrow';

const WhyFire = () => {
    return (
        <section id="why-fire" className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Mobile Scroll Hint */}
                <div className="md:hidden text-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
                    Swipe to compare &rarr;
                </div>

                <div className="flex md:grid md:grid-cols-2 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
                    {/* WHY CARD */}
                    <div className="min-w-[85vw] md:min-w-0 snap-center bg-slate-50 p-8 lg:p-10 rounded-3xl hover:bg-white transition-colors border border-transparent hover:border-slate-200 hover:shadow-lg group border-slate-100 md:border-transparent">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-rose-100 text-rose-600 rounded-xl group-hover:scale-110 transition-transform">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Why use it?</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-2.5 shrink-0"></div>
                                <div>
                                    <strong className="text-slate-800 block">Clear & Measurable Goal</strong>
                                    <span className="bg-yellow-50 text-slate-800 italic px-2 py-1 rounded border border-yellow-100 text-sm font-medium mt-1 block shadow-sm">
                                        Turns "I want to be rich" into "I need ₹1.5 Cr". Actionable.
                                    </span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-2.5 shrink-0"></div>
                                <div>
                                    <strong className="text-slate-800 block">Power of Savings</strong>
                                    <span className="bg-yellow-50 text-slate-800 italic px-2 py-1 rounded border border-yellow-100 text-sm font-medium mt-1 block shadow-sm">
                                        Shows how cutting small expenses can save you years of work.
                                    </span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-rose-400 rounded-full mt-2.5 shrink-0"></div>
                                <div>
                                    <strong className="text-slate-800 block">Removes Fear</strong>
                                    <span className="bg-yellow-50 text-slate-800 italic px-2 py-1 rounded border border-yellow-100 text-sm font-medium mt-1 block shadow-sm">
                                        Knowing your number kills anxiety about old age or job loss.
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* WHERE CARD */}
                    <div className="min-w-[85vw] md:min-w-0 snap-center bg-slate-50 p-8 lg:p-10 rounded-3xl hover:bg-white transition-colors border border-transparent hover:border-slate-200 hover:shadow-lg group border-slate-100 md:border-transparent">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform">
                                <Search className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">Where is it used?</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 shrink-0"></div>
                                <div>
                                    <strong className="text-slate-800 block">Personal Planning</strong>
                                    <span className="bg-blue-50 text-slate-800 italic px-2 py-1 rounded border border-blue-100 text-sm font-medium mt-1 block shadow-sm">
                                        Retirement, Savings Targets, Investment tracking.
                                    </span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 shrink-0"></div>
                                <div>
                                    <strong className="text-slate-800 block">Calculators & Apps</strong>
                                    <span className="bg-blue-50 text-slate-800 italic px-2 py-1 rounded border border-blue-100 text-sm font-medium mt-1 block shadow-sm">
                                        Tools (like this one!) to visualize Lean, Fat, and Coast FIRE.
                                    </span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 shrink-0"></div>
                                <div>
                                    <strong className="text-slate-800 block">Career Decisions</strong>
                                    <span className="bg-blue-50 text-slate-800 italic px-2 py-1 rounded border border-blue-100 text-sm font-medium mt-1 block shadow-sm">
                                        People use it to take risks, start businesses, or switch careers.
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <ScrollArrow targetId="fire-types" />
            </div>
        </section>
    );
};

export default WhyFire;
