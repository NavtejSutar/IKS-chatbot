import React from "react";
import { 
  Menu, Scroll, Database, RefreshCw, Download, Trash2, Sun, Moon, Sparkles 
} from "lucide-react";

export default function Header({
  onToggleSidebar,
  onOpenScholars,
  onOpenVectorInspector,
  onSyncDoc,
  onExportChat,
  onClearChat,
  theme,
  onToggleTheme,
  subhashita
}) {
  return (
    <header className="h-16 px-4 md:px-6 border-b border-white/10 bg-[#111827]/80 backdrop-blur-xl flex items-center justify-between z-20">
      {/* Left controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-300 hover:text-amber-400 hover:bg-white/5 border border-white/10 transition-colors"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Subhashita banner */}
        <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 max-w-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-xs font-semibold text-amber-300 font-heading truncate">विद्या ददाति विनयं</span>
          <span className="text-[11px] text-slate-400 truncate">Knowledge gives humility & wisdom</span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1.5 md:gap-2">
        {/* Scholars Directory Modal Button */}
        <button
          onClick={onOpenScholars}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 flex items-center gap-2 text-xs font-semibold transition-all hover:border-amber-500/50 hover:text-amber-300"
          title="Scholars & Treatises Directory"
        >
          <Scroll className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Scholars</span>
        </button>

        {/* Vector Search Inspector Button */}
        <button
          onClick={onOpenVectorInspector}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 flex items-center gap-2 text-xs font-semibold transition-all hover:border-amber-500/50 hover:text-amber-300"
          title="Inspect ChromaDB Semantic Search"
        >
          <Database className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">Vector Search</span>
        </button>

        {/* Sync Knowledge Base Button */}
        <button
          onClick={onSyncDoc}
          className="p-2 md:px-3 md:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 flex items-center gap-2 text-xs font-semibold transition-all hover:border-amber-500/50 hover:text-amber-300"
          title="Re-index IKS PDF Knowledge Base"
        >
          <RefreshCw className="w-4 h-4 text-emerald-400" />
          <span className="hidden md:inline">Sync</span>
        </button>

        {/* Export Chat */}
        <button
          onClick={onExportChat}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
          title="Export Conversation as Markdown"
        >
          <Download className="w-4 h-4" />
        </button>

        {/* Clear Chat */}
        <button
          onClick={onClearChat}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-rose-400 border border-white/10 transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Theme Switcher */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 border border-white/10 transition-colors"
          title="Toggle Light / Dark Mode"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
