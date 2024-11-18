import React, { useEffect, useState } from 'react';
import { Wallet, ChevronRight, Plus, Pencil } from 'lucide-react';
import type { BankAccount } from '../types';
import { getBankAccounts, createBankAccount, updateBankAccount } from '../services/api';
import { BankAccountForm } from '../components/forms/BankAccountForm';

interface BankAccountsProps {
  isRTL: boolean;
}

export function BankAccounts({ isRTL }: BankAccountsProps) {
  const [records, setRecords] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<BankAccount | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getBankAccounts();
      setRecords(data);
    } catch (error) {
      console.error('Error loading bank accounts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Partial<BankAccount>) => {
    try {
      if (selectedRecord) {
        await updateBankAccount(selectedRecord.id, data);
      } else {
        await createBankAccount(data);
      }
      await loadData();
      setShowForm(false);
      setSelectedRecord(undefined);
    } catch (error) {
      console.error('Error saving bank account:', error);
    }
  };

  const handleEdit = (record: BankAccount) => {
    setSelectedRecord(record);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Wallet className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
          <span>
            {isRTL 
              ? selectedRecord ? 'تعديل حساب مصرفي' : 'إضافة حساب مصرفي'
              : selectedRecord ? 'Modifier compte bancaire' : 'Ajouter compte bancaire'}
          </span>
        </div>

        <BankAccountForm
          isRTL={isRTL}
          initialData={selectedRecord}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setSelectedRecord(undefined);
          }}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Wallet className="w-4 h-4" />
        <ChevronRight className="w-4 h-4" />
        <span>{isRTL ? 'الحسابات المصرفية' : 'Comptes bancaires'}</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isRTL ? 'الحسابات المصرفية' : 'Comptes bancaires'}
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          {isRTL ? (
            <>
              إضافة
              <Plus className="w-4 h-4" />
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Ajouter
            </>
          )}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      ) : records.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {record.title[isRTL ? 'ar' : 'fr']}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {record.bank?.name[isRTL ? 'ar' : 'fr']}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(record)}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <p>
                  {isRTL ? 'رقم الحساب' : 'N° compte'}: {record.account_number}
                </p>
                <p>
                  RIB: {record.rib}
                </p>
                <p>
                  {isRTL ? 'العنوان بالفرنسية' : 'Titre en français'}: {record.title.fr}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isRTL ? 'لا توجد حسابات مصرفية' : 'Aucun compte bancaire'}
          </h3>
          <p className="text-gray-600">
            {isRTL 
              ? 'انقر على زر "إضافة" لإضافة حساب مصرفي جديد'
              : 'Cliquez sur le bouton "Ajouter" pour créer un nouveau compte bancaire'}
          </p>
        </div>
      )}
    </div>
  );
}