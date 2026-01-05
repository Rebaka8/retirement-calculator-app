import React from 'react';
import { Heart } from 'lucide-react';
import ScrollArrow from '../UI/ScrollArrow';

const RealLifeImpacts = () => {
    return (
        <section id="real-life-impacts" className="py-12 bg-white scroll-mt-28">
            <div className="max-w-7xl mx-auto px-6">
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

                <ScrollArrow targetId="faq-section" />
            </div>
        </section>
    );
};

export default RealLifeImpacts;
