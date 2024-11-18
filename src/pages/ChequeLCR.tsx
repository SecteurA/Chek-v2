import React, { useEffect, useState } from 'react';
import { FileCheck, ChevronRight, Plus } from 'lucide-react';
import type { ChequeLCR } from '../types';
import { getChequeLCRs, createChequeLCR, updateChequeLCR } from '../services/api';
import { ChequeLCRForm } from '../components/forms/ChequeLCRForm';

interface ChequeLCRPageProps {
  isRTL: boolean;
}

export function ChequeLCRPage({ isRTL }: ChequeLCRPageProps) {
  const [records, setRecords] = useState<ChequeLCR[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ChequeLCR | undefined>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getChequeLCRs();
      setRecords(data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: Partial<ChequeLCR>) => {
    try {
      if (selectedRecord) {
        await updateChequeLCR(selectedRecord.id, data);
      } else {
        await createChequeLCR(data);
      }
      await loadData();
      setShowForm(false);
      setSelectedRecord(undefined);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleEdit = (record: ChequeLCR) => {
    setSelectedRecord(record);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <FileCheck className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
          <span>
            {isRTL 
              ? selectedRecord ? 'تعديل شيك/كمبيالة' : 'إضافة شيك/كمبيالة'
              : selectedRecord ? 'Modifier Chèque/LCR' : 'Ajouter Chèque/LCR'}
          </span>
        </div>

        <ChequeLCRForm
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
        <FileCheck className="w-4 h-4" />
        <ChevronRight className="w-4 h-4" />
        <span>{isRTL ? 'شيك/كمبيالة' : 'Chèque/LCR'}</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isRTL ? 'شيك/كمبيالة' : 'Chèque/LCR'}
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
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isRTL ? 'النوع' : 'Type'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isRTL ? 'المرجع' : 'Référence'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isRTL ? 'المستفيد/المصدر' : 'Bénéficiaire/Émetteur'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isRTL ? 'البنك' : 'Banque'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isRTL ? 'المبلغ' : 'Montant'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isRTL ? 'الحالة' : 'Statut'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isRTL ? 'الإجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.payment_type === 'check' ? (isRTL ? 'شيك' : 'Chèque') : (isRTL ? 'كمبيالة' : 'LCR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.reference}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.payment_mode === 'pay'
                      ? record.beneficiary?.name[isRTL ? 'ar' : 'fr']
                      : record.emitter?.name[isRTL ? 'ar' : 'fr']}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.bank_account?.bank?.name[isRTL ? 'ar' : 'fr']}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.amount.toLocaleString()} DH
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'completed' ? 'bg-green-100 text-green-800' :
                      record.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status === 'completed' ? (isRTL ? 'مكتمل' : 'Complété') :
                       record.status === 'cancelled' ? (isRTL ? 'ملغى' : 'Annulé') :
                       (isRTL ? 'معلق' : 'En attente')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleEdit(record)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {isRTL ? 'تعديل' : 'Modifier'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FileCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isRTL ? 'لا توجد شيكات أو كمبيالات' : 'Aucun chèque ou LCR'}
          </h3>
          <p className="text-gray-600">
            {isRTL 
              ? 'انقر على زر "إضافة" لإضافة شيك أو كمبيالة جديدة'
              : 'Cliquez sur le bouton "Ajouter" pour créer un nouveau chèque ou LCR'}
          </p>
        </div>
      )}
    </div>
  );
}