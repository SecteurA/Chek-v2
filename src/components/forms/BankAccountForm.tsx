import React, { useEffect, useState } from 'react';
import type { BankAccount, Bank } from '../../types';
import { getBanks } from '../../services/api';

interface BankAccountFormProps {
  isRTL: boolean;
  initialData?: BankAccount;
  onSubmit: (data: Partial<BankAccount>) => Promise<void>;
  onCancel: () => void;
}

export function BankAccountForm({ isRTL, initialData, onSubmit, onCancel }: BankAccountFormProps) {
  const [formData, setFormData] = useState<Partial<BankAccount>>(initialData || {
    title: { fr: '', ar: '' },
    account_number: '',
    rib: '',
    bank_id: undefined
  });

  const [banks, setBanks] = useState<Bank[]>([]);

  useEffect(() => {
    loadBanks();
  }, []);

  const loadBanks = async () => {
    try {
      const data = await getBanks();
      setBanks(data);
    } catch (error) {
      console.error('Error loading banks:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleInputChange = (
    field: 'title' | 'account_number' | 'rib' | 'bank_id',
    value: string,
    lang?: 'fr' | 'ar'
  ) => {
    if (field === 'bank_id') {
      setFormData(prev => ({ ...prev, bank_id: parseInt(value) }));
    } else if (field === 'title' && lang) {
      setFormData(prev => ({
        ...prev,
        title: {
          ...prev.title,
          [lang]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* French Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'العنوان بالفرنسية' : 'Titre en français'}
          </label>
          <input
            type="text"
            value={formData.title?.fr || ''}
            onChange={(e) => handleInputChange('title', e.target.value, 'fr')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        {/* Arabic Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'العنوان بالعربية' : "Titre en arabe"}
          </label>
          <input
            type="text"
            value={formData.title?.ar || ''}
            onChange={(e) => handleInputChange('title', e.target.value, 'ar')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        {/* Bank Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'البنك' : 'Banque'}
          </label>
          <select
            value={formData.bank_id || ''}
            onChange={(e) => handleInputChange('bank_id', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          >
            <option value="">{isRTL ? 'اختر البنك...' : 'Sélectionner la banque...'}</option>
            {banks.map(bank => (
              <option key={bank.id} value={bank.id}>
                {bank.name[isRTL ? 'ar' : 'fr']}
              </option>
            ))}
          </select>
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'رقم الحساب' : 'Numéro de compte'}
          </label>
          <input
            type="text"
            value={formData.account_number || ''}
            onChange={(e) => handleInputChange('account_number', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        {/* RIB */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            RIB
          </label>
          <input
            type="text"
            value={formData.rib || ''}
            onChange={(e) => handleInputChange('rib', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
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