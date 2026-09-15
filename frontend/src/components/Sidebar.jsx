import React, { useState } from "react";
import { 
  Plus, MessageSquare, Trash2, BookOpen, Clock, ChevronDown, ChevronRight,
  Landmark, Trees, GraduationCap, Droplets, HeartPulse, Flame, 
  Calculator, Brain, Crown, Theater, Building, Sprout, SpellCheck, X
} from "lucide-react";

export default function Sidebar({
  isOpen,
  onClose,
  sessions,
  currentSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  onSelectTopic
}) {
  const [activeTab, setActiveTab] = useState("history"); // "history" | "curriculum"
  const [expandedModules, setExpandedModules] = useState({ 1: true, 2: true, 3: false });

  const toggleModule = (modNum) => {
    setExpandedModules(prev => ({ ...prev, [modNum]: !prev[modNum] }));
  };

  const sessionIds = Object.keys(sessions).reverse();

  return (
    <aside 
      className={`fixed md:static inset-y-0 left-0 z-40 w-72 bg-[#111827]/90 dark:bg-[#111827]/90 backdrop-blur-xl border-r border-white/10 flex flex-col transition-all duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-600 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 font-heading font-black text-xl">
            ॐ
          </div>
          <div>
            <h1 className="font-heading font-bold text-amber-400 text-lg leading-tight tracking-wider">ज्ञान सेतु</h1>
            <span className="text-[11px] text-slate-400 font-medium">IKS AI Assistant</span>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNewSession}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm">New Conversation</span>
        </button>
      </div>

      {/* Tab Selectors */}
      <div className="flex px-3 gap-1 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "history" 
              ? "bg-white/10 text-amber-400" 
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Clock className="w-3.5 h-3.5" /> History
        </button>
        <button
          onClick={() => setActiveTab("curriculum")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === "curriculum" 
              ? "bg-white/10 text-amber-400" 
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" /> Syllabus
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {activeTab === "history" ? (
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1.5">
              Recent Chats
            </div>
            {sessionIds.length === 0 ? (
              <div className="text-xs text-slate-400 text-center py-6">No past conversations</div>
            ) : (
              sessionIds.map(id => {
                const s = sessions[id];
                const isActive = id === currentSessionId;
                return (
                  <div
                    key={id}
                    onClick={() => onSelectSession(id)}
                    className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                      isActive 
                        ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" 
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <MessageSquare className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                      <span className="text-xs truncate font-medium">{s.title || "Conversation"}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSession(id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-400 transition-opacity"
                      title="Delete chat"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
              IKS Curriculum Navigator
            </div>

            {/* Module 1 */}
            <div className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
              <button
                onClick={() => toggleModule(1)}
                className="w-full p-2.5 flex items-center justify-between text-left text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10"
              >
                <span>Module 1: Foundations & Context</span>
                {expandedModules[1] ? <ChevronDown className="w-4 h-4 text-amber-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
              </button>
              {expandedModules[1] && (
                <div className="p-1.5 space-y-1">
                  <button 
                    onClick={() => onSelectTopic("Explain the colonial education policies of Macaulay and Bentinck vs indigenous education.")}
                    className="w-full text-left p-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2"
                  >
                    <Landmark className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Colonial Policies & Macaulay
                  </button>
                  <button 
                    onClick={() => onSelectTopic("What did Dharampal uncover in British archives regarding indigenous Indian education in 'The Beautiful Tree'?")}
                    className="w-full text-left p-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2"
                  >
                    <Trees className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Dharampal's Discoveries
                  </button>
                  <button 
                    onClick={() => onSelectTopic("Describe the organisation and teaching systems of ancient universities: Nalanda, Takshashila, and Valabhi.")}
                    className="w-full text-left p-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> Ancient Universities
                  </button>
                  <button 
                    onClick={() => onSelectTopic("Describe the ancient rock-cut water harvesting and management system at Kanheri Caves.")}
                    className="w-full text-left p-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2"
                  >
                    <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Kanheri Water Engineering
                  </button>
                </div>
              )}
            </div>

            {/* Module 2 */}
            <div className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
              <button
                onClick={() => toggleModule(2)}
                className="w-full p-2.5 flex items-center justify-between text-left text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10"
              >
                <span>Module 2: Core Disciplines</span>
                {expandedModules[2] ? <ChevronDown className="w-4 h-4 text-amber-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
              </button>
              {expandedModules[2] && (
                <div className="p-1.5 space-y-1">
                  <button 
                    onClick={() => onSelectTopic("Explain the medical treatises and surgical innovations of Charaka and Sushruta.")}
                    className="w-full text-left p-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2"
                  >
                    <HeartPulse className="w-3.5 h-3.5 text-rose-400 shrink-0" /> Ayurveda & Shalya Tantra
                  </button>
                  <button 
                    onClick={() => onSelectTopic("Explain ancient Indian metallurgy, zinc smelting at Zawar, and Nagarjuna's Rasaratnakara.")}
                    className="w-full text-left p-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2"
                  >
                    <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" /> Rasashastra & Metallurgy
                  </button>
                  <button 
                    onClick={() => onSelectTopic("Detail Indian mathematical breakthroughs from Aryabhata, Brahmagupta, Bhaskara II, to Madhava's infinite series.")}
                    className="w-full text-left p-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2"
                  >
                    <Calculator className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Ganita & Astronomy
                  </button>
                  <button 
                    onClick={() => onSelectTopic("Explain Nyaya epistemology, the 4 Pramanas, and the 5-step Pancha-Avayava syllogism.")}
                    className="w-full text-left p-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2"
                  >
                    <Brain className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Nyaya Logic & Epistemology
                  </button>
                  <button 
                    onClick={() => onSelectTopic("Explain Kautilya's Arthashastra, Saptanga theory of statecraft, and Kamandaka's Nitisara.")}
                    className="w-full text-left p-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2"
                  >
                    <Crown className="w-3.5 h-3.5 text-yellow-400 shrink-0" /> Arthashastra & Statecraft
                  </button>
                </div>
              )}
            </div>

            {/* Module 3 */}
            <div className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
              <button
                onClick={() => toggleModule(3)}
                className="w-full p-2.5 flex items-center justify-between text-left text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10"
              >
                <span>Module 3: Elective Topics</span>
                {expandedModules[3] ? <ChevronDown className="w-4 h-4 text-amber-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
              </button>
              {expandedModules[3] && (
                <div className="p-1.5 space-y-1">
                  <button 
                    onClick={() => onSelectTopic("Explain Natyashastra, the eight classical Rasas, and Indian aesthetic theory.")}
                    className="w-full text-left p-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2"
                  >
                    <Theater className="w-3.5 h-3.5 text-pink-400 shrink-0" /> Natyashastra & Aesthetics
                  </button>
                  <button 
                    onClick={() => onSelectTopic("What were the principles of ancient Indian town planning, architecture, and Vastu Vidya?")}
                    className="w-full text-left p-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2"
                  >
                    <Building className="w-3.5 h-3.5 text-teal-400 shrink-0" /> Town Planning & Vastu
                  </button>
                  <button 
                    onClick={() => onSelectTopic("Explain ancient Indian agricultural knowledge, seed preservation, and Krishi Shastra treatises.")}
                    className="w-full text-left p-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2"
                  >
                    <Sprout className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Krishi Shastra (Agriculture)
                  </button>
                  <button 
                    onClick={() => onSelectTopic("Explain Panini's Ashtadhyayi and the formal computational structure of Sanskrit grammar.")}
                    className="w-full text-left p-2 rounded-lg text-xs text-slate-300 hover:bg-white/5 hover:text-amber-300 flex items-center gap-2"
                  >
                    <SpellCheck className="w-3.5 h-3.5 text-violet-400 shrink-0" /> Vyakarana & Linguistics
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer System Status */}
      <div className="p-3 border-t border-white/10 bg-black/20">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
            <span className="text-[11px] text-slate-300 font-medium">Groq + ChromaDB</span>
          </div>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Spring AI 2.0</span>
        </div>
      </div>
    </aside>
  );
}
