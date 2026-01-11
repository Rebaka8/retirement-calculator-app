import { useRef, useState } from 'react';
import LegalModal from './components/LegalModal';
import { Github, Linkedin } from 'lucide-react';
import { FireProvider } from './context/FireContext';
import Hero from './components/Landing/Hero';
import SimpleTruths from './components/Landing/SimpleTruths';
import RealLifeImpacts from './components/Landing/RealLifeImpacts';
import WhatIsFire from './components/Landing/WhatIsFire';
import SimpleMath from './components/Landing/SimpleMath';
import WhyFire from './components/Landing/WhyFire';
import FireTypes from './components/Landing/FireTypes';
import FireWidget from './components/Calculator/FireWidget';
import FAQ from './components/Landing/FAQ';
import Logo from './components/Logo';

import { Routes, Route } from 'react-router-dom';
import ReportPreview from './components/Report/ReportPreview';

const MainLayout = () => {
  const calculatorRef = useRef(null);
  const [legalModal, setLegalModal] = useState({ isOpen: false, title: '', content: null });

  const startYear = new Date().getFullYear();

  const PRIVACY_CONTENT = (
    <>
      <p className="mb-4"><strong>Effective Date:</strong> January 1, {startYear}</p>
      <p className="mb-4">Your privacy is important to us. It is FIRE Tracker's policy to respect your privacy regarding any information we may collect from you across our website.</p>
      <h4 className="font-bold text-slate-900 mt-6 mb-2">1. Information We Collect</h4>
      <p className="mb-4">We do not collect any personal identifiable information (PII) on our servers. All calculations are performed client-side within your browser. The data you enter (income, expenses, corpus) remains on your device and is not transmitted to us.</p>
      <h4 className="font-bold text-slate-900 mt-6 mb-2">2. Local Storage</h4>
      <p className="mb-4">We may use local storage cookies to save your preferences or input data so you don't have to re-enter it every time you visit. You can clear this data at any time by clearing your browser cache.</p>
      <h4 className="font-bold text-slate-900 mt-6 mb-2">3. Third-Party Services</h4>
      <p className="mb-4">We use third-party services to enhance our platform's functionality. Specifically, we use <strong>Cloudinary</strong> for generating report previews and processing image assets. When you view a report preview, the necessary visual data is processed by Cloudinary to create these images.</p>
    </>
  );

  const TERMS_CONTENT = (
    <>
      <p className="mb-4"><strong>Last Updated:</strong> January 1, {startYear}</p>
      <h4 className="font-bold text-slate-900 mt-6 mb-2">1. Acceptance of Terms</h4>
      <p className="mb-4">By accessing or using FIRE Tracker, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
      <h4 className="font-bold text-slate-900 mt-6 mb-2">2. Educational Purpose Only</h4>
      <p className="mb-4">The content and tools provided on this website are for educational and informational purposes only. They do not constitute financial, investment, tax, or legal advice.</p>
      <h4 className="font-bold text-slate-900 mt-6 mb-2">3. No Guarantees</h4>
      <p className="mb-4">We do not guarantee the accuracy, completeness, or reliability of any calculations or information. Future financial outcomes are uncertain, and you should consult with a qualified professional before making financial decisions.</p>
      <h4 className="font-bold text-slate-900 mt-6 mb-2">4. Third-Party Dependencies</h4>
      <p className="mb-4">Our Report preview feature relies on <strong>Cloudinary</strong> for image generation. By using this feature, you acknowledge that report data allows for this processing. PDF reports are generated separately and do not rely on this service.</p>
    </>
  );

  const openLegal = (type) => {
    if (type === 'privacy') {
      setLegalModal({ isOpen: true, title: 'Privacy Policy', content: PRIVACY_CONTENT });
    } else {
      setLegalModal({ isOpen: true, title: 'Terms of Service', content: TERMS_CONTENT });
    }
  };

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              FIRE Tracker
            </h1>
          </div>

          <nav className="flex items-center gap-4">
            <button onClick={scrollToCalculator} className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">
              Calculator
            </button>
          </nav>
        </div>
      </header>
      <main>
        <Hero onScrollToCalculator={scrollToCalculator} />

        <WhatIsFire />



        <SimpleMath />

        <WhyFire />

        <FireTypes />

        <div ref={calculatorRef} id="calculator-section" className="relative min-h-[400px] scroll-mt-20">
          <FireWidget />
        </div>

        <SimpleTruths />

        <RealLifeImpacts />

        <FAQ />
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Logo className="w-6 h-6 grayscale opacity-50" />
            <span className="font-bold text-slate-400">FIRE Tracker</span>
          </div>

          <div className="mb-8">
            <p className="text-slate-500 font-medium flex flex-wrap items-center justify-center gap-2">
              Developed by <span className="text-slate-900 font-bold">Rebaka Meda</span>
            </p>
            <div className="flex justify-center gap-4 mt-3">
              <a href="https://www.linkedin.com/in/rebaka-meda-6832b2367" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-[#0077b5] hover:bg-blue-50 transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://github.com/Rebaka8" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors">
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          <p className="text-slate-400 text-sm max-w-2xl mx-auto border-t border-slate-100 pt-8">
            <span className="block mb-4 font-medium text-slate-500">
              Disclaimer: This website is for reference and educational purposes only. It does not constitute financial advice. Please consult a professional for your investment decisions.
            </span>
          </p>

          <div className="flex justify-center gap-6 text-sm text-slate-400 font-medium">
            <button onClick={() => openLegal('privacy')} className="hover:text-blue-600 transition">Privacy Policy</button>
            <button onClick={() => openLegal('terms')} className="hover:text-blue-600 transition">Terms of Service</button>
          </div>
        </div>
      </footer>

      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))}
        title={legalModal.title}
        content={legalModal.content}
      />
    </div>
  );
};

function App() {
  return (
    <FireProvider>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/report/preview" element={<ReportPreview />} />
      </Routes>
    </FireProvider>
  );
}

export default App;
