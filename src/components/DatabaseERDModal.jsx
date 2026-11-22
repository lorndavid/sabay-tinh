import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ERD_TABLES, ERD_RELATIONSHIPS, SQL_SCHEMA_DDL } from "../data/databaseSchema";
import { 
  X, 
  Database, 
  Key, 
  Link2, 
  Copy, 
  Check, 
  Code2, 
  Table2, 
  Layers, 
  FileCode 
} from "lucide-react";

export default function DatabaseERDModal() {
  const { isErdModalOpen, setIsErdModalOpen } = useCart();
  const [activeTab, setActiveTab] = useState("diagram"); // 'diagram' | 'relations' | 'sql'
  const [copiedSql, setCopiedSql] = useState(false);

  if (!isErdModalOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_DDL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={() => setIsErdModalOpen(false)} />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden z-10 my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-neutral-950 text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white border border-neutral-700">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                  Practical Exercise 4
                </span>
                <span className="text-xs text-neutral-400">Database Design & ERD</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black mt-0.5">
                E-Commerce Order Relational Database (ERD)
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsErdModalOpen(false)}
            className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="px-6 py-3 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("diagram")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "diagram"
                  ? "bg-white text-neutral-950 shadow-xs"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              <Table2 className="w-3.5 h-3.5" />
              <span>Interactive ERD Diagram</span>
            </button>

            <button
              onClick={() => setActiveTab("relations")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "relations"
                  ? "bg-white text-neutral-950 shadow-xs"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Relationships (Foreign Keys)</span>
            </button>

            <button
              onClick={() => setActiveTab("sql")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "sql"
                  ? "bg-white text-neutral-950 shadow-xs"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>SQL Schema (DDL)</span>
            </button>
          </div>

          {activeTab === "sql" && (
            <button
              onClick={handleCopySql}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 transition-colors shadow-xs"
            >
              {copiedSql ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied SQL!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy SQL Script</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: Visual Interactive ERD Diagram */}
          {activeTab === "diagram" && (
            <div className="space-y-6">
              
              {/* Task Explanation */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs">
                <span className="font-bold text-neutral-900 block mb-1">
                  Task: ចូរគូរ ERD ដើម្បីបង្ហាញទំនាក់ទំនងរវាង Tables ទាំង ៥:
                </span>
                <p className="text-neutral-600 leading-relaxed">
                  គំនូសបំព្រួញ Entity Relationship Diagram (ERD) នេះតំណាងឱ្យប្រព័ន្ធ e-commerce ពេញលេញ រួមមាន <strong>Customers</strong>, <strong>Categories</strong>, <strong>Products</strong>, <strong>Orders</strong>, និង <strong>Order_Items</strong> ជាមួយ Primary Keys (PK) និង Foreign Keys (FK)។
                </p>
              </div>

              {/* 5 Schema Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {ERD_TABLES.map((table) => (
                  <div
                    key={table.name}
                    className="rounded-2xl border border-neutral-300 bg-white shadow-xs overflow-hidden flex flex-col justify-between"
                  >
                    {/* Table Title Bar */}
                    <div className="px-4 py-3 bg-neutral-950 text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Table2 className="w-4 h-4 text-neutral-300" />
                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                          {table.name}
                        </h4>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {table.columns.length} columns
                      </span>
                    </div>

                    <div className="p-2.5 bg-neutral-50 border-b border-neutral-200 text-[11px] text-neutral-500">
                      {table.label}
                    </div>

                    {/* Columns List */}
                    <div className="p-3 divide-y divide-neutral-100 flex-1">
                      {table.columns.map((col) => (
                        <div key={col.name} className="py-1.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            {col.isPk ? (
                              <span className="inline-flex items-center px-1 py-0.2 rounded text-[9px] font-black bg-amber-100 text-amber-800 border border-amber-300 font-mono">
                                PK
                              </span>
                            ) : col.isFk ? (
                              <span className="inline-flex items-center px-1 py-0.2 rounded text-[9px] font-black bg-blue-100 text-blue-800 border border-blue-300 font-mono">
                                FK
                              </span>
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-neutral-200" />
                            )}
                            <span className={`font-mono ${col.isPk ? "font-bold text-neutral-950" : "text-neutral-800"}`}>
                              {col.name}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-neutral-400">
                            {col.type}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Table Description Footer */}
                    <div className="p-2.5 bg-neutral-50/70 border-t border-neutral-200 text-[10px] text-neutral-500">
                      {table.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual Cardinality Flowchart */}
              <div className="p-5 rounded-2xl bg-neutral-900 text-white">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-emerald-400" />
                  Visual Relational Architecture & Cardinality Flow
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-neutral-800 border border-neutral-700">
                    <span className="text-emerald-400 font-bold block mb-1">Categories (1)</span>
                    <div className="text-[11px] text-neutral-400 mb-2">owns multiple products</div>
                    <div className="text-white font-bold">─── 1:N ───&gt; Products</div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-800 border border-neutral-700">
                    <span className="text-emerald-400 font-bold block mb-1">Customers (1)</span>
                    <div className="text-[11px] text-neutral-400 mb-2">places multiple orders</div>
                    <div className="text-white font-bold">─── 1:N ───&gt; Orders</div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-800 border border-neutral-700">
                    <span className="text-emerald-400 font-bold block mb-1">Orders (1)</span>
                    <div className="text-[11px] text-neutral-400 mb-2">contains line items</div>
                    <div className="text-white font-bold">─── 1:N ───&gt; Order_Items</div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-800 border border-neutral-700">
                    <span className="text-emerald-400 font-bold block mb-1">Products (1)</span>
                    <div className="text-[11px] text-neutral-400 mb-2">referenced in orders</div>
                    <div className="text-white font-bold">─── 1:N ───&gt; Order_Items</div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Relational Integrity & Foreign Keys */}
          {activeTab === "relations" && (
            <div className="space-y-4">
              <div className="border border-neutral-200 rounded-2xl overflow-hidden divide-y divide-neutral-200 text-xs">
                <div className="bg-neutral-100 p-3.5 font-bold text-neutral-800 grid grid-cols-12 gap-2">
                  <span className="col-span-3">Parent Table</span>
                  <span className="col-span-3">Child Table</span>
                  <span className="col-span-2">Cardinality</span>
                  <span className="col-span-4">Relationship Logic</span>
                </div>
                {ERD_RELATIONSHIPS.map((rel, idx) => (
                  <div key={idx} className="p-3.5 grid grid-cols-12 gap-2 items-center bg-white">
                    <span className="col-span-3 font-mono font-bold text-neutral-900">
                      {rel.from}.{rel.fromKey}
                    </span>
                    <span className="col-span-3 font-mono font-bold text-blue-600">
                      {rel.to}.{rel.toKey}
                    </span>
                    <span className="col-span-2">
                      <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-mono text-[10px] font-bold">
                        {rel.type}
                      </span>
                    </span>
                    <span className="col-span-4 text-neutral-600">
                      {rel.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Complete SQL DDL Schema */}
          {activeTab === "sql" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Production SQL DDL script for MySQL / PostgreSQL:</span>
                <span className="font-mono">5 Tables • Indexes • Foreign Keys</span>
              </div>
              <pre className="p-5 rounded-2xl bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800">
                <code>{SQL_SCHEMA_DDL}</code>
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex justify-end">
          <button
            onClick={() => setIsErdModalOpen(false)}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-neutral-950 text-white hover:bg-neutral-800 transition-colors"
          >
            Close Diagram
          </button>
        </div>

      </div>
    </div>
  );
}
