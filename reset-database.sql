-- Drop existing tables
DROP TABLE IF EXISTS cheques_lcr;
DROP TABLE IF EXISTS bank_accounts;
DROP TABLE IF EXISTS banks;
DROP TABLE IF EXISTS beneficiaries;
DROP TABLE IF EXISTS emitters;

-- Create tables
CREATE TABLE banks (
  id SERIAL PRIMARY KEY,
  name JSONB NOT NULL,
  code VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bank_accounts (
  id SERIAL PRIMARY KEY,
  bank_id INTEGER REFERENCES banks(id),
  account_number VARCHAR(50) NOT NULL,
  rib VARCHAR(50) NOT NULL,
  title JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE beneficiaries (
  id SERIAL PRIMARY KEY,
  name JSONB NOT NULL,
  address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE emitters (
  id SERIAL PRIMARY KEY,
  name JSONB NOT NULL,
  address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cheques_lcr (
  id SERIAL PRIMARY KEY,
  payment_type VARCHAR(10) NOT NULL CHECK (payment_type IN ('check', 'lcr')),
  payment_mode VARCHAR(10) NOT NULL CHECK (payment_mode IN ('pay', 'receive')),
  reference VARCHAR(50) NOT NULL,
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  beneficiary_id INTEGER REFERENCES beneficiaries(id),
  emitter_id INTEGER REFERENCES emitters(id),
  bank_account_id INTEGER REFERENCES bank_accounts(id),
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert test data
INSERT INTO banks (name, code) VALUES (
  '{"fr": "Banque Populaire", "ar": "البنك الشعبي"}',
  'BP001'
);

INSERT INTO bank_accounts (bank_id, account_number, rib, title) VALUES (
  1,
  '007123456789',
  '123456789012345678901',
  '{"fr": "Compte Principal", "ar": "الحساب الرئيسي"}'
);

INSERT INTO beneficiaries (name, address) VALUES (
  '{"fr": "Société Générale de Services", "ar": "الشركة العامة للخدمات"}',
  '{"fr": "123 Rue du Commerce", "ar": "123 شارع التجارة"}'
);

INSERT INTO emitters (name, address) VALUES (
  '{"fr": "Entreprise Nationale de Commerce", "ar": "المؤسسة الوطنية للتجارة"}',
  '{"fr": "456 Avenue des Affaires", "ar": "456 شارع الأعمال"}'
);