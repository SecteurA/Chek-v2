-- Insert test bank
INSERT INTO banks (id, name, code)
VALUES (
  1,
  '{"fr": "Banque Populaire", "ar": "البنك الشعبي"}'::jsonb,
  'BP001'
) ON CONFLICT (id) DO NOTHING;

-- Insert test bank account
INSERT INTO bank_accounts (id, bank_id, account_number, rib, title)
VALUES (
  1,
  1,
  '007123456789',
  '123456789012345678901',
  '{"fr": "Compte Principal", "ar": "الحساب الرئيسي"}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Insert test beneficiary
INSERT INTO beneficiaries (id, name, address)
VALUES (
  1,
  '{"fr": "Société Générale de Services", "ar": "الشركة العامة للخدمات"}'::jsonb,
  '{"fr": "123 Rue du Commerce", "ar": "123 شارع التجارة"}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Insert test emitter
INSERT INTO emitters (id, name, address)
VALUES (
  1,
  '{"fr": "Entreprise Nationale de Commerce", "ar": "المؤسسة الوطنية للتجارة"}'::jsonb,
  '{"fr": "456 Avenue des Affaires", "ar": "456 شارع الأعمال"}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Insert test cheque/lcr
INSERT INTO cheques_lcr (
  id,
  payment_type,
  payment_mode,
  reference,
  issue_date,
  due_date,
  amount,
  beneficiary_id,
  bank_account_id,
  status,
  notes
)
VALUES (
  1,
  'check',
  'pay',
  'CHQ-001',
  NOW(),
  NOW() + INTERVAL '30 days',
  5000.00,
  1,
  1,
  'pending',
  'Test cheque'
) ON CONFLICT (id) DO NOTHING;