import React from 'react';
import { Menu } from 'lucide-react';

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isRTL: boolean;
  setIsRTL: (rtl: boolean) => void;
}

export function Navbar({ isSidebarOpen, setIsSidebarOpen, isRTL, setIsRTL }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-gray-900">Dashboard</span>
          </div>
        </div>
        <button
          onClick={() => setIsRTL(!isRTL)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {isRTL ? 'LTR' : 'RTL'}
        </button>
      </div>
    </nav>
  );
}