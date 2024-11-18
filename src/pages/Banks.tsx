import React, { useEffect, useState } from 'react';
import { Landmark, ChevronRight, Plus, Pencil } from 'lucide-react';
import type { Bank } from '../types';
import { getBanks, createBank, updateBank } from '../services/api';
import { BankForm } from '../components/forms/BankForm';

interface BanksProps {
  isRTL: boolean;
}

export function Banks({ isRTL }: BanksProps) {
  const [records, setRecords] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Bank | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getBanks();
      setRecords(data);
    } catch (error) {
      console.error('Error loading banks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Partial<Bank>) => {
    try {
      if (selectedRecord) {
        await updateBank(selectedRecord.id, data);
      } else {
        await createBank(data);
      }
      await loadData();
      setShowForm(false);
      setSelectedRecord(undefined);
    } catch (error) {
      console.error('Error saving bank:', error);
    }
  };

  const handleEdit = (record: Bank) => {
    setSelectedRecord(record);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Landmark className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
          <span>
            {isRTL 
              ? selectedRecord ? 'تعديل بنك' : 'إضافة بنك'
              : selectedRecord ? 'Modifier banque' : 'Ajouter banque'}
          </span>
        </div>

        <BankForm
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
        <Landmark className="w-4 h-4" />
        <ChevronRight className="w-4 h-4" />
        <span>{isRTL ? 'البنوك' : 'Banques'}</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isRTL ? 'البنوك' : 'Banques'}
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
                    {record.name[isRTL ? 'ar' : 'fr']}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {isRTL ? 'الرمز' : 'Code'}: {record.code}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(record)}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <div className="text-sm text-gray-500">
                <p className="mt-2">
                  {isRTL ? 'الاسم بالفرنسية' : 'Nom en français'}: {record.name.fr}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <Landmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isRTL ? 'لا توجد بنوك' : 'Aucune banque'}
          </h3>
          <p className="text-gray-600">
            {isRTL 
              ? 'انقر على زر "إضافة" لإضافة بنك جديد'
              : 'Cliquez sur le bouton "Ajouter" pour créer une nouvelle banque'}
          </p>
        </div>
      )}
    </div>
  );
}