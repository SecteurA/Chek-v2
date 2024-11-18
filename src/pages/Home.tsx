import React from 'react';
import { Home as HomeIcon, ChevronRight } from 'lucide-react';

interface HomeProps {
  isRTL: boolean;
}

export function Home({ isRTL }: HomeProps) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <HomeIcon className="w-4 h-4" />
        <ChevronRight className="w-4 h-4" />
        <span>{isRTL ? 'الرئيسية' : 'Accueil'}</span>
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {isRTL ? 'الرئيسية' : 'Accueil'}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-medium text-gray-900 mb-2">
              {isRTL ? `البطاقة ${i}` : `Carte ${i}`}
            </h3>
            <p className="text-gray-600">
              {isRTL 
                ? 'محتوى البطاقة مع معلومات ذات صلة للوحة المعلومات الخاصة بك'
                : 'Contenu de la carte avec des informations pertinentes pour votre tableau de bord'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}