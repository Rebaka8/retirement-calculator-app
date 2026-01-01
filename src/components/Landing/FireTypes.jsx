import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Coffee, Home, Clock, Anchor, Briefcase, ArrowRight, Zap, Star } from 'lucide-react';
import ScrollArrow from '../UI/ScrollArrow';

const FireTypes = () => {
    // Set 'coast' as default (The lowest entry point)
    const [activeTab, setActiveTab] = useState('coast');

    // Ordered by Savings/Corpus Needed (Ascending)
    // 1. Coast (Save small lump sum, let it grow)
    // 2. Barista (Save partial corpus, keep working)
    // 3. Lean (Save full minimalist corpus)
    // 4. Traditional (Save full standard corpus)
    // 5. Slow (Save standard corpus + buffer time)
    // 6. Fat (Save massive luxury corpus)
    const fireTypes = {
        coast: {
            title: "Coast FIRE",
            icon: <Anchor className="w-6 h-6" />,
            color: "purple",
            gradient: "from-purple-400 to-fuchsia-600",
            bgGradient: "from-purple-50 via-pink-50 to-rose-50",
            desc: "The Front-Loaded Path",
            tagline: "Save Now, Chill Later.",
            detail: "You crush your savings in your 20s. Once you hit a 'magic number', you never have to save another rupee. You just work to spend, while your nest egg grows in the background.",
            example: "Kabir saves ₹50 Lakhs by age 28. He stops investing. He blows his entire salary on parties and trips from age 29-60 because that ₹50L will grow to ₹5 Cr naturally.",
            corpus: "Specific Lump Sum Today"
        },
        barista: {
            title: "Barista FIRE",
            icon: <Briefcase className="w-6 h-6" />,
            color: "blue",
            gradient: "from-blue-400 to-indigo-600",
            bgGradient: "from-blue-50 via-indigo-50 to-cyan-50",
            desc: "The Hybrid Path",
            tagline: "Work to Live, Don't Live to Work.",
            detail: "You save enough to cover rent and basics. Then, you quit your high-stress career to work a fun, low-stress job (like a Barista) just for extra cash or health benefits.",
            example: "Aravind quits his 12-hour corporate shift. His investments pay the EMI. He now teaches Guitar 3 hours a day for pocket money and is much happier.",
            corpus: "15x Expenses + Part-time Income"
        },
        lean: {
            title: "Lean FIRE",
            icon: <Coffee className="w-6 h-6" />,
            color: "emerald",
            gradient: "from-emerald-400 to-green-600",
            bgGradient: "from-emerald-50 via-green-50 to-teal-50",
            desc: "The Minimalist Path",
            tagline: "Simplicity is Freedom.",
            detail: "For those who value time over stuff. You optimize expenses, live frugally, and need a much smaller pot of money to be free. It's the fastest route to quitting the rat race.",
            example: "Priya spends ₹30k/month. She rides a bike, cooks home meals, and enjoys free hobbies like hiking. She only needs ₹1 Crore to retire decades early.",
            corpus: "15x - 20x Annual Expenses"
        },
        traditional: {
            title: "Traditional FIRE",
            icon: <Home className="w-6 h-6" />,
            color: "indigo",
            gradient: "from-indigo-400 to-purple-600",
            bgGradient: "from-indigo-50 via-purple-50 to-violet-50",
            desc: "The Standard Path",
            tagline: "Middle-Class Retirement, Early.",
            detail: "The classic approach. You maintain your current standard of living—same house, same car, same vacations—but you stop working at 45 instead of 60.",
            example: "The Verma Family needs ₹12L/year. They save hard, reach ₹3 Crores, and maintain their comfortable lifestyle forever without a paycheck.",
            corpus: "25x Annual Expenses"
        },
        slow: {
            title: "Slow FIRE",
            icon: <Clock className="w-6 h-6" />,
            color: "teal",
            gradient: "from-teal-400 to-cyan-600",
            bgGradient: "from-teal-50 via-cyan-50 to-sky-50",
            desc: "The Balanced Path",
            tagline: "Enjoy the Journey.",
            detail: "Why race to the finish line miserable? You save responsibly but take 'mini-retirements' along the way. You might reach FI at 55 instead of 40, but you lived fully every year.",
            example: "Neha takes a 6-month sabbatical every 3 years to travel. She works 4 days a week. She will retire later, but she is never burnt out.",
            corpus: "25x - 30x Annual Expenses"
        },
        fat: {
            title: "Fat FIRE",
            icon: <Star className="w-6 h-6" />,
            color: "yellow", // Gold/Luxury
            gradient: "from-yellow-400 to-amber-600",
            bgGradient: "from-yellow-50 via-amber-50 to-orange-50",
            desc: "The Luxurious Path",
            tagline: "Live Rich. Retire Rich.",
            detail: "The ultimate freedom. No compromises. Business class travel, fine dining, and zero budget constraints. You retire with MORE money than you spent while working.",
            example: "Rohan spends ₹3 Lakhs/month. He retires at 45 but vacations in Europe twice a year. He builds a massive ₹10 Crore corpus so he never says 'no' to anything.",
            corpus: "50x+ Annual Expenses"
        }
    };

    return (
        <section className="py-12 relative" id="fire-types">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header with Visual Pop */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="inline-block"
                    >
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg shadow-blue-500/30">
                            Find Your Tribe
                        </span>
                    </motion.div>
                    <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mt-6 tracking-tight">
                        Which <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">FIRE</span> burns in you?
                    </h2>
                    <p className="text-slate-600 mt-4 text-xl max-w-2xl mx-auto font-medium">
                        Don't just chase a number. Choose a lifestyle.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Sidebar Buttons (Glassmorphic) */}
                    <div className="lg:w-1/3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4 w-full">
                        {Object.entries(fireTypes).map(([key, type]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`
                                    group relative overflow-hidden text-left px-6 py-5 rounded-2xl transition-all duration-300 flex items-center gap-4 border
                                    ${activeTab === key
                                        ? 'bg-white border-white/50 shadow-xl scale-105 z-10 ring-1 ring-slate-100'
                                        : 'bg-white/60 border-white/20 hover:bg-white hover:shadow-md text-slate-500'}
                                `}
                            >
                                {/* Active Indicator Bar */}
                                {activeTab === key && (
                                    <motion.div
                                        layoutId="active-marker"
                                        className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${type.gradient}`}
                                    />
                                )}

                                <div className={`
                                    p-3 rounded-xl shrink-0 transition-colors shadow-sm
                                    ${activeTab === key ? `bg-gradient-to-br ${type.gradient} text-white` : 'bg-slate-100 text-slate-400 group-hover:scale-110 duration-300'}
                                `}>
                                    {type.icon}
                                </div>
                                <div className="flex-1">
                                    <span className={`block font-bold text-base md:text-lg leading-tight ${activeTab === key ? 'text-slate-900' : 'text-slate-600'}`}>
                                        {type.title}
                                    </span>
                                    <span className={`text-xs font-semibold uppercase tracking-wider ${activeTab === key ? `text-${type.color}-600` : 'text-slate-400'}`}>
                                        {type.desc}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Main Content Card (Glass + Gradient) */}
                    <div className="lg:w-2/3 w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className={`
                                    relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-white/50
                                    bg-gradient-to-br ${fireTypes[activeTab].bgGradient}
                                `}
                            >
                                {/* Background Watermark Icon */}
                                <div className="absolute -bottom-10 -right-10 opacity-[0.07] transform rotate-12 scale-150">
                                    {React.cloneElement(fireTypes[activeTab].icon, { size: 400, className: `text-black` })}
                                </div>

                                <div className="relative z-10">
                                    {/* Header Section */}
                                    <div className="flex items-start justify-between mb-8">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/80 backdrop-blur text-${fireTypes[activeTab].color}-600 shadow-sm border border-${fireTypes[activeTab].color}-100`}>
                                                    {fireTypes[activeTab].desc}
                                                </div>
                                            </div>
                                            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
                                                {fireTypes[activeTab].title}
                                            </h3>
                                            <p className={`text-xl font-medium italic text-${fireTypes[activeTab].color}-700 opacity-90`}>
                                                "{fireTypes[activeTab].tagline}"
                                            </p>
                                        </div>
                                        <div className={`hidden md:flex p-4 rounded-2xl bg-white/80 backdrop-blur shadow-lg text-${fireTypes[activeTab].color}-500 transform rotate-3`}>
                                            {React.cloneElement(fireTypes[activeTab].icon, { size: 48 })}
                                        </div>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="space-y-8">

                                        {/* Description */}
                                        <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm">
                                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <Zap className="w-4 h-4" /> What is it?
                                            </h4>
                                            <p className="text-lg md:text-xl text-slate-800 leading-relaxed font-medium">
                                                {fireTypes[activeTab].detail}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Target Card */}
                                            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden group">
                                                <div className={`absolute top-0 right-0 w-32 h-32 bg-${fireTypes[activeTab].color}-500 blur-[50px] opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">The Target</h4>
                                                <div className="text-lg md:text-2xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 break-words leading-tight">
                                                    {fireTypes[activeTab].corpus}
                                                </div>
                                            </div>

                                            {/* Example Card */}
                                            <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Real Example</h4>
                                                <p className="text-slate-700 italic leading-relaxed text-sm">
                                                    "{fireTypes[activeTab].example}"
                                                </p>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="pt-8 flex justify-end">
                                            <button
                                                onClick={() => document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' })}
                                                className={`
                                                    group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all transform hover:-translate-y-1
                                                    bg-gradient-to-r ${fireTypes[activeTab].gradient} text-white
                                                `}
                                            >
                                                Calculate {fireTypes[activeTab].title}
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
                <ScrollArrow targetId="calculator-section" />
            </div>
        </section>
    );
};

export default FireTypes;
