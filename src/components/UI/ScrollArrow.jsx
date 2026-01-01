import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ScrollArrow = ({ targetId }) => {
    const handleScroll = () => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex justify-center mt-4 pb-2 relative z-20">
            <motion.button
                onClick={handleScroll}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors group cursor-pointer"
            >
                <div className="p-3 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-white group-hover:shadow-md transition-all">
                    <ChevronDown className="w-5 h-5" />
                </div>
            </motion.button>
        </div>
    );
};

export default ScrollArrow;
