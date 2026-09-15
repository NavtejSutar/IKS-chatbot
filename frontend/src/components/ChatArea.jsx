import React, { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { 
  User, Copy, Check, Volume2, VolumeX, Sparkles, Compass, 
  Calculator, HeartPulse, Crown, Landmark, Brain, Flame 
} from "lucide-react";
import { IKS_PROMPTS } from "../data/iksData";

const categoryIconMap = {
  Calculator: Calculator,
  HeartPulse: HeartPulse,
  Crown: Crown,
  Landmark: Landmark,
  Brain: Brain,
  Flame: Flame
};

export default function ChatArea({
  messages,
  isGenerating,
  onSelectPrompt,
  subhashita
}) {
  const messagesEndRef = useRef(null);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [speakingIndex, setSpeakingIndex] = useState(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  // Copy handler
  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Text to Speech handler
  const handleSpeech = (text, idx) => {
    if (!window.speechSynthesis) return;

    if (speakingIndex === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Strip markdown formatting for speech
    const cleanText = text
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
      .replace(/[\*\_#`\$]/g, "")
      .replace(/<[^>]*>/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes("en-IN") || v.name.includes("India"));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setSpeakingIndex(idx);
    utterance.onend = utterance.onerror = () => setSpeakingIndex(null);

    window.speechSynthesis.speak(utterance);
  };

  // If no messages, render Welcome Hero
  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full text-center space-y-6">
          
          {/* Emblem Icon */}
          <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-amber-600 to-orange-600 flex items-center justify-center shadow-xl shadow-amber-500/25">
            <span className="font-heading text-4xl text-white font-black">ॐ</span>
            <div className="absolute -inset-2 rounded-[28px] border border-dashed border-amber-400/50 animate-spin" style={{ animationDuration: "25s" }} />
          </div>

          {/* Heading */}
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-black tracking-wide bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              Indian Knowledge Systems
            </h2>
            <p className="mt-2 text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore 5,000+ years of classical Indian sciences, mathematics, surgery, statecraft, metallurgy, and philosophy through an intelligent Spring AI Tool-Calling RAG engine.
            </p>
          </div>

          {/* Subhashita Banner */}
          {subhashita && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 max-w-2xl mx-auto backdrop-blur-md">
              <p className="font-heading font-semibold text-amber-300 text-sm md:text-base whitespace-pre-line leading-relaxed">
                {subhashita.sanskrit}
              </p>
              <p className="mt-2 text-xs md:text-sm text-slate-300 italic">
                "{subhashita.translation}"
              </p>
            </div>
          )}

          {/* Prompt Categories Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-left pt-2">
            {IKS_PROMPTS.map((cat, idx) => {
              const IconComp = categoryIconMap[cat.icon] || Sparkles;
              const randomPrompt = cat.prompts[Math.floor(Math.random() * cat.prompts.length)];
              return (
                <div
                  key={idx}
                  onClick={() => onSelectPrompt(randomPrompt)}
                  className="group p-4 rounded-2xl bg-[#1a2234]/60 hover:bg-[#1e293b]/90 border border-white/10 hover:border-amber-500/50 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" 
                      style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="font-semibold text-sm text-slate-200 group-hover:text-amber-300 transition-colors">
                      {cat.category}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {randomPrompt}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    );
  }

  // Render Chat Messages List
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.map((msg, idx) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={idx}
              className={`flex gap-3.5 ${isUser ? "flex-row-reverse" : "flex-row"} animate-fadeIn`}
            >
              {/* Avatar */}
              <div 
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-semibold shadow-md ${
                  isUser 
                    ? "bg-slate-800 text-amber-400 border border-white/10" 
                    : "bg-gradient-to-tr from-amber-500 to-orange-600 text-white shadow-amber-500/20 font-heading"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : "ॐ"}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-4.5 text-sm md:text-[15px] leading-relaxed relative ${
                  isUser 
                    ? "bg-gradient-to-br from-amber-600/25 to-amber-700/15 border border-amber-500/30 text-slate-100 rounded-tr-sm" 
                    : "bg-[#1a2234]/80 border border-white/10 text-slate-200 rounded-tl-sm shadow-md"
                }`}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div>
                    <div className="prose-iks">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(msg.content, idx)}
                        className="px-2.5 py-1 rounded-lg text-xs text-slate-400 hover:text-amber-300 hover:bg-white/5 flex items-center gap-1.5 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIndex === idx ? "Copied" : "Copy"}</span>
                      </button>

                      <button
                        onClick={() => handleSpeech(msg.content, idx)}
                        className="px-2.5 py-1 rounded-lg text-xs text-slate-400 hover:text-amber-300 hover:bg-white/5 flex items-center gap-1.5 transition-colors"
                        title="Read out loud"
                      >
                        {speakingIndex === idx ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Read</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Dynamic Tool Calling / Generating Indicator */}
        {isGenerating && (
          <div className="flex gap-3.5 animate-fadeIn">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shrink-0 text-white font-heading shadow-md shadow-amber-500/20">
              ॐ
            </div>
            <div className="bg-[#1a2234]/80 border border-white/10 rounded-2xl rounded-tl-sm p-4 space-y-2 shadow-md">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                <Compass className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Consulting Indian Knowledge Systems Tool RAG...</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "-0.32s" }} />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: "-0.16s" }} />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
