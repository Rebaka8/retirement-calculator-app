import React, { useState, useEffect } from 'react';
import { useFire } from '../../context/FireContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RefreshCw, TrendingUp, Zap, AlertTriangle, CheckCircle, Target, Wallet, FileText, Share2, X, Link, Mail, MessageCircle, ArrowLeft } from 'lucide-react';
import { generateFireReport, createReportDoc, getFireReportBlob } from '../Report/DownloadReport';
import { handleShareReport, downloadPDF } from '../../utils/shareUtils';
import Tooltip from '../UI/Tooltip';
import ScrollArrow from '../UI/ScrollArrow';



const InputPair = ({ label, value, min, max, step, onChange, color = "blue", suffix = "", tooltip }) => (
    <div>
        <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">{label}</label>
                {tooltip && <Tooltip text={tooltip} />}
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    value={value}
                    onChange={onChange}
                    className={`w-36 bg-white border border-slate-200 rounded-lg px-3 py-2 text-right font-bold text-${color}-600 focus:outline-none focus:ring-2 focus:ring-${color}-500 transition-all`}
                />
                {suffix && <span className="text-sm font-bold text-slate-400">{suffix}</span>}
            </div>
        </div>
        <input
            type="range" min={min} max={max} step={step}
            value={value}
            onChange={onChange}
            className={`w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-${color}-600`}
        />
    </div>
);

