import { useRef } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { FireProvider } from './context/FireContext';
import Hero from './components/Landing/Hero';
import Education from './components/Landing/Education';
import WhatIsFire from './components/Landing/WhatIsFire';
import SimpleMath from './components/Landing/SimpleMath';
import WhyFire from './components/Landing/WhyFire';
import FireTypes from './components/Landing/FireTypes';
import FireWidget from './components/Calculator/FireWidget';
import FAQ from './components/Landing/FAQ';
import Logo from './components/Logo';

const MainLayout = () => {
  const calculatorRef = useRef(null);

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

        <Education />

        <SimpleMath />

        <WhyFire />

        <FireTypes />

        <div ref={calculatorRef} className="relative min-h-[400px]">
          <FireWidget />
        </div>

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
            <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <FireProvider>
      <MainLayout />
    </FireProvider>
  );
}

export default App;
