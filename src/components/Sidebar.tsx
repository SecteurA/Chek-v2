// src/components/Sidebar.tsx
import React from 'react';
import { cn } from '../lib/utils';
import { Home, FileCheck, Users, Building2, Landmark, Wallet } from 'lucide-react';

const menuItems = [
  {
    id: 'home',
    icon: Home,
    label: { fr: 'Accueil', ar: 'الرئيسية' }
  },
  {
    id: 'cheque-lcr',
    icon: FileCheck,
    label: { fr: 'Chèque/LCR', ar: 'شيك/كمبيالة' }
  },
  {
    id: 'beneficiaries',
    icon: Users,
    label: { fr: 'Bénéficiaires', ar: 'المستفيدون' }
  },
  {
    id: 'emitters',
    icon: Building2,
    label: { fr: 'Émetteurs', ar: 'المصدرون' }
  },
  {
    id: 'banks',
    icon: Landmark,
    label: { fr: 'Banques', ar: 'البنوك' }
  },
  {
    id: 'accounts',
    icon: Wallet,
    label: { fr: 'Comptes bancaires', ar: 'الحسابات المصرفية' }
  }
];

interface SidebarProps {
  isSidebarOpen: boolean;
  isRTL: boolean;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onMobileMenuClick?: () => void;
}

export function Sidebar({ isSidebarOpen, isRTL, currentPage, setCurrentPage, onMobileMenuClick }: SidebarProps) {
  const handleMenuClick = (pageId: string) => {
    setCurrentPage(pageId);
    if (window.innerWidth < 1024) {
      onMobileMenuClick?.();
    }
  };

  return (
    <aside
      className={cn(
        "fixed top-16 bottom-0 w-64 bg-white border-x transition-transform duration-300 ease-in-out z-40",
        isRTL ? "right-0" : "left-0",
        isRTL
          ? (isSidebarOpen ? "translate-x-0" : "translate-x-full")
          : (isSidebarOpen ? "translate-x-0" : "-translate-x-full"),
        "lg:translate-x-0"
      )}
    >
      <div className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              currentPage === item.id
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{isRTL ? item.label.ar : item.label.fr}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
