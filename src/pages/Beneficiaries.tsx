import React, { useEffect, useState } from 'react';
import { Users, ChevronRight, Plus, Pencil } from 'lucide-react';
import type { Beneficiary } from '../types';
import { getBeneficiaries, createBeneficiary, updateBeneficiary } from '../services/api';
import { BeneficiaryForm } from '../components/forms/BeneficiaryForm';

interface BeneficiariesProps {
  isRTL: boolean;
}

export function Beneficiaries({ isRTL }: BeneficiariesProps) {
  const [records, setRecords] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Beneficiary | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getBeneficiaries();
      setRecords(data);
    } catch (error) {
      console.error('Error loading beneficiaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Partial<Beneficiary>) => {
    try {
      if (selectedRecord) {
        await updateBeneficiary(selectedRecord.id, data);
      } else {
        await createBeneficiary(data);
      }
      await loadData();
      setShowForm(false);
      setSelectedRecord(undefined);
    } catch (error) {
      console.error('Error saving beneficiary:', error);
    }
  };

  const handleEdit = (record: Beneficiary) => {
    setSelectedRecord(record);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Users className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
          <span>
            {isRTL 
              ? selectedRecord ? 'تعديل مستفيد' : 'إضافة مستفيد'
              : selectedRecord ? 'Modifier bénéficiaire' : 'Ajouter bénéficiaire'}
          </span>
        </div>

        <BeneficiaryForm
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
        <Users className="w-4 h-4" />
        <ChevronRight className="w-4 h-4" />
        <span>{isRTL ? 'المستفيدون' : 'Bénéficiaires'}</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isRTL ? 'المستفيدون' : 'Bénéficiaires'}
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
                  {record.address && (
                    <p className="text-sm text-gray-500 mt-1">
                      {record.address[isRTL ? 'ar' : 'fr']}
                    </p>
                  )}
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
                {record.address && (
                  <p className="mt-1">
                    {isRTL ? 'العنوان بالفرنسية' : 'Adresse en français'}: {record.address.fr}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isRTL ? 'لا يوجد مستفيدون' : 'Aucun bénéficiaire'}
          </h3>
          <p className="text-gray-600">
            {isRTL 
              ? 'انقر على زر "إضافة" لإضافة مستفيد جديد'
              : 'Cliquez sur le bouton "Ajouter" pour créer un nouveau bénéficiaire'}
          </p>
        </div>
      )}
    </div>
  );
}