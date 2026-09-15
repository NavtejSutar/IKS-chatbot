import React, { useState } from "react";
import { X, Search, Scroll, ArrowRight } from "lucide-react";
import { IKS_SCHOLARS } from "../data/iksData";

export default function ScholarsModal({
  isOpen,
  onClose,
  onSelectScholar
}) {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filtered = IKS_SCHOLARS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.field.toLowerCase().includes(search.toLowerCase()) ||
    s.majorWorks.some(w => w.toLowerCase().includes(search.toLowerCase())) ||
    s.contributions.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[85vh] bg-[#111827] border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between bg-[#1a2234]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Scroll className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-amber-400 text-lg">IKS Scholars & Treatises Catalog</h3>
              <p className="text-xs text-slate-400">Classical Indian pioneers in mathematics, surgery, statecraft, metallurgy & logic</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-white/10 bg-[#0f172a]/50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by scholar name (e.g. Aryabhata, Sushruta, Madhava) or treatise..."
              className="w-full pl-10 pr-4 py-2 bg-[#1a2234] border border-white/10 focus:border-amber-500/50 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500/30"
            />
          </div>
        </div>

        {/* Scholars Grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-slate-400 text-sm">
              No matching scholars or treatises found.
            </div>
          ) : (
            filtered.map(s => (
              <div
                key={s.id}
                onClick={() => onSelectScholar(s)}
                className="group p-4.5 rounded-2xl bg-[#1a2234]/60 hover:bg-[#1e293b] border border-white/10 hover:border-amber-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-lg hover:shadow-amber-500/5"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-heading font-bold text-amber-300 text-base group-hover:text-amber-200 transition-colors">
                        {s.name}
                      </h4>
                      <span className="text-xs text-slate-400">{s.era} • {s.region}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/20 capitalize">
                      {s.category}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 mb-2">
                    <strong className="text-amber-400">Field:</strong> {s.field}
                  </div>

                  <div className="text-xs text-slate-300 mb-3">
                    <strong className="text-amber-400">Key Works:</strong> <em>{s.majorWorks.join(", ")}</em>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {s.contributions}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-amber-400 font-semibold group-hover:text-amber-300">
                  <span>Explore In Chat</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
