import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ERD_TABLES, ERD_RELATIONSHIPS, SQL_SCHEMA_DDL } from "../data/databaseSchema";
import { 
  X, 
  Database, 
  Link2, 
  Copy, 
  Check, 
  Code2, 
  Table2 
} from "lucide-react";

export default function DatabaseERDModal() {
  const { isErdModalOpen, setIsErdModalOpen } = useCart();
  const [activeTab, setActiveTab] = useState("diagram");
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isErdModalOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_DDL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      
      <div className="absolute inset-0" onClick={() => setIsErdModalOpen(false)} />

      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 bg-black text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center text-white border border-neutral-800">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Exercise 4
              </span>
              <h2 className="text-base font-black">
                E-Commerce Database Schema (ERD)
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsErdModalOpen(false)}
            className="w-7 h-7 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="px-5 py-2.5 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("diagram")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "diagram"
                  ? "bg-black text-white"
                  : "text-neutral-600 hover:text-black"
              }`}
            >
              <Table2 className="w-3.5 h-3.5" />
              <span>ERD Diagram</span>
            </button>

            <button
              onClick={() => setActiveTab("relations")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "relations"
                  ? "bg-black text-white"
                  : "text-neutral-600 hover:text-black"
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Relationships</span>
            </button>

            <button
              onClick={() => setActiveTab("sql")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "sql"
                  ? "bg-black text-white"
                  : "text-neutral-600 hover:text-black"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>SQL DDL</span>
            </button>
          </div>

          {activeTab === "sql" && (
            <button
              onClick={handleCopySql}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-colors shadow-xs"
            >
              {copiedSql ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy SQL</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1">
          
          {activeTab === "diagram" && (
            <div className="space-y-5">
              
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600">
                Entity Relationship Diagram for the 5 required tables: <strong>Customers</strong>, <strong>Categories</strong>, <strong>Products</strong>, <strong>Orders</strong>, and <strong>Order_Items</strong>.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ERD_TABLES.map((table) => (
                  <div
                    key={table.name}
                    className="rounded-xl border border-neutral-300 bg-white overflow-hidden flex flex-col justify-between text-xs"
                  >
                    <div className="px-3.5 py-2.5 bg-black text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Table2 className="w-3.5 h-3.5 text-neutral-400" />
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                          {table.name}
                        </h4>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {table.columns.length} cols
                      </span>
                    </div>

                    <div className="p-3 divide-y divide-neutral-100 flex-1">
                      {table.columns.map((col) => (
                        <div key={col.name} className="py-1 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            {col.isPk ? (
                              <span className="px-1 py-0.2 rounded text-[9px] font-black bg-neutral-200 text-black font-mono">
                                PK
                              </span>
                            ) : col.isFk ? (
                              <span className="px-1 py-0.2 rounded text-[9px] font-black bg-neutral-100 text-neutral-700 font-mono">
                                FK
                              </span>
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                            )}
                            <span className={`font-mono ${col.isPk ? "font-bold text-black" : "text-neutral-700"}`}>
                              {col.name}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-neutral-400">
                            {col.type}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="p-2 bg-neutral-50 border-t border-neutral-200 text-[10px] text-neutral-500">
                      {table.description}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {activeTab === "relations" && (
            <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-200 text-xs">
              <div className="bg-neutral-100 p-3 font-bold text-black grid grid-cols-12 gap-2">
                <span className="col-span-3">Parent</span>
                <span className="col-span-3">Child</span>
                <span className="col-span-2">Type</span>
                <span className="col-span-4">Rule</span>
              </div>
              {ERD_RELATIONSHIPS.map((rel, idx) => (
                <div key={idx} className="p-3 grid grid-cols-12 gap-2 items-center bg-white">
                  <span className="col-span-3 font-mono font-bold text-black">
                    {rel.from}.{rel.fromKey}
                  </span>
                  <span className="col-span-3 font-mono font-bold text-black">
                    {rel.to}.{rel.toKey}
                  </span>
                  <span className="col-span-2">
                    <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-black font-mono text-[10px] font-bold">
                      {rel.type}
                    </span>
                  </span>
                  <span className="col-span-4 text-neutral-600">
                    {rel.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "sql" && (
            <pre className="p-4 rounded-xl bg-black text-neutral-200 font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800">
              <code>{SQL_SCHEMA_DDL}</code>
            </pre>
          )}

        </div>

        {/* Footer */}
        <div className="p-3.5 bg-neutral-50 border-t border-neutral-200 flex justify-end">
          <button
            onClick={() => setIsErdModalOpen(false)}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-black text-white hover:bg-neutral-800"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
