import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingScrollBtn = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleScroll = () => {
        // Find all section IDs
        const sections = ['hero', 'what-is-fire', 'education-section', 'simple-math', 'why-fire', 'fire-types', 'calculator-section', 'faq-section'];

        // Find default current scroll position
        const currentScroll = window.scrollY + 100; // Buffer

        // Find next section
        let nextSectionId = null;
        for (const id of sections) {
            const el = document.getElementById(id);
            if (el && el.offsetTop > currentScroll) {
                nextSectionId = id;
                break;
            }
        }

        if (nextSectionId) {
            document.getElementById(nextSectionId)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Reached bottom? Maybe scroll to top or just stop?
            // Let's scroll to bottom if no section found
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                setIsVisible(false); // Hide at very bottom
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleScroll}
                    className="fixed bottom-8 right-8 z-50 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-colors border-4 border-white hidden md:flex items-center justify-center cursor-pointer"
                    aria-label="Scroll Down"
                >
                    <ChevronDown className="w-6 h-6 animate-bounce" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default FloatingScrollBtn;
