import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Coffee, Home, Clock, Anchor, Briefcase, ArrowRight, Zap, Star, X } from 'lucide-react';
import ScrollArrow from '../UI/ScrollArrow';

const FireTypes = () => {
    const [selectedFireType, setSelectedFireType] = useState(null);

    // Ordered by Savings/Corpus Needed (Ascending)
    const fireTypes = {
        coast: {
            id: 'coast',
            title: "Coast FIRE",
            icon: <Anchor className="w-8 h-8" />,
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
            id: 'barista',
            title: "Barista FIRE",
            icon: <Briefcase className="w-8 h-8" />,
            color: "blue",
            gradient: "from-blue-400 to-indigo-600",
            bgGradient: "from-blue-50 via-indigo-50 to-cyan-50",
            desc: "The Hybrid Path",
            tagline: "Work to Live, Don't Live.",
            detail: "You save enough to cover rent and basics. Then, you quit your high-stress career to work a fun, low-stress job (like a Barista) just for extra cash or health benefits.",
            example: "Aravind quits his 12-hour corporate shift. His investments pay the EMI. He now teaches Guitar 3 hours a day for pocket money and is much happier.",
            corpus: "15x Expenses + Part-time Income"
        },
        lean: {
            id: 'lean',
            title: "Lean FIRE",
            icon: <Coffee className="w-8 h-8" />,
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
            id: 'traditional',
            title: "Traditional FIRE",
            icon: <Home className="w-8 h-8" />,
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
            id: 'slow',
            title: "Slow FIRE",
            icon: <Clock className="w-8 h-8" />,
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
            id: 'fat',
            title: "Fat FIRE",
            icon: <Star className="w-8 h-8" />,
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
        <section className="py-12 relative min-h-screen" id="fire-types">
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

                {/* Grid Layout for Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {Object.values(fireTypes).map((type) => (
                        <motion.button
                            key={type.id}
                            onClick={() => setSelectedFireType(type)}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                                relative overflow-hidden group text-left p-6 rounded-[2rem] border transition-all duration-300 h-full flex flex-col
                                bg-white hover:shadow-2xl hover:border-${type.color}-200 border-slate-100 shadow-sm
                            `}
                        >
                            {/* Colorful Gradient Blob Background */}
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${type.gradient} opacity-10 blur-[40px] rounded-full group-hover:opacity-20 transition-opacity`} />

                            <div className={`
                                w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md
                                bg-gradient-to-br ${type.gradient} text-white
                            `}>
                                {type.icon}
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-2">{type.title}</h3>
                            <p className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">{type.desc}</p>

                            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-slate-500 font-medium group-hover:text-slate-900 transition-colors">
                                Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </motion.button>
                    ))}
                </div>

                <ScrollArrow targetId="calculator-section" />

                {/* Modal for Details */}
                <AnimatePresence>
                    {selectedFireType && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setSelectedFireType(null)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className={`
                                    relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl
                                    bg-gradient-to-br ${selectedFireType.bgGradient} border border-white/50
                                `}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedFireType(null)}
                                    className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-20 backdrop-blur-sm"
                                >
                                    <X className="w-6 h-6 text-slate-600" />
                                </button>

                                {/* Modal Content - Similar to previous Detail View */}
                                <div className="p-8 md:p-10 relative overflow-hidden">
                                    {/* Background Watermark */}
                                    <div className="absolute -bottom-10 -right-10 opacity-[0.07] transform rotate-12 scale-150 pointer-events-none">
                                        {React.cloneElement(selectedFireType.icon, { size: 300, className: `text-black` })}
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/80 backdrop-blur text-${selectedFireType.color}-600 shadow-sm border border-${selectedFireType.color}-100`}>
                                                {selectedFireType.desc}
                                            </div>
                                        </div>

                                        <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                                            {selectedFireType.title}
                                        </h3>
                                        <p className={`text-xl font-medium italic text-${selectedFireType.color}-700 opacity-90 mb-8`}>
                                            "{selectedFireType.tagline}"
                                        </p>

                                        <div className="space-y-6">
                                            <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm">
                                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                    <Zap className="w-4 h-4" /> What is it?
                                                </h4>
                                                <p className="text-lg text-slate-800 leading-relaxed font-medium">
                                                    {selectedFireType.detail}
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
                                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-${selectedFireType.color}-500 blur-[40px] opacity-40`}></div>
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">The Target</h4>
                                                    <div className="text-xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                                        {selectedFireType.corpus}
                                                    </div>
                                                </div>

                                                <div className="bg-white/60 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-sm">
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Real Example</h4>
                                                    <p className="text-slate-700 italic text-sm leading-relaxed">
                                                        "{selectedFireType.example}"
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="pt-6 flex justify-end">
                                                <button
                                                    onClick={() => {
                                                        setSelectedFireType(null);
                                                        document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                    className={`
                                                        group flex items-center gap-3 px-6 py-3 rounded-full font-bold text-lg shadow-xl transition-all transform hover:-translate-y-1
                                                        bg-gradient-to-r ${selectedFireType.gradient} text-white w-full sm:w-auto justify-center
                                                    `}
                                                >
                                                    Calculate {selectedFireType.title}
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default FireTypes;