const FireWidget = () => {
    const {
        data,
        updateData,
        fireNumbers,
        calculateYearsToTarget,
        calculateRequiredSavings,
        resetData
    } = useFire();

    // Default Age if not in context
    useEffect(() => {
        if (!data.currentAge) {
            updateData('currentAge', 25);
        }
    }, []);


    const [mode, setMode] = useState(() => {
        const p = new URLSearchParams(window.location.search);
        return p.get('mode') === 'goal' ? 'goal' : 'income';
    });

    const [showResults, setShowResults] = useState(false);
    const [touched, setTouched] = useState(false);

    // Validation Logic
    const validate = () => {
        const errors = {};
        const isNum = (v) => v !== "" && v !== null && !isNaN(Number(v));

        if (mode === 'income') {
            if (!isNum(data.currentAge)) errors.currentAge = "Age is required";
            if (!isNum(data.annualIncome)) errors.annualIncome = "Income is required";
            if (!isNum(data.annualExpenses)) errors.annualExpenses = "Expenses are required";
        } else {
            if (!isNum(data.targetCorpus)) errors.targetCorpus = "Target is required";
            if (!isNum(data.yearsToRetire)) errors.yearsToRetire = "Years are required";
        }

        // Global
        if (!isNum(data.investmentReturnRate)) errors.investmentReturnRate = "Return Rate required";
        if (!isNum(data.inflationRate)) errors.inflationRate = "Inflation required";

        return errors;
    };

    const errors = validate();
    const isValid = Object.keys(errors).length === 0;

    const handleCalculate = () => {
        setTouched(true);
        if (isValid) {
            setShowResults(true);
            // Scroll to top of widget on mobile to simulate page change
            const widget = document.getElementById('fire-widget');
            if (widget && window.innerWidth < 1024) {
                widget.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleInputChange = (field, value) => {
        updateData(field, value);
        // setShowResults(false); // OPTIONAL: If we want to stay on result page while editing (desktop), keep true.
        // But for mobile "Page" logic, if they edit, they are on Input "Page".
        setShowResults(false);
    };

    // Initial Loading Guard
    if (!data || !fireNumbers) return <div className="p-12 text-center text-slate-400">Loading Calculator...</div>;

    // --- LOGIC: Compute Values based on Mode ---

    // Mode 1: Income Based (Existing)
    const savings = (data.annualIncome || 0) - (data.annualExpenses || 0);
    const savingsRate = data.annualIncome > 0 ? (savings / data.annualIncome) * 100 : 0;

    // Mode 2: Goal Based
    const { monthlySavings, requiredAnnualIncome } = calculateRequiredSavings();

    // Formatters
    const formatToCr = (val) => ((val || 0) / 10000000).toFixed(2);
    const formatCurrency = (val) => {
        if (!val && val !== 0) return '₹0';
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
        if (val >= 1000) return `₹${(val / 1000).toFixed(1)}k`;
        return `₹${Number(val).toLocaleString('en-IN')}`;
    };

    // Results Object for Grid
    const fireResults = {
        lean: { corpus: formatToCr(fireNumbers.lean), years: calculateYearsToTarget(fireNumbers.lean, data) },
        fat: { corpus: formatToCr(fireNumbers.fat), years: calculateYearsToTarget(fireNumbers.fat, data) },
        traditional: { corpus: formatToCr(fireNumbers.traditional), years: calculateYearsToTarget(fireNumbers.traditional, data) },
        // ... include others as needed
    };

    // Helper: Input Field Pair Moved Outside


    // Check for Shared Report View
    const params = new URLSearchParams(window.location.search);
    const isReportView = params.get('view') === 'report';
    const [pdfUrl, setPdfUrl] = useState(null);

    // Auto-Generate PDF for Report View
    useEffect(() => {
        if (isReportView && data && fireNumbers && !pdfUrl) {
            const generate = async () => {
                // Short delay to ensure fonts/data loaded?
                await new Promise(r => setTimeout(r, 500));
                const doc = createReportDoc(data, fireNumbers, mode);
                const blob = doc.output('bloburl');
                setPdfUrl(blob);
            };
            generate();
        }
    }, [isReportView, data, fireNumbers, mode]);

    if (isReportView && data && fireNumbers) {
        if (!pdfUrl) {
            return (
                <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
                    <h2 className="text-xl font-bold text-slate-700">Generating Report...</h2>
                </div>
            );
        }

        return (
            <div className="h-screen w-full bg-slate-100 flex flex-col relative">
                {/* PDF Viewer */}
                <iframe src={pdfUrl} className="flex-1 w-full h-full" title="FIRE Report" />

                {/* Floating Action Bar */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        onClick={() => {
                            const doc = createReportDoc(data, fireNumbers, mode);
                            doc.save("FIRE_Freedom_Plan.pdf");
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 flex items-center gap-2"
                        title="Download PDF"
                    >
                        <Download className="w-5 h-5" />
                        <span className="hidden sm:inline font-bold pr-2">Download</span>
                    </button>

                    <button
                        onClick={() => {
                            const url = new URL(window.location);
                            url.searchParams.delete('view');
                            window.history.pushState({}, '', url);
                            window.location.reload();
                        }}
                        className="bg-white hover:bg-slate-100 text-slate-700 p-3 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
                        title="Edit Plan"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Fallback Hint (Overlay at bottom if needed) */}
                <div className="sm:hidden absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg text-center text-xs text-slate-500">
                    If PDF doesn't appear, click <b>Download</b> above.
                </div>
            </div>
        );
    }

    // Share Modal State
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareBlob, setShareBlob] = useState(null);
    const [isGeneratingShare, setIsGeneratingShare] = useState(false);
    const [copied, setCopied] = useState(false);
    const [toastMsg, setToastMsg] = useState(null);
    const [isSharing, setIsSharing] = useState(false);

    const handleShareClick = async () => {
        setIsGeneratingShare(true);
        try {
            // Generate PDF Blob (NEW way!)
            const blob = getFireReportBlob(data, fireNumbers, mode);
            setShareBlob(blob); // Still set state for desktop modal consistency

            const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

            if (isMobile) {
                // Mobile: Bypass Modal, trigger native share immediately
                await executeShare('native', blob, true); // Suppress toast on mobile
            } else {
                // Desktop: Show Modal
                setShowShareModal(true);
            }
        } catch (error) {
            console.error("Error generating share blob:", error);
            alert("Could not generate report for sharing.");
        } finally {
            setIsGeneratingShare(false);
        }
    };

    const executeShare = async (platform, directBlob = null, suppressToast = false) => {
        const blobToUse = directBlob || shareBlob;
        if (!blobToUse) return;
        setIsSharing(true);

        try {
            // Prepare data context
            const reportData = {
                ...data, // Pass full data for Permalink generation
                // Explicit overrides if needed, though ...data covers it
            };

            if (platform === 'download') {
                downloadPDF(blobToUse);
                setToastMsg("✅ Download started!");
                setTimeout(() => setToastMsg(null), 3000);
                setIsSharing(false);
                return;
            }

            // Fix for Browser Popup Blockers (especially Desktop WhatsApp)
            let popupWindow = null;
            if (platform === 'whatsapp' && !/Android|iPhone|iPad/i.test(navigator.userAgent)) {
                popupWindow = window.open('', '_blank');
                if (popupWindow) {
                    popupWindow.document.write('<html><body style="background:#f0f2f5;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#54656f;"><h2>🚀 Preparing WhatsApp...</h2></body></html>');
                }
            }

            const result = await handleShareReport(blobToUse, reportData, platform, popupWindow);

            if (result.success) {
                if (platform === 'copy' || platform === 'copy-text') {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }
                if (!suppressToast && result.message) {
                    setToastMsg(result.message);
                    setTimeout(() => setToastMsg(null), 4000);
                }
            } else {
                // Fallback for Copy Link on Mobile (Async Clipboard Blocked)
                if (platform === 'copy' && result.error === 'clipboard_failed') {
                    // Try to open native share sheet with just the link
                    await shareViaNative(result.link, null);
                    setToastMsg("🔗 Link active! Share manually.");
                } else {
                    setToastMsg(result.message);
                }
                setTimeout(() => setToastMsg(null), 5000);
            }

        } catch (error) {
            console.error("Share execution failed:", error);
            setToastMsg("❌ Sharing failed. Please try again.");
            setTimeout(() => setToastMsg(null), 4000);
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <section id="fire-widget" className="py-8 bg-white relative">
            {/* Action Toast */}
            <AnimatePresence>
                {toastMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 20, x: '-50%' }}
                        className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 w-[90%] max-w-md"
                        onClick={() => setToastMsg(null)}
                    >
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                        <p className="text-xs font-bold leading-relaxed flex-1">
                            {toastMsg}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Share Modal */}
            <AnimatePresence>
                {showShareModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setShowShareModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl overflow-hidden relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-xl font-black text-slate-800">Share Report</h3>
                                    <p className="text-xs text-slate-500 font-medium">Choose how you want to send your plan.</p>
                                </div>
                                <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {/* Copy Link */}
                                <button onClick={() => executeShare('copy')} disabled={isSharing} className="flex flex-col items-center justify-center gap-3 p-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 transition-all group disabled:opacity-50 disabled:cursor-not-allowed">
                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform relative">
                                        {copied ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Link className="w-5 h-5 text-indigo-600" />}
                                    </div>
                                    <span className="text-[10px] md:text-xs font-bold text-slate-700 text-center leading-tight">{copied ? 'Copied!' : 'Copy Link'}</span>
                                </button>

                                {/* Native Share / More */}
                                <button onClick={() => executeShare('native')} disabled={isSharing} className="flex flex-col items-center justify-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all group disabled:opacity-50 disabled:cursor-not-allowed">
                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Share2 className="w-5 h-5 text-slate-600" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-700">More</span>
                                </button>
                            </div>

                            <div className="text-center p-3 bg-slate-50 rounded-xl text-[10px] text-slate-400">
                                Note: Some apps may not support direct PDF file sharing. In that case, we'll try to share a summary text or help you download the file.
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header & Reset */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Your Freedom Planner</h2>
                        <p className="text-slate-500 font-medium text-sm">Map out your path to independence.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Mode Toggle */}
                        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setMode('income')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'income' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <Wallet className="w-3 h-3 inline mr-2" />
                                By Income
                            </button>
                            <button
                                onClick={() => setMode('goal')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'goal' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <Target className="w-3 h-3 inline mr-2" />
                                By Goal
                            </button>
                        </div>

                        <button onClick={resetData} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                            <RefreshCw className="w-3 h-3" /> Reset
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* LEFT COLUMN: Inputs (Span 5) */}
                    <div className={`lg:col-span-5 space-y-5 ${showResults ? 'hidden lg:block' : 'block'}`}>

                        <div className="bg-slate-50 p-5 md:p-6 rounded-[2rem] border border-slate-100 shadow-inner space-y-5">

                            {/* DYNAMIC INPUTS BASED ON MODE */}
                            {mode === 'income' ? (
                                <>
                                    <InputPair
                                        label="Current Age"
                                        tooltip="Your age today."
                                        value={data.currentAge || 25}
                                        min={18} max={80} step={1}
                                        onChange={(e) => updateData('currentAge', Number(e.target.value))}
                                        color="indigo"
                                        suffix="Years"
                                    />

                                    <InputPair
                                        label="Annual Income"
                                        tooltip="Your total yearly earnings before tax from all sources."
                                        value={data.annualIncome || 0}
                                        min={300000} max={20000000} step={50000}
                                        onChange={(e) => updateData('annualIncome', Number(e.target.value))}
                                        color="blue"
                                    />

                                    <InputPair
                                        label="Annual Expenses"
                                        tooltip="How much you spend in a year. Be honest! This determines your FIRE number."
                                        value={data.annualExpenses || 0}
                                        min={100000} max={Math.max((data.annualIncome || 0), 100000)} step={10000}
                                        onChange={(e) => updateData('annualExpenses', Number(e.target.value))}
                                        color="rose"
                                    />

                                    <div className="text-right">
                                        <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">
                                            Savings Rate: {savingsRate.toFixed(0)}%
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <InputPair
                                        label="My Dream Corpus"
                                        tooltip="The total amount of money you want to accumulate before retiring."
                                        value={data.targetCorpus || 50000000}
                                        min={10000000} max={500000000} step={1000000}
                                        onChange={(e) => updateData('targetCorpus', Number(e.target.value))}
                                        color="purple"
                                    />

                                    <InputPair
                                        label="Years to Achieve"
                                        tooltip="In how many years do you want to reach this goal?"
                                        value={data.yearsToRetire || 15}
                                        min={1} max={50} step={1}
                                        onChange={(e) => updateData('yearsToRetire', Number(e.target.value))}
                                        color="indigo"
                                        suffix="Years"
                                    />
                                </>
                            )}

                            <hr className="border-slate-200 border-dashed" />

                            {/* GLOBAL ASSUMPTIONS (Visible in both modes) */}
                            <div className="space-y-5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                                    Global Settings
                                    <Tooltip text="Assumptions used to project your future wealth." />
                                </label>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <label className="text-xs font-bold text-slate-500">Current Savings</label>
                                            <Tooltip text="The total value of your existing investments (PF, Stocks, MFs, etc.) today." />
                                        </div>
                                        <input
                                            type="number"
                                            value={data.currentCorpus || 0}
                                            onChange={(e) => updateData('currentCorpus', Number(e.target.value))}
                                            className="w-32 bg-white border border-slate-200 rounded-lg text-right px-2 py-1.5 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-400 transition-all"
                                        />
                                    </div>
                                    <input
                                        type="range" min="0" max="50000000" step="100000"
                                        value={data.currentCorpus || 0}
                                        onChange={(e) => updateData('currentCorpus', Number(e.target.value))}
                                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 mb-2 flex items-center">
                                            Return Rate (%)
                                            <Tooltip text="Expected average annual annual growth of your portfolio." />
                                        </label>
                                        <input
                                            type="number"
                                            value={data.investmentReturnRate}
                                            onChange={(e) => updateData('investmentReturnRate', Number(e.target.value))}
                                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-emerald-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 mb-2 flex items-center">
                                            Inflation (%)
                                            <Tooltip text="The rate at which cost of living increases. Avg ~6% in India." />
                                        </label>
                                        <input
                                            type="number"
                                            value={data.inflationRate}
                                            onChange={(e) => updateData('inflationRate', Number(e.target.value))}
                                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-rose-600 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleCalculate}
                                disabled={!isValid}
                                className={`lg:hidden w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2
                                    ${isValid
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-indigo-200 hover:-translate-y-1'
                                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                            >
                                <Zap className={`w-5 h-5 ${isValid ? 'text-yellow-300 fill-current' : ''}`} />
                                {isValid ? 'Calculate Independence' : 'Enter Details...'}
                            </button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Results (Span 7) */}
                    <div className={`lg:col-span-7 flex flex-col h-full space-y-5 ${!showResults ? 'hidden lg:flex' : 'flex'}`}>

                        {/* Mobile Back Button */}
                        <div className="lg:hidden mb-4">
                            <button
                                onClick={() => setShowResults(false)}
                                className="w-auto inline-flex py-2 px-4 bg-white border border-indigo-200 rounded-full shadow-sm text-indigo-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all active:scale-95 group"
                            >
                                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                                <span>Modify Inputs</span>
                            </button>
                        </div>

                        {/* DYNAMIC SUMMARY BLOCK */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-5 md:p-6 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                            {mode === 'income' ? (
                                <div className="relative z-10">
                                    <h3 className="text-white/60 font-bold uppercase tracking-wider text-xs mb-2">Your Reality</h3>
                                    <div className="text-3xl md:text-4xl font-bold mb-3">
                                        You verify <span className="text-emerald-400">{savingsRate.toFixed(0)}%</span> of your future.
                                    </div>
                                    <p className="text-white/80 leading-relaxed max-w-lg text-sm">
                                        At this rate, you'll hit Traditional FIRE in <span className="text-white font-bold decoration-2 underline decoration-indigo-400 underline-offset-4">{fireResults.traditional.years} years</span>.
                                        Want it faster? Bumping savings to {Math.min(savingsRate + 10, 80).toFixed(0)}% saves you {(parseInt(fireResults.traditional.years) * 0.3).toFixed(1)} years.
                                    </p>
                                </div>
                            ) : (
                                <div className="relative z-10">
                                    <h3 className="text-white/60 font-bold uppercase tracking-wider text-xs mb-2">Your Dream Plan</h3>
                                    <div className="text-3xl md:text-4xl font-bold mb-3">
                                        Need <span className="text-purple-400">{formatCurrency(monthlySavings)}</span> / month
                                    </div>
                                    <p className="text-white/80 leading-relaxed max-w-lg text-sm">
                                        To reach {formatCurrency(data.targetCorpus)} in {data.yearsToRetire} years, aim for an annual income of approx <span className="text-white font-bold decoration-2 underline decoration-purple-400 underline-offset-4">{formatCurrency(requiredAnnualIncome)}</span> (assuming 40% savings).
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* FIRE COMPARISON GRID */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
                            {Object.entries(mode === 'income' ? fireNumbers : {
                                traditional: data.targetCorpus,
                                lean: data.targetCorpus * 0.7,
                                fat: data.targetCorpus * 2,
                                barista: data.targetCorpus * 0.55,
                                slow: data.targetCorpus * (33.33 / 25),
                                coast: (() => {
                                    // Calculate Coast for Goal Mode
                                    // Target required NOW to grow to Goal in 'yearsToRetire'
                                    const r = (data.investmentReturnRate - data.inflationRate) / 100;
                                    const t = data.yearsToRetire || 15;
                                    return data.targetCorpus / Math.pow(1 + (r > 0 ? r : 0.001), t);
                                })()
                            }).map(([key, rawVal]) => {
                                // In Goal Mode, use the Required Monthly Savings * 12 as the hypothetical "Annual Savings"
                                // This shows "If I save the recommended amount, here is when I hit each milestone"
                                const savingsParam = mode === 'income' ? null : (monthlySavings * 12);

                                const val = rawVal || 0;
                                const years = calculateYearsToTarget(val, data, savingsParam);
                                const corpus = formatToCr(val);
                                const colorMap = {
                                    lean: 'emerald', fat: 'yellow', barista: 'blue',
                                    coast: 'purple', traditional: 'indigo', slow: 'teal'
                                };

                                // Skip 'normal' or other internal keys
                                if (key === 'normal') return null;

                                return (
                                    <div key={key} className={`bg-white border border-slate-100 p-3 rounded-xl shadow-sm relative overflow-hidden group hover:border-${colorMap[key]}-200 transition-colors`}>
                                        <div className={`absolute top-0 left-0 w-1 h-full bg-blue-500`} />
                                        <div className="pl-2 h-full flex flex-col justify-between">
                                            <div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase">{key} FIRE</div>
                                                <div className="font-bold text-slate-800 text-xl">{corpus} Cr</div>
                                            </div>
                                            <div className="mt-2">
                                                <span className={`text-xs font-extrabold text-${colorMap[key]}-600 bg-${colorMap[key]}-50 px-2 py-0.5 rounded`}>
                                                    {years} Years
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-4 flex gap-3">
                            <button
                                onClick={handleShareClick}
                                disabled={isGeneratingShare}
                                className="flex-1 flex items-center justify-center gap-2 px-5 py-4 bg-white border-2 border-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 text-sm"
                            >
                                {isGeneratingShare ? <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" /> : <Share2 className="w-4 h-4" />}
                                Share
                            </button>

                            <button
                                onClick={() => generateFireReport(data, fireNumbers, mode)}
                                className="flex-[2] flex items-center justify-center gap-2 px-5 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-200 transition-all hover:-translate-y-1 active:scale-95 text-sm"
                            >
                                <Download className="w-4 h-4" />
                                Download Report
                            </button>
                        </div>

                    </div>
                </div>

                <ScrollArrow targetId="simple-truths" />

            </div>
        </section>
    );
};

export default FireWidget;
