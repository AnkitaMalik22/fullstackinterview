import React, { useState } from 'react';
import { Database } from 'lucide-react';

const DatabaseDesignViz: React.FC = () => {
  const [normalizationLevel, setNormalizationLevel] = useState<'1NF' | '2NF' | '3NF' | 'denorm'>('denorm');
  
  const schemas = {
    denorm: {
      title: 'Denormalized (No Normalization)',
      tables: [
        {
          name: 'orders',
          columns: ['order_id', 'customer_name', 'customer_email', 'customer_address', 'product_name', 'product_price', 'quantity', 'order_date'],
          issues: ['Data redundancy', 'Update anomalies', 'Delete anomalies']
        }
      ],
      description: 'All data in one table. Fast reads but data duplication.'
    },
    '1NF': {
      title: 'First Normal Form (1NF)',
      tables: [
        {
          name: 'orders',
          columns: ['order_id (PK)', 'customer_id', 'product_id', 'quantity', 'order_date'],
          issues: ['Partial dependencies still exist']
        },
        {
          name: 'customers',
          columns: ['customer_id (PK)', 'name', 'email', 'address'],
          issues: []
        },
        {
          name: 'products',
          columns: ['product_id (PK)', 'name', 'price'],
          issues: []
        }
      ],
      description: 'Atomic values, no repeating groups. Separate entities.'
    },
    '2NF': {
      title: 'Second Normal Form (2NF)',
      tables: [
        {
          name: 'orders',
          columns: ['order_id (PK)', 'customer_id (FK)', 'order_date'],
          issues: []
        },
        {
          name: 'order_items',
          columns: ['order_id (FK)', 'product_id (FK)', 'quantity', 'unit_price'],
          issues: []
        },
        {
          name: 'customers',
          columns: ['customer_id (PK)', 'name', 'email', 'address'],
          issues: ['Transitive dependency: address depends on zip']
        },
        {
          name: 'products',
          columns: ['product_id (PK)', 'name', 'price', 'category_name'],
          issues: ['Transitive dependency: category']
        }
      ],
      description: 'No partial dependencies. Every non-key depends on entire PK.'
    },
    '3NF': {
      title: 'Third Normal Form (3NF)',
      tables: [
        {
          name: 'orders',
          columns: ['order_id (PK)', 'customer_id (FK)', 'order_date'],
          issues: []
        },
        {
          name: 'order_items',
          columns: ['order_id (FK)', 'product_id (FK)', 'quantity', 'unit_price'],
          issues: []
        },
        {
          name: 'customers',
          columns: ['customer_id (PK)', 'name', 'email', 'address_id (FK)'],
          issues: []
        },
        {
          name: 'addresses',
          columns: ['address_id (PK)', 'street', 'city', 'zip'],
          issues: []
        },
        {
          name: 'products',
          columns: ['product_id (PK)', 'name', 'price', 'category_id (FK)'],
          issues: []
        },
        {
          name: 'categories',
          columns: ['category_id (PK)', 'name'],
          issues: []
        }
      ],
      description: 'No transitive dependencies. Every attribute depends only on PK.'
    }
  };

  const current = schemas[normalizationLevel];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Database className="text-brand-400" size={24} />
          Database Normalization
        </h3>
        <div className="flex gap-2">
          {(['denorm', '1NF', '2NF', '3NF'] as const).map(level => (
            <button
              key={level}
              onClick={() => setNormalizationLevel(level)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                normalizationLevel === level
                  ? 'bg-brand-600 text-white'
                  : 'bg-dark-700 text-slate-400 hover:text-white'
              }`}
            >
              {level === 'denorm' ? 'Raw' : level}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-dark-800 p-6 rounded-xl border border-dark-700">
        <h4 className="text-lg font-bold text-white mb-2">{current.title}</h4>
        <p className="text-sm text-slate-400 mb-6">{current.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {current.tables.map((table, idx) => (
            <div
              key={idx}
              className={`bg-dark-900 rounded-lg border ${
                table.issues.length > 0 ? 'border-yellow-500/50' : 'border-green-500/50'
              }`}
            >
              <div className={`px-4 py-2 border-b ${
                table.issues.length > 0 ? 'border-yellow-500/30 bg-yellow-500/10' : 'border-green-500/30 bg-green-500/10'
              }`}>
                <span className="font-mono text-sm font-bold text-white">{table.name}</span>
              </div>
              <div className="p-3 space-y-1">
                {table.columns.map((col, cidx) => (
                  <div key={cidx} className="text-xs font-mono text-slate-400 flex items-center gap-2">
                    <span className={col.includes('PK') ? 'text-yellow-400' : col.includes('FK') ? 'text-blue-400' : ''}>
                      {col}
                    </span>
                  </div>
                ))}
              </div>
              {table.issues.length > 0 && (
                <div className="px-3 pb-3">
                  {table.issues.map((issue, iidx) => (
                    <div key={iidx} className="text-xs text-yellow-400 mt-1">⚠️ {issue}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs">
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <div className="text-2xl font-bold text-white mb-1">{current.tables.length}</div>
          <div className="text-slate-400">Tables</div>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <div className="text-2xl font-bold text-white mb-1">
            {normalizationLevel === 'denorm' ? 'High' : normalizationLevel === '3NF' ? 'None' : 'Medium'}
          </div>
          <div className="text-slate-400">Redundancy</div>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <div className="text-2xl font-bold text-white mb-1">
            {normalizationLevel === 'denorm' ? 'Fast' : normalizationLevel === '3NF' ? 'Slower' : 'Medium'}
          </div>
          <div className="text-slate-400">Read Speed</div>
        </div>
        <div className="bg-dark-800 p-4 rounded-lg border border-dark-700">
          <div className="text-2xl font-bold text-white mb-1">
            {normalizationLevel === 'denorm' ? 'Risky' : 'Safe'}
          </div>
          <div className="text-slate-400">Data Integrity</div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseDesignViz;
