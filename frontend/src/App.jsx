import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChatArea from "./components/ChatArea";
import ChatInput from "./components/ChatInput";
import ScholarsModal from "./components/ScholarsModal";
import VectorInspectorModal from "./components/VectorInspectorModal";
import Toast from "./components/Toast";
import { apiService } from "./services/api";
import { IKS_SUBHASHITAS } from "./data/iksData";

export default function App() {
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem("iks_react_sessions");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScholarsOpen, setIsScholarsOpen] = useState(false);
  const [isVectorInspectorOpen, setIsVectorInspectorOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("iks_theme") || "dark");
  const [toasts, setToasts] = useState([]);
  const [subhashita, setSubhashita] = useState(null);

  // Initialize daily subhashita wisdom
  useEffect(() => {
    if (IKS_SUBHASHITAS && IKS_SUBHASHITAS.length > 0) {
      const rand = IKS_SUBHASHITAS[Math.floor(Math.random() * IKS_SUBHASHITAS.length)];
      setSubhashita(rand);
    }
  }, []);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("iks_theme", theme);
  }, [theme]);

  // Persist sessions
  useEffect(() => {
    try {
      localStorage.setItem("iks_react_sessions", JSON.stringify(sessions));
    } catch (e) {
      console.error("Failed to save sessions:", e);
    }
  }, [sessions]);

  // Ensure active session
  useEffect(() => {
    const keys = Object.keys(sessions);
    if (keys.length > 0 && (!currentSessionId || !sessions[currentSessionId])) {
      setCurrentSessionId(keys[keys.length - 1]);
    } else if (keys.length === 0 && !currentSessionId) {
      handleNewSession();
    }
  }, [sessions, currentSessionId]);

  // Toast Helper
  const showToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Session Handlers
  const handleNewSession = () => {
    const newId = "iks_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6);
    setSessions(prev => ({
      ...prev,
      [newId]: {
        id: newId,
        title: "New Conversation",
        createdAt: new Date().toISOString(),
        messages: []
      }
    }));
    setCurrentSessionId(newId);
  };

  const handleDeleteSession = (id) => {
    setSessions(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (currentSessionId === id) {
      const remaining = Object.keys(sessions).filter(k => k !== id);
      if (remaining.length > 0) {
        setCurrentSessionId(remaining[remaining.length - 1]);
      } else {
        handleNewSession();
      }
    }
    showToast("Conversation deleted");
  };

  // Send Message Flow
  const handleSendMessage = async (queryText) => {
    if (!queryText.trim() || isGenerating) return;

    let targetSessionId = currentSessionId;
    if (!targetSessionId || !sessions[targetSessionId]) {
      targetSessionId = "iks_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6);
      setSessions(prev => ({
        ...prev,
        [targetSessionId]: {
          id: targetSessionId,
          title: queryText.length > 35 ? queryText.substring(0, 32) + "..." : queryText,
          createdAt: new Date().toISOString(),
          messages: []
        }
      }));
      setCurrentSessionId(targetSessionId);
    }

    // Append user message
    setSessions(prev => {
      const current = prev[targetSessionId] || { messages: [] };
      const isFirst = current.messages.length === 0;
      return {
        ...prev,
        [targetSessionId]: {
          ...current,
          title: isFirst ? (queryText.length > 35 ? queryText.substring(0, 32) + "..." : queryText) : current.title,
          messages: [
            ...current.messages,
            { role: "user", content: queryText, timestamp: new Date().toISOString() }
          ]
        }
      };
    });

    setIsGenerating(true);

    try {
      // API call to Spring Boot backend
      const answer = await apiService.sendChat(queryText, targetSessionId);

      // Append assistant answer
      setSessions(prev => {
        const current = prev[targetSessionId];
        if (!current) return prev;
        return {
          ...prev,
          [targetSessionId]: {
            ...current,
            messages: [
              ...current.messages,
              { role: "assistant", content: answer, timestamp: new Date().toISOString() }
            ]
          }
        };
      });
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg = `**Connection Alert:** Unable to reach the IKS backend at \`/chat\`.\n\n*Error details:* ${err.message}\n\nPlease ensure the Spring Boot application is running and your Groq & ChromaDB keys are active.`;

      setSessions(prev => {
        const current = prev[targetSessionId];
        if (!current) return prev;
        return {
          ...prev,
          [targetSessionId]: {
            ...current,
            messages: [
              ...current.messages,
              { role: "assistant", content: errorMsg, timestamp: new Date().toISOString() }
            ]
          }
        };
      });
      showToast("Error contacting backend", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  // Scholar Selection
  const handleSelectScholar = (scholar) => {
    setIsScholarsOpen(false);
    handleSendMessage(`Tell me in detail about ${scholar.name}, their key works (${scholar.majorWorks.join(", ")}), and their major contributions to ${scholar.field}.`);
  };

  // Sync Knowledge Base
  const handleSyncDoc = async () => {
    if (!window.confirm("Do you want to re-process and index 'IKS_Scholars_Reference.pdf' into ChromaDB Vector Store?")) return;
    showToast("Processing and embedding PDF documents into ChromaDB...");
    try {
      const res = await apiService.syncDocument();
      showToast(`Success: ${res}`, "success");
    } catch (err) {
      showToast(`Sync error: ${err.message}`, "error");
    }
  };

  // Export Chat
  const handleExportChat = () => {
    const current = sessions[currentSessionId];
    if (!current || !current.messages || current.messages.length === 0) {
      showToast("No messages to export");
      return;
    }

    let markdown = `# IKS Chatbot Conversation - ${current.title}\n`;
    markdown += `*Date: ${new Date(current.createdAt).toLocaleString()}*\n\n---\n\n`;

    current.messages.forEach(msg => {
      const sender = msg.role === "user" ? "### 👤 User" : "### 🪔 IKS Assistant";
      markdown += `${sender}\n\n${msg.content}\n\n---\n\n`;
    });

    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `iks_chat_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Chat exported as Markdown");
  };

  // Clear Chat
  const handleClearChat = () => {
    const current = sessions[currentSessionId];
    if (!current || current.messages.length === 0) return;
    if (!window.confirm("Clear all messages in the current conversation?")) return;

    setSessions(prev => ({
      ...prev,
      [currentSessionId]: {
        ...prev[currentSessionId],
        messages: []
      }
    }));
    showToast("Conversation cleared");
  };

  const activeMessages = (currentSessionId && sessions[currentSessionId]) ? sessions[currentSessionId].messages : [];

  return (
    <div className="flex h-screen w-screen bg-[#0b0f19] text-slate-100 relative overflow-hidden font-body select-text">
      
      {/* Ambient glowing background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[120px] animate-orb-1" />
        <div className="absolute -bottom-24 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[140px] animate-orb-2" />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-orange-600/10 blur-[100px] animate-orb-3" />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex h-full w-full">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={(id) => {
            setCurrentSessionId(id);
            setIsSidebarOpen(false);
          }}
          onNewSession={handleNewSession}
          onDeleteSession={handleDeleteSession}
          onSelectTopic={(topic) => {
            handleSendMessage(topic);
            setIsSidebarOpen(false);
          }}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <Header
            onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
            onOpenScholars={() => setIsScholarsOpen(true)}
            onOpenVectorInspector={() => setIsVectorInspectorOpen(true)}
            onSyncDoc={handleSyncDoc}
            onExportChat={handleExportChat}
            onClearChat={handleClearChat}
            theme={theme}
            onToggleTheme={() => setTheme(prev => prev === "dark" ? "light" : "dark")}
            subhashita={subhashita}
          />

          <ChatArea
            messages={activeMessages}
            isGenerating={isGenerating}
            onSelectPrompt={handleSendMessage}
            subhashita={subhashita}
          />

          <ChatInput
            onSendMessage={handleSendMessage}
            isGenerating={isGenerating}
            onShowToast={showToast}
          />
        </main>
      </div>

      {/* Modals */}
      <ScholarsModal
        isOpen={isScholarsOpen}
        onClose={() => setIsScholarsOpen(false)}
        onSelectScholar={handleSelectScholar}
      />

      <VectorInspectorModal
        isOpen={isVectorInspectorOpen}
        onClose={() => setIsVectorInspectorOpen(false)}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} />

    </div>
  );
}
