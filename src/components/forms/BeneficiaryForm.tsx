import React, { useState } from 'react';
import type { Beneficiary } from '../../types';

interface BeneficiaryFormProps {
  isRTL: boolean;
  initialData?: Beneficiary;
  onSubmit: (data: Partial<Beneficiary>) => Promise<void>;
  onCancel: () => void;
}

export function BeneficiaryForm({ isRTL, initialData, onSubmit, onCancel }: BeneficiaryFormProps) {
  const [formData, setFormData] = useState<Partial<Beneficiary>>(initialData || {
    name: { fr: '', ar: '' },
    address: { fr: '', ar: '' }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleInputChange = (
    field: 'name' | 'address',
    lang: 'fr' | 'ar',
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* French Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الاسم بالفرنسية' : 'Nom en français'}
          </label>
          <input
            type="text"
            value={formData.name?.fr || ''}
            onChange={(e) => handleInputChange('name', 'fr', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        {/* Arabic Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الاسم بالعربية' : "Nom en arabe"}
          </label>
          <input
            type="text"
            value={formData.name?.ar || ''}
            onChange={(e) => handleInputChange('name', 'ar', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        {/* French Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'العنوان بالفرنسية' : 'Adresse en français'}
          </label>
          <input
            type="text"
            value={formData.address?.fr || ''}
            onChange={(e) => handleInputChange('address', 'fr', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        {/* Arabic Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'العنوان بالعربية' : "Adresse en arabe"}
          </label>
          <input
            type="text"
            value={formData.address?.ar || ''}
            onChange={(e) => handleInputChange('address', 'ar', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isRTL ? 'إلغاء' : 'Annuler'}
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {initialData ? (isRTL ? 'تحديث' : 'Mettre à jour') : (isRTL ? 'إضافة' : 'Ajouter')}
        </button>
      </div>
    </form>
  );
}