import React, { useState } from "react";
import { X, Search, Database, FileText, Loader2 } from "lucide-react";
import { apiService } from "../services/api";

export default function VectorInspectorModal({
  isOpen,
  onClose
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setError(null);
    try {
      const data = await apiService.searchVectorStore(query.trim());
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl max-h-[85vh] bg-[#111827] border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp">
        
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between bg-[#1a2234]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-cyan-300 text-lg">ChromaDB Vector Store Inspector</h3>
              <p className="text-xs text-slate-400">Directly query semantic embeddings generated from IKS reference documents</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Query Input */}
        <form onSubmit={handleSearch} className="p-4 border-b border-white/10 bg-[#0f172a]/50 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter search query to test vector similarity (e.g., Kanheri water management, Madhava series)..."
              className="w-full pl-10 pr-4 py-2 bg-[#1a2234] border border-white/10 focus:border-cyan-500/50 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-40 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-all"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Inspect</span>
          </button>
        </form>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
              <strong>Vector Search Error:</strong> {error}
            </div>
          )}

          {results === null && !loading && !error && (
            <div className="text-center py-16 text-slate-400 text-xs space-y-2">
              <Database className="w-8 h-8 text-cyan-400/40 mx-auto" />
              <p>Type a topic or concept above to query ChromaDB top-K semantic chunks.</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-16 text-cyan-400 text-xs space-y-2">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-cyan-400" />
              <p>Searching ChromaDB Vector Store...</p>
            </div>
          )}

          {results && results.length === 0 && !loading && (
            <div className="text-center py-16 text-slate-400 text-xs">
              No matching chunks found in ChromaDB vector store.
            </div>
          )}

          {results && results.map((doc, idx) => {
            const content = doc.text || doc.content || JSON.stringify(doc);
            const metadata = doc.metadata ? JSON.stringify(doc.metadata, null, 2) : null;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#1a2234] border border-white/10 space-y-2 text-xs font-mono"
              >
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <FileText className="w-4 h-4" />
                  <span>Document Chunk #{idx + 1}</span>
                </div>
                <p className="text-slate-300 whitespace-pre-wrap leading-relaxed font-sans text-xs">
                  {content}
                </p>
                {metadata && (
                  <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400">
                    <strong>Metadata:</strong> {metadata}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
