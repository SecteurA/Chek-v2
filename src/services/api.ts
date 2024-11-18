import { supabase } from '../lib/supabase';
import type { ChequeLCR, Beneficiary, Emitter, Bank, BankAccount } from '../types';

// Bank Accounts
export async function createBankAccount(data: Omit<BankAccount, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('bank_accounts')
    .insert([data])
    .select(`
      *,
      bank:banks(*)
    `)
    .single();

  if (error) throw error;
  return result;
}

export async function updateBankAccount(id: number, data: Partial<BankAccount>) {
  const { data: result, error } = await supabase
    .from('bank_accounts')
    .update(data)
    .eq('id', id)
    .select(`
      *,
      bank:banks(*)
    `)
    .single();

  if (error) throw error;
  return result;
}

export async function getBankAccounts() {
  const { data, error } = await supabase
    .from('bank_accounts')
    .select(`
      *,
      bank:banks(*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Banks
export async function createBank(data: Omit<Bank, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('banks')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateBank(id: number, data: Partial<Bank>) {
  const { data: result, error } = await supabase
    .from('banks')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function getBanks() {
  const { data, error } = await supabase
    .from('banks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Beneficiaries
export async function createBeneficiary(data: Omit<Beneficiary, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('beneficiaries')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateBeneficiary(id: number, data: Partial<Beneficiary>) {
  const { data: result, error } = await supabase
    .from('beneficiaries')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function getBeneficiaries() {
  const { data, error } = await supabase
    .from('beneficiaries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Emitters
export async function createEmitter(data: Omit<Emitter, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('emitters')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function updateEmitter(id: number, data: Partial<Emitter>) {
  const { data: result, error } = await supabase
    .from('emitters')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function getEmitters() {
  const { data, error } = await supabase
    .from('emitters')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// ChequeLCR
export async function createChequeLCR(data: Omit<ChequeLCR, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('cheques_lcr')
    .insert([data])
    .select(`
      *,
      bank_account:bank_accounts(
        *,
        bank:banks(*)
      ),
      beneficiary:beneficiaries(*),
      emitter:emitters(*)
    `)
    .single();

  if (error) throw error;
  return result;
}

export async function updateChequeLCR(id: number, data: Partial<ChequeLCR>) {
  const { data: result, error } = await supabase
    .from('cheques_lcr')
    .update(data)
    .eq('id', id)
    .select(`
      *,
      bank_account:bank_accounts(
        *,
        bank:banks(*)
      ),
      beneficiary:beneficiaries(*),
      emitter:emitters(*)
    `)
    .single();

  if (error) throw error;
  return result;
}

export async function getChequeLCRs() {
  const { data, error } = await supabase
    .from('cheques_lcr')
    .select(`
      *,
      bank_account:bank_accounts(
        *,
        bank:banks(*)
      ),
      beneficiary:beneficiaries(*),
      emitter:emitters(*)
    `);

  if (error) throw error;
  return data || [];
}