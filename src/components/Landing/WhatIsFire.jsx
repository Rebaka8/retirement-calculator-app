import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Briefcase, Plane, User, Smile, Star } from 'lucide-react';
import ScrollArrow from '../UI/ScrollArrow';

const WhatIsFire = () => {
    return (
        <section id="what-is-fire" className="py-20 bg-white relative overflow-hidden scroll-mt-28">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* 1. HERO DEFINITION & ANIMATION */}
                <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16 mb-12">

                    {/* LEFT: TEXT CONTENT */}
                    <div className="lg:w-1/2 space-y-8 flex flex-col justify-center">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                            >
                                <Zap className="w-3 h-3" /> The Core Concept
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                                What is a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">FIRE Number?</span>
                            </h2>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-blue-500 shadow-sm">
                            <p className="text-xl font-medium text-slate-700 italic">
                                "Your FIRE number is the amount of money that makes working optional."
                            </p>
                        </div>

                        <p className="text-slate-600 text-lg leading-relaxed">
                            It stands for <b>Financial Independence, Retire Early</b>. It's the specific amount you need to invest so you can live off the returns forever, without depending on a 9-to-5 job.
                        </p>

                        {/* ONE LINE DEFINITION CARD (The Bottom Line - Enhanced) */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden group"
                        >
                            {/* Glowing Background Effect */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 blur-[60px] rounded-full group-hover:bg-yellow-500/30 transition-all"></div>

                            <div className="relative z-10 flex gap-5 items-start">
                                <div className="p-3 bg-yellow-400/20 rounded-xl shrink-0 border border-yellow-400/30">
                                    <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                                </div>
                                <div>
                                    <h4 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 uppercase text-sm tracking-widest mb-2">
                                        The Bottom Line
                                    </h4>
                                    <p className="text-lg font-medium leading-relaxed text-slate-200">
                                        It's the money you need so your investments pay for your life, giving you <span className="text-yellow-400 font-bold border-b-2 border-yellow-400/50">Total Freedom</span>.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: ANIMATION (Life Timeline Comparison) */}
                    <div className="lg:w-1/2 w-full">
                        <div className="relative bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-xl overflow-hidden h-full flex flex-col justify-center">
                            <h3 className="text-center font-bold text-slate-800 mb-8 flex items-center justify-center gap-2">
                                <Clock className="w-5 h-5 text-blue-500" /> Impact on Your Life
                            </h3>

                            {/* TIMELINES CONTAINER */}
                            <div className="space-y-12 relative z-10">

                                {/* 1. STANDARD PATH */}
                                <div>
                                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                                        <span>Standard Path</span>
                                        <span>Retire at 60</span>
                                    </div>
                                    <div className="h-4 bg-slate-200 rounded-full relative overflow-hidden flex">
                                        {/* Work Phase */}
                                        <motion.div
                                            initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-slate-400 flex items-center justify-center"
                                        >
                                            <Briefcase className="w-3 h-3 text-white/50" />
                                        </motion.div>
                                        {/* Free Phase */}
                                        <motion.div
                                            initial={{ width: 0 }} whileInView={{ width: '15%' }} transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                            className="h-full bg-slate-300"
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                                        <span>Age 20</span>
                                        <span>Age 60</span>
                                        <span>Age 80</span>
                                    </div>
                                </div>

                                {/* 2. FIRE PATH */}
                                <div className="relative">
                                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
                                        <span className="text-emerald-600">FIRE Path</span>
                                        <span className="text-emerald-600">Free at 40!</span>
                                    </div>
                                    <div className="h-6 bg-slate-200 rounded-full relative overflow-hidden flex shadow-inner">
                                        {/* Work Phase (Short) */}
                                        <motion.div
                                            initial={{ width: 0 }} whileInView={{ width: '40%' }} transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-blue-500 relative"
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                        </motion.div>

                                        {/* Freedom Phase (Long) */}
                                        <motion.div
                                            initial={{ width: 0 }} whileInView={{ width: '60%' }} transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center relative"
                                        >
                                            {/* Joy Icons */}
                                            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 2.3 }} className="absolute left-4">
                                                <Plane className="w-4 h-4 text-white" />
                                            </motion.div>
                                            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 2.5 }} className="absolute left-16">
                                                <User className="w-4 h-4 text-white" />
                                            </motion.div>
                                            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 2.7 }} className="absolute right-4">
                                                <Smile className="w-4 h-4 text-white" />
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                    {/* Callout */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }}
                                        className="absolute top-10 left-[40%] text-center transform -translate-x-1/2"
                                    >
                                        <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-lg border border-emerald-200 shadow-sm whitespace-nowrap">
                                            🎉 20 Extra Years of Life!
                                        </div>
                                        <div className="w-0.5 h-3 bg-emerald-200 mx-auto"></div>
                                    </motion.div>

                                    <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
                                        <span>Age 20</span>
                                        <strong className="text-emerald-600">Age 40</strong>
                                        <span>Age 80</span>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-12 text-center">
                                <p className="text-xs text-slate-400 italic">
                                    "Money buys you the most precious resource of all: <span className="font-bold text-slate-600">Time</span>."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <ScrollArrow targetId="simple-math" />
            </div>
        </section>
    );
};

export default WhatIsFire;
