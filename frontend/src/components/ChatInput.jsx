import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Sparkles } from "lucide-react";

export default function ChatInput({
  onSendMessage,
  isGenerating,
  onShowToast
}) {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  // Setup Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.lang = "en-IN";
      rec.continuous = false;
      rec.interimResults = false;

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => (prev ? prev + " " + transcript : transcript));
      };

      rec.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        setIsRecording(false);
        if (event.error !== "no-speech") {
          onShowToast?.("Voice recognition error: " + event.error);
        }
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, [onShowToast]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      onShowToast?.("Voice recognition is not supported in this browser.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        onShowToast?.("Listening... Speak your query");
      } catch (err) {
        console.error("Speech start error:", err);
      }
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!input.trim() || isGenerating) return;
    onSendMessage(input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
  };

  const quickPrompts = [
    { title: "Madhava's π Series", text: "Explain Madhava of Sangamagrama's infinite series for π." },
    { title: "Sushruta's Surgery", text: "What surgical instruments and methods are detailed in Sushruta Samhita?" },
    { title: "Kautilya's Saptanga", text: "Explain Kautilya's Saptanga Theory of State in the Arthashastra." },
    { title: "Dharampal's Research", text: "What does Dharampal's 'The Beautiful Tree' prove about pre-colonial education in India?" },
    { title: "Nyaya Pramanas", text: "Explain the four Pramanas (valid means of knowledge) in Nyaya philosophy." },
    { title: "Kanheri Water Harvesting", text: "Describe the ancient rock-cut water management system at Kanheri Caves." }
  ];

  return (
    <div className="p-3 md:p-5 border-t border-white/10 bg-[#111827]/80 backdrop-blur-xl">
      <div className="max-w-4xl mx-auto space-y-3">
        
        {/* Quick Suggestion Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {quickPrompts.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(chip.text)}
              className="shrink-0 px-3 py-1.5 rounded-full bg-[#1a2234] hover:bg-[#1e293b] text-slate-300 hover:text-amber-300 border border-white/10 hover:border-amber-500/40 flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{chip.title}</span>
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form 
          onSubmit={handleSubmit}
          className="flex items-end gap-2 p-2 rounded-2xl bg-[#1a2234]/90 border border-white/10 focus-within:border-amber-500/50 focus-within:ring-2 focus-within:ring-amber-500/20 shadow-lg transition-all"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleRecording}
            className={`p-2.5 rounded-xl transition-all ${
              isRecording 
                ? "bg-rose-500 text-white animate-pulse" 
                : "text-slate-400 hover:text-amber-400 hover:bg-white/5"
            }`}
            title="Voice Dictation"
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about Indian Knowledge Systems, scholars, texts, theorems, or heritage..."
            className="flex-1 max-h-40 bg-transparent text-slate-100 placeholder-slate-400 text-sm md:text-[15px] focus:outline-none resize-none py-2 px-1"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isGenerating}
            className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 disabled:hover:from-amber-500 disabled:hover:to-amber-600 text-white font-semibold shadow-md shadow-amber-500/20 transition-all active:scale-95 shrink-0"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-center text-slate-400">
          Powered by Spring AI 2.0 • Groq LLM & Gemini Embeddings • ChromaDB Vector Search RAG
        </p>

      </div>
    </div>
  );
}
