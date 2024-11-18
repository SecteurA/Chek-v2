import React from 'react';
import { BarChart2 } from 'lucide-react';

interface DashboardCardProps {
  index: number;
}

export function DashboardCard({ index }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Carte {index + 1}</h3>
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <BarChart2 className="w-5 h-5 text-indigo-600" />
        </div>
      </div>
      <p className="text-gray-600">
        Contenu de la carte avec des informations pertinentes pour votre tableau de bord.
      </p>
    </div>
  );
}