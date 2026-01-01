import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Flame } from 'lucide-react';
import ScrollArrow from '../UI/ScrollArrow';

const Hero = ({ onScrollToCalculator }) => {
    return (
        <div className="relative pt-20 pb-32 flex flex-col items-center justify-center min-h-[90vh] overflow-hidden text-center px-4">

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto space-y-8 relative z-10">

                {/* New Quote Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mb-8"
                >
                    <p className="text-xl md:text-2xl font-serif italic text-slate-500 font-light leading-relaxed">
                        "Every reality begins as a dream. <br className="md:hidden" /> Let yourself imagine the impossible."
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs uppercase tracking-wider mb-6">
                        <Flame className="w-4 h-4 fill-blue-600" />
                        <span>Financial Independence Retire Early</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                        Design Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Freedom.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                        Stop guessing. Start planning. Find your number, track your path, and unlock the life you were meant to live.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                    <button
                        onClick={onScrollToCalculator}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 flex items-center gap-2 group text-lg"
                    >
                        Calculate My Number
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={() => document.getElementById('fire-types')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-full border border-slate-200 transition-all hover:shadow-lg flex items-center gap-2 text-lg"
                    >
                        Explore FIRE Types
                    </button>
                </motion.div>
            </div>

            <div className="absolute bottom-4 left-0 w-full">
                <ScrollArrow targetId="what-is-fire" />
            </div>
        </div>
    );
};

export default Hero;
