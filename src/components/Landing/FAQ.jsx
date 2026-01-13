import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
    // FAQ Data
    const faqs = [
        {
            q: "Is FIRE realistic for normal incomes?",
            a: "Yes. FIRE is about the *gap* between income and expenses. If you earn ₹50k and spend ₹25k (50% savings rate), you can retire in ~16 years. High income helps, but low spending is the superpower."
        },
        {
            q: "What about high inflation in India?",
            a: "Our calculator defaults to 3% real return (7-10% return minus inflation). This 'Real Return' math automatically accounts for purchasing power dropping over time."
        },
        {
            q: "Is this safe? Will I run out of money?",
            a: "The 4% Rule (25x Corpus) is designed to last 30+ years with 95% success rate. For extra safety (40-50 years), many aim for 30x expenses or a 3.3% withdrawal rate."
        },
        {
            q: "Do I actually have to retire early?",
            a: "No! FIRE is about 'Financial Independence'. Work because you want to, not because you have to. Most people reach FI and then start their dream business or work part-time."
        },
        {
            q: "Why does investing early matter so much?",
            a: "Compound interest needs *time*. Investing ₹10k/month starting at age 25 can grow to ₹3.2 Cr by 50. Starting at 35? You'd need to invest ₹30k/month to reach the same goal."
        }
    ];

    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <section id="faq-section" className="py-12 md:py-20 bg-slate-50 border-t border-slate-200 scroll-mt-28">
            <div className="max-w-3xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Doubts?</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex justify-between items-center p-4 md:p-6 text-left hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-bold text-slate-800">{faq.q}</span>
                                {openFaq === index ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                            </button>
                            <AnimatePresence>
                                {openFaq === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-4 md:p-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
