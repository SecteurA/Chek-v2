// src/App.tsx
import React, { useState, useEffect } from 'react';
import { cn } from './lib/utils';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { ChequeLCRPage } from './pages/ChequeLCR';
import { Beneficiaries } from './pages/Beneficiaries';
import { Emitters } from './pages/Emitters';
import { Banks } from './pages/Banks';
import { BankAccounts } from './pages/BankAccounts';

export default function App() {
  // Initialize sidebar state based on screen width
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isRTL, setIsRTL] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Add effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMobileMenuClick = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home isRTL={isRTL} />;
      case 'cheque-lcr':
        return <ChequeLCRPage isRTL={isRTL} />;
      case 'beneficiaries':
        return <Beneficiaries isRTL={isRTL} />;
      case 'emitters':
        return <Emitters isRTL={isRTL} />;
      case 'banks':
        return <Banks isRTL={isRTL} />;
      case 'accounts':
        return <BankAccounts isRTL={isRTL} />;
      default:
        return <Home isRTL={isRTL} />;
    }
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gray-50">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isRTL={isRTL}
        setIsRTL={setIsRTL}
      />
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        isRTL={isRTL}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onMobileMenuClick={handleMobileMenuClick}
      />
      
      <main className={cn(
        "pt-16 transition-all duration-300 ease-in-out",
        isRTL ? (isSidebarOpen ? "lg:pr-64" : "lg:pr-0") : (isSidebarOpen ? "lg:pl-64" : "lg:pl-0")
      )}>
        {renderPage()}
      </main>
    </div>
  );
}
