import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Lock, Unlock, ArrowRight } from 'lucide-react';

const PinEntry = ({ mode, onSuccess }) => {
    const { setAppPin, verifyPin } = useAuth();
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const [confirmPin, setConfirmPin] = useState(null); // For setup mode specific step
    const [rememberMe, setRememberMe] = useState(false);

    const handlePadClick = (num) => {
        if (input.length < 6) {
            setInput(prev => prev + num);
            setError('');
        }
    };

    const handleClear = () => {
        setInput('');
        setError('');
    };

    const handleSubmit = () => {
        if (input.length < 4) {
            setError('PIN must be at least 4 digits');
            return;
        }

        if (mode === 'setup') {
            if (!confirmPin) {
                setConfirmPin(input);
                setInput('');
            } else {
                if (input === confirmPin) {
                    setAppPin(input, rememberMe);
                    if (onSuccess) onSuccess();
                } else {
                    setError('PINs do not match. Try again.');
                    setConfirmPin(null);
                    setInput('');
                }
            }
        } else {
            // Verify mode
            const isValid = verifyPin(input);
            if (isValid) {
                if (onSuccess) onSuccess();
            } else {
                setError('Incorrect PIN');
                setInput('');
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key >= '0' && e.key <= '9') {
                handlePadClick(e.key);
            } else if (e.key === 'Backspace') {
                setInput(prev => prev.slice(0, -1));
            } else if (e.key === 'Enter') {
                handleSubmit();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [input, mode, confirmPin]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl w-full max-w-sm border border-white/10"
            >
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-white/20 rounded-full">
                        {mode === 'setup' ? <Lock className="w-8 h-8 text-blue-300" /> : <Unlock className="w-8 h-8 text-emerald-300" />}
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-2">
                    {mode === 'setup'
                        ? (confirmPin ? 'Confirm your PIN' : 'Create a PIN')
                        : 'Welcome Back'}
                </h2>
                <p className="text-center text-slate-300 mb-8 text-sm">
                    {mode === 'setup'
                        ? 'Secure your financial future.'
                        : 'Enter your PIN to access your dashboard.'}
                </p>

                {/* PIN Dots Display */}
                <div className="flex justify-center gap-4 mb-8">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-4 h-4 rounded-full transition-all duration-300 ${i < input.length
                                ? 'bg-gradient-to-r from-blue-400 to-purple-400 scale-110 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                                : 'bg-slate-600'
                                }`}
                        />
                    ))}
                </div>

                {error && (
                    <motion.div
                        initial={{ x: -10 }}
                        animate={{ x: 0 }}
                        className="text-red-400 text-center text-sm mb-4 bg-red-900/20 py-1 rounded-md"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Numpad */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                            key={num}
                            onClick={() => handlePadClick(num.toString())}
                            className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-xl font-medium transition-colors border border-white/5 active:scale-95"
                        >
                            {num}
                        </button>
                    ))}
                    <button
                        onClick={handleClear}
                        className="w-16 h-16 flex items-center justify-center text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        CLEAR
                    </button>
                    <button
                        onClick={() => handlePadClick('0')}
                        className="w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-xl font-medium transition-colors border border-white/5 active:scale-95"
                    >
                        0
                    </button>
                    <button
                        onClick={handleSubmit} // Using standard submit
                        className="w-16 h-16 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <ArrowRight />
                    </button>
                </div>

                {/* Remember Me specific for Setup or if verify allows re-toggling which is rare, usually setup only */}
                {mode === 'setup' && !confirmPin && (
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="rounded bg-slate-700 border-none text-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        />
                        <label htmlFor="remember" className="text-sm text-slate-300 cursor-pointer select-none">
                            Remember me on this device
                        </label>
                    </div>
                )}

            </motion.div>
        </div>
    );
};

export default PinEntry;
