import React from 'react';
import { Home, ChevronRight } from 'lucide-react';

export function Breadcrumbs() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
      <Home className="w-4 h-4" />
      <ChevronRight className="w-4 h-4" />
      <span>Tableau de bord</span>
    </div>
  );
}