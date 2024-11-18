import React, { useEffect, useState } from 'react';
import type { ChequeLCR, Beneficiary, Emitter, Bank, BankAccount } from '../../types';
import { getBeneficiaries, getEmitters, getBanks, getBankAccounts } from '../../services/api';

interface ChequeLCRFormProps {
  isRTL: boolean;
  initialData?: ChequeLCR;
  onSubmit: (data: Partial<ChequeLCR>) => Promise<void>;
  onCancel: () => void;
}

export function ChequeLCRForm({ isRTL, initialData, onSubmit, onCancel }: ChequeLCRFormProps) {
  const [formData, setFormData] = useState<Partial<ChequeLCR>>(initialData || {
    payment_type: 'check',
    payment_mode: 'pay',
    reference: '',
    amount: 0,
    status: 'pending',
    notes: ''
  });

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [emitters, setEmitters] = useState<Emitter[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [selectedBankId, setSelectedBankId] = useState<number | undefined>(
    initialData?.bank_account?.bank?.id
  );

  useEffect(() => {
    loadFormData();
  }, []);

  useEffect(() => {
    if (selectedBankId) {
      setBankAccounts(prevAccounts => 
        prevAccounts.filter(account => account.bank_id === selectedBankId)
      );
    }
  }, [selectedBankId]);

  const loadFormData = async () => {
    try {
      const [beneficiariesData, emittersData, banksData, accountsData] = await Promise.all([
        getBeneficiaries(),
        getEmitters(),
        getBanks(),
        getBankAccounts()
      ]);
      setBeneficiaries(beneficiariesData);
      setEmitters(emittersData);
      setBanks(banksData);
      setBankAccounts(accountsData);
    } catch (error) {
      console.error('Error loading form data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'نوع الدفع' : 'Type de paiement'}
          </label>
          <select
            name="payment_type"
            value={formData.payment_type}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="check">{isRTL ? 'شيك' : 'Chèque'}</option>
            <option value="lcr">{isRTL ? 'كمبيالة' : 'LCR'}</option>
          </select>
        </div>

        {/* Payment Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'طريقة الدفع' : 'Mode de paiement'}
          </label>
          <select
            name="payment_mode"
            value={formData.payment_mode}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="pay">{isRTL ? 'للدفع' : 'À payer'}</option>
            <option value="receive">{isRTL ? 'للتحصيل' : 'À encaisser'}</option>
          </select>
        </div>

        {/* Reference */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المرجع' : 'Référence'}
          </label>
          <input
            type="text"
            name="reference"
            value={formData.reference}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'المبلغ' : 'Montant'}
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            min="0"
            step="0.01"
          />
        </div>

        {/* Issue Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'تاريخ الإصدار' : "Date d'émission"}
          </label>
          <input
            type="date"
            name="issue_date"
            value={formData.issue_date}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'تاريخ الاستحقاق' : "Date d'échéance"}
          </label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        {/* Beneficiary/Emitter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {formData.payment_mode === 'pay' 
              ? (isRTL ? 'المستفيد' : 'Bénéficiaire')
              : (isRTL ? 'المصدر' : 'Émetteur')}
          </label>
          <select
            name={formData.payment_mode === 'pay' ? 'beneficiary_id' : 'emitter_id'}
            value={formData.payment_mode === 'pay' ? formData.beneficiary_id : formData.emitter_id}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          >
            <option value="">{isRTL ? 'اختر...' : 'Sélectionner...'}</option>
            {formData.payment_mode === 'pay'
              ? beneficiaries.map(b => (
                  <option key={b.id} value={b.id}>{b.name[isRTL ? 'ar' : 'fr']}</option>
                ))
              : emitters.map(e => (
                  <option key={e.id} value={e.id}>{e.name[isRTL ? 'ar' : 'fr']}</option>
                ))
            }
          </select>
        </div>

        {/* Bank */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'البنك' : 'Banque'}
          </label>
          <select
            value={selectedBankId}
            onChange={(e) => setSelectedBankId(Number(e.target.value))}
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

        {/* Bank Account */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الحساب البنكي' : 'Compte bancaire'}
          </label>
          <select
            name="bank_account_id"
            value={formData.bank_account_id}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          >
            <option value="">{isRTL ? 'اختر الحساب...' : 'Sélectionner le compte...'}</option>
            {bankAccounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.title[isRTL ? 'ar' : 'fr']} - {account.rib}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isRTL ? 'الحالة' : 'Statut'}
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="pending">{isRTL ? 'معلق' : 'En attente'}</option>
            <option value="completed">{isRTL ? 'مكتمل' : 'Complété'}</option>
            <option value="cancelled">{isRTL ? 'ملغى' : 'Annulé'}</option>
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isRTL ? 'ملاحظات' : 'Notes'}
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
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