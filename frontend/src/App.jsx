import React from 'react';
import Dashboard from './pages/Dashboard';
import { LayoutDashboard, Info, Moon, Sun } from 'lucide-react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import TourGuide from './components/TourGuide';
import Background3D from './components/Background3D';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed w-full top-0 z-50 transition-colors bg-white/70 dark:bg-[#0B0F19]/60 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-600/20">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">StockPredict.AI</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">B.TECH DESIGN PROJECT</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <a href="#" className="hidden sm:flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
              <Info className="h-4 w-4" />
              <span>About Project</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Background3D />
      <div className="min-h-screen bg-transparent transition-colors duration-300">
        <Navbar />
        <main className="py-8 relative z-10">
          <Dashboard />
          <TourGuide />
        </main>

        <footer className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6">
          <div className="rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200/50 dark:border-white/10 p-6 text-center shadow-lg">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">© 2026 StockPredict.AI • Stock Market Analysis & Prediction Project</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
