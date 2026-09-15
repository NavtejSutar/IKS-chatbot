/**
 * IKS Chatbot Main Application Logic
 * Integrates with Spring AI RAG backend
 */

// State Management
const STATE = {
  currentSessionId: null,
  sessions: {},
  isGenerating: false,
  isRecording: false,
  speechSynth: window.speechSynthesis || null,
  currentUtterance: null,
  theme: localStorage.getItem("iks_theme") || "dark",
  apiUrl: localStorage.getItem("iks_api_url") || ""
};

function getApiBaseUrl() {
  const url = localStorage.getItem("iks_api_url") || "";
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

// DOM Elements
const elements = {
  themeToggleBtn: document.getElementById("themeToggleBtn"),
  sidebar: document.getElementById("sidebar"),
  toggleSidebarBtn: document.getElementById("toggleSidebarBtn"),
  closeSidebarBtn: document.getElementById("closeSidebarBtn"),
  btnNewChat: document.getElementById("btnNewChat"),
  chatHistoryList: document.getElementById("chatHistoryList"),
  messagesContainer: document.getElementById("messagesContainer"),
  welcomeHero: document.getElementById("welcomeHero"),
  cardsGrid: document.getElementById("cardsGrid"),
  quickChipsBar: document.getElementById("quickChipsBar"),
  chatForm: document.getElementById("chatForm"),
  chatInput: document.getElementById("chatInput"),
  btnSend: document.getElementById("btnSend"),
  btnVoiceInput: document.getElementById("btnVoiceInput"),
  btnDirectory: document.getElementById("btnDirectory"),
  btnVectorSearch: document.getElementById("btnVectorSearch"),
  btnSyncDoc: document.getElementById("btnSyncDoc"),
  btnApiSettings: document.getElementById("btnApiSettings"),
  btnClearChat: document.getElementById("btnClearChat"),
  btnExportChat: document.getElementById("btnExportChat"),
  sanskritQuoteEl: document.getElementById("sanskritQuote"),
  sanskritMeaningEl: document.getElementById("sanskritMeaning"),
  scholarsModal: document.getElementById("scholarsModal"),
  closeScholarsBtn: document.getElementById("closeScholarsBtn"),
  scholarsGrid: document.getElementById("scholarsGrid"),
  scholarSearchInput: document.getElementById("scholarSearchInput"),
  vectorModal: document.getElementById("vectorModal"),
  closeVectorBtn: document.getElementById("closeVectorBtn"),
  vectorSearchForm: document.getElementById("vectorSearchForm"),
  vectorQueryInput: document.getElementById("vectorQueryInput"),
  vectorResultsContainer: document.getElementById("vectorResultsContainer"),
  toastContainer: document.getElementById("toastContainer")
};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initSubhashita();
  initPromptCards();
  initCuratedChips();
  initScholarsDirectory();
  initSessions();
  initEventListeners();
  checkBackendHealth();
});

// Theme Management
function initTheme() {
  document.documentElement.setAttribute("data-theme", STATE.theme);
  updateThemeIcon();
}

function toggleTheme() {
  STATE.theme = STATE.theme === "dark" ? "light" : "dark";
  localStorage.setItem("iks_theme", STATE.theme);
  document.documentElement.setAttribute("data-theme", STATE.theme);
  updateThemeIcon();
}

function updateThemeIcon() {
  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.innerHTML = STATE.theme === "dark" 
      ? '<i class="fa-solid fa-sun"></i>' 
      : '<i class="fa-solid fa-moon"></i>';
  }
}

// Subhashita Wisdom Banner
function initSubhashita() {
  if (!IKS_DATA.subhashitas || IKS_DATA.subhashitas.length === 0) return;
  const rand = IKS_DATA.subhashitas[Math.floor(Math.random() * IKS_DATA.subhashitas.length)];
  if (elements.sanskritQuoteEl) elements.sanskritQuoteEl.textContent = rand.sanskrit;
  if (elements.sanskritMeaningEl) elements.sanskritMeaningEl.textContent = `"${rand.translation}"`;
}

// Prompt Cards in Welcome View
function initPromptCards() {
  if (!elements.cardsGrid) return;
  elements.cardsGrid.innerHTML = "";

  IKS_DATA.curatedPrompts.forEach((cat) => {
    const randomPrompt = cat.prompts[Math.floor(Math.random() * cat.prompts.length)];
    const card = document.createElement("div");
    card.className = "prompt-card";
    card.innerHTML = `
      <div class="card-header">
        <div class="card-icon" style="color:${cat.color}">
          <i class="fa-solid ${cat.icon}"></i>
        </div>
        <div class="card-title">${cat.category}</div>
      </div>
      <div class="card-desc">${randomPrompt}</div>
    `;
    card.addEventListener("click", () => {
      sendUserMessage(randomPrompt);
    });
    elements.cardsGrid.appendChild(card);
  });
}

// Quick Suggestion Chips above input
function initCuratedChips() {
  if (!elements.quickChipsBar) return;
  elements.quickChipsBar.innerHTML = "";

  const samplePrompts = [
    { title: "Madhava's π Series", query: "Explain Madhava of Sangamagrama's infinite series for π." },
    { title: "Sushruta's Surgery", query: "What surgical instruments and methods are detailed in Sushruta Samhita?" },
    { title: "Kautilya's Saptanga", query: "Explain Kautilya's Saptanga Theory of State in the Arthashastra." },
    { title: "Dharampal's Research", query: "What does Dharampal's 'The Beautiful Tree' prove about pre-colonial education in India?" },
    { title: "Nyaya Pramanas", query: "Explain the four Pramanas (valid means of knowledge) in Nyaya philosophy." },
    { title: "Kanheri Water Harvesting", query: "Describe the ancient rock-cut water management system at Kanheri Caves." }
  ];

  samplePrompts.forEach(item => {
    const chip = document.createElement("button");
    chip.className = "quick-chip";
    chip.innerHTML = `<i class="fa-solid fa-sparkles"></i> <span>${item.title}</span>`;
    chip.addEventListener("click", () => {
      sendUserMessage(item.query);
    });
    elements.quickChipsBar.appendChild(chip);
  });
}

// Session Management
function initSessions() {
  try {
    const saved = localStorage.getItem("iks_chat_sessions");
    if (saved) {
      STATE.sessions = JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load sessions from storage", e);
    STATE.sessions = {};
  }

  const sessionIds = Object.keys(STATE.sessions);
  if (sessionIds.length > 0) {
    switchSession(sessionIds[sessionIds.length - 1]);
  } else {
    createNewSession();
  }
}

function saveSessions() {
  try {
    localStorage.setItem("iks_chat_sessions", JSON.stringify(STATE.sessions));
  } catch (e) {
    console.error("Failed to save sessions", e);
  }
  renderSessionList();
}

function createNewSession() {
  const newId = "iks_conv_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
  STATE.sessions[newId] = {
    id: newId,
    title: "New Conversation",
    createdAt: new Date().toISOString(),
    messages: []
  };
  saveSessions();
  switchSession(newId);
}

function switchSession(sessionId) {
  if (!STATE.sessions[sessionId]) return;
  STATE.currentSessionId = sessionId;
  renderSessionList();
  renderCurrentChat();
  if (window.innerWidth <= 900 && elements.sidebar) {
    elements.sidebar.classList.remove("open");
  }
}

function deleteSession(sessionId, e) {
  if (e) e.stopPropagation();
  delete STATE.sessions[sessionId];
  const keys = Object.keys(STATE.sessions);
  if (keys.length === 0) {
    createNewSession();
  } else {
    saveSessions();
    if (STATE.currentSessionId === sessionId) {
      switchSession(keys[keys.length - 1]);
    }
  }
  showToast("Chat session deleted");
}

function renderSessionList() {
  if (!elements.chatHistoryList) return;
  elements.chatHistoryList.innerHTML = "";

  const sessionIds = Object.keys(STATE.sessions).reverse();
  if (sessionIds.length === 0) {
    elements.chatHistoryList.innerHTML = '<div style="padding: 0.8rem; font-size: 0.8rem; color: var(--text-muted); text-align: center;">No past conversations</div>';
    return;
  }

  sessionIds.forEach(id => {
    const s = STATE.sessions[id];
    const item = document.createElement("div");
    item.className = `session-item ${id === STATE.currentSessionId ? "active" : ""}`;
    item.innerHTML = `
      <div class="session-title">
        <i class="fa-regular fa-message"></i>
        <span>${escapeHtml(s.title || "Conversation")}</span>
      </div>
      <button class="session-delete-btn" title="Delete chat"><i class="fa-solid fa-trash-can"></i></button>
    `;
    item.addEventListener("click", () => switchSession(id));
    item.querySelector(".session-delete-btn").addEventListener("click", (e) => deleteSession(id, e));
    elements.chatHistoryList.appendChild(item);
  });
}

// Render Messages for Active Session
function renderCurrentChat() {
  const current = STATE.sessions[STATE.currentSessionId];
  if (!current || !current.messages || current.messages.length === 0) {
    if (elements.welcomeHero) elements.welcomeHero.style.display = "block";
    if (elements.messagesContainer) {
      // Clear dynamic messages but keep welcomeHero
      const msgRows = elements.messagesContainer.querySelectorAll(".message-row");
      msgRows.forEach(row => row.remove());
    }
    return;
  }

  if (elements.welcomeHero) elements.welcomeHero.style.display = "none";
  
  // Clear existing message rows
  const msgRows = elements.messagesContainer.querySelectorAll(".message-row");
  msgRows.forEach(row => row.remove());

  current.messages.forEach(msg => {
    appendMessageToDOM(msg.role, msg.content, false);
  });

  scrollToBottom();
}

// Message Rendering & Markdown / LaTeX Formatting
function formatMessageContent(rawText) {
  if (!rawText) return "";

  // 1. Process LaTeX math blocks: $$ ... $$ and \( ... \) or $ ... $
  let processed = rawText;
  
  // Process block math $$ ... $$
  processed = processed.replace(/\$\$([\s\S]*?)\$\$/g, (match, formula) => {
    try {
      if (window.katex) {
        return `<div class="katex-block">${katex.renderToString(formula.trim(), { displayMode: true, throwOnError: false })}</div>`;
      }
    } catch (e) {
      console.warn("KaTeX error", e);
    }
    return match;
  });

  // Process inline math $ ... $
  processed = processed.replace(/\$([^\$\n]+?)\$/g, (match, formula) => {
    try {
      if (window.katex) {
        return `<span class="katex-inline">${katex.renderToString(formula.trim(), { displayMode: false, throwOnError: false })}</span>`;
      }
    } catch (e) {
      console.warn("KaTeX inline error", e);
    }
    return match;
  });

  // 2. Parse Markdown with marked.js
  if (window.marked) {
    marked.setOptions({
      breaks: true,
      gfm: true
    });
    let html = marked.parse(processed);
    if (window.DOMPurify) {
      html = DOMPurify.sanitize(html, {
        ADD_TAGS: ['span', 'div', 'math', 'semantics', 'mrow', 'mi', 'mo', 'mn', 'annotation'],
        ADD_ATTR: ['class', 'style', 'aria-hidden', 'encoding']
      });
    }
    return html;
  }

  return escapeHtml(processed);
}

function appendMessageToDOM(role, content, animate = true) {
  if (elements.welcomeHero) elements.welcomeHero.style.display = "none";

  const row = document.createElement("div");
  row.className = `message-row ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.innerHTML = role === "user" 
    ? '<i class="fa-solid fa-user"></i>' 
    : '<i class="fa-solid fa-om"></i>';

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";

  if (role === "assistant") {
    bubble.innerHTML = `
      <div class="message-content">${formatMessageContent(content)}</div>
      <div class="message-actions">
        <button class="msg-action-btn btn-copy" title="Copy response"><i class="fa-regular fa-copy"></i> Copy</button>
        <button class="msg-action-btn btn-speak" title="Listen (TTS)"><i class="fa-solid fa-volume-high"></i> Read</button>
      </div>
    `;

    // Action button listeners
    const copyBtn = bubble.querySelector(".btn-copy");
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(content);
      showToast("Response copied to clipboard");
    });

    const speakBtn = bubble.querySelector(".btn-speak");
    speakBtn.addEventListener("click", () => toggleSpeech(content, speakBtn));
  } else {
    bubble.innerHTML = `<div class="message-content">${escapeHtml(content)}</div>`;
  }

  row.appendChild(avatar);
  row.appendChild(bubble);

  elements.messagesContainer.appendChild(row);
  scrollToBottom();
  return row;
}

// Typing Indicator Bubble
function showTypingIndicator() {
  const row = document.createElement("div");
  row.className = "message-row assistant typing-row";
  row.id = "typingIndicatorRow";

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.innerHTML = '<i class="fa-solid fa-om"></i>';

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.innerHTML = `
    <div class="tool-call-badge">
      <i class="fa-solid fa-compass"></i>
      <span>Consulting Indian Knowledge Systems Engine...</span>
    </div>
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
  `;

  row.appendChild(avatar);
  row.appendChild(bubble);
  elements.messagesContainer.appendChild(row);
  scrollToBottom();
}

function removeTypingIndicator() {
  const indicator = document.getElementById("typingIndicatorRow");
  if (indicator) indicator.remove();
}

// Send Message Flow
async function sendUserMessage(text) {
  const query = (text || elements.chatInput.value || "").trim();
  if (!query || STATE.isGenerating) return;

  // Clear input
  if (elements.chatInput) {
    elements.chatInput.value = "";
    elements.chatInput.style.height = "auto";
  }

  // Ensure current session exists
  if (!STATE.currentSessionId || !STATE.sessions[STATE.currentSessionId]) {
    createNewSession();
  }

  const session = STATE.sessions[STATE.currentSessionId];

  // Update session title if first message
  if (session.messages.length === 0) {
    session.title = query.length > 35 ? query.substring(0, 32) + "..." : query;
    saveSessions();
  }

  // Add User message
  session.messages.push({ role: "user", content: query, timestamp: new Date().toISOString() });
  saveSessions();
  appendMessageToDOM("user", query, true);

  // Set Generating state
  STATE.isGenerating = true;
  if (elements.btnSend) elements.btnSend.disabled = true;
  showTypingIndicator();

  try {
    // API Call to Spring Boot Backend
    const url = `${getApiBaseUrl()}/chat?prompt=${encodeURIComponent(query)}&conversationId=${encodeURIComponent(STATE.currentSessionId)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Accept": "text/plain, application/json, */*" }
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}: ${response.statusText}`);
    }

    const answer = await response.text();
    removeTypingIndicator();

    // Add Assistant message
    session.messages.push({ role: "assistant", content: answer, timestamp: new Date().toISOString() });
    saveSessions();
    appendMessageToDOM("assistant", answer, true);

  } catch (err) {
    console.error("Chat error:", err);
    removeTypingIndicator();

    const errorMsg = `**Connection Alert:** Unable to reach the IKS backend at \`/chat\`. \n\n*Error details:* ${err.message}\n\nPlease ensure your Spring Boot application is running and ChromaDB / Groq API keys are accessible.`;
    session.messages.push({ role: "assistant", content: errorMsg, timestamp: new Date().toISOString() });
    saveSessions();
    appendMessageToDOM("assistant", errorMsg, true);
    showToast("Error contacting IKS backend", "error");
  } finally {
    STATE.isGenerating = false;
    if (elements.btnSend) elements.btnSend.disabled = false;
    if (elements.chatInput) elements.chatInput.focus();
  }
}

// Text-to-Speech (TTS)
function toggleSpeech(text, btnElement) {
  if (!STATE.speechSynth) {
    showToast("Speech synthesis not supported in this browser");
    return;
  }

  if (STATE.speechSynth.speaking) {
    STATE.speechSynth.cancel();
    if (btnElement) btnElement.innerHTML = '<i class="fa-solid fa-volume-high"></i> Read';
    return;
  }

  // Clean markdown & LaTeX for speech
  const cleanText = text
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/[\*\_#`\$]/g, '')
    .replace(/<[^>]*>/g, '');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  // Try to pick an Indian English or high quality English voice if available
  const voices = STATE.speechSynth.getVoices();
  const indianVoice = voices.find(v => v.lang.includes("en-IN") || v.name.includes("India"));
  if (indianVoice) utterance.voice = indianVoice;

  utterance.onstart = () => {
    if (btnElement) btnElement.innerHTML = '<i class="fa-solid fa-stop"></i> Stop';
  };

  utterance.onend = utterance.onerror = () => {
    if (btnElement) btnElement.innerHTML = '<i class="fa-solid fa-volume-high"></i> Read';
  };

  STATE.speechSynth.speak(utterance);
}

// Voice Recognition (Speech-to-Text)
function initVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast("Voice input is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-IN";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  if (elements.btnVoiceInput) {
    elements.btnVoiceInput.addEventListener("click", () => {
      if (STATE.isRecording) {
        recognition.stop();
        return;
      }

      try {
        recognition.start();
        STATE.isRecording = true;
        elements.btnVoiceInput.classList.add("recording");
        showToast("Listening... Speak your IKS query");
      } catch (e) {
        console.error("Speech recognition error", e);
      }
    });
  }

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (elements.chatInput) {
      elements.chatInput.value = transcript;
      elements.chatInput.focus();
    }
  };

  recognition.onspeechend = () => {
    recognition.stop();
  };

  recognition.onend = () => {
    STATE.isRecording = false;
    if (elements.btnVoiceInput) elements.btnVoiceInput.classList.remove("recording");
  };

  recognition.onerror = (event) => {
    console.warn("Speech recognition error:", event.error);
    STATE.isRecording = false;
    if (elements.btnVoiceInput) elements.btnVoiceInput.classList.remove("recording");
    if (event.error !== "no-speech") {
      showToast("Voice input error: " + event.error);
    }
  };
}

// Scholars & Texts Directory Modal
let selectedScholarCategory = "all";

function initScholarsDirectory() {
  if (!elements.scholarsGrid) return;
  renderScholars(IKS_DATA.scholars);

  // Category filter buttons
  const filterBar = document.getElementById("scholarFilterBar");
  if (filterBar) {
    const filterBtns = filterBar.querySelectorAll("button");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedScholarCategory = btn.getAttribute("data-category") || "all";
        filterAndRenderScholars();
      });
    });
  }

  if (elements.scholarSearchInput) {
    elements.scholarSearchInput.addEventListener("input", filterAndRenderScholars);
  }
}

function filterAndRenderScholars() {
  const q = (elements.scholarSearchInput ? elements.scholarSearchInput.value : "").toLowerCase().trim();
  const filtered = IKS_DATA.scholars.filter(s => {
    const matchesCategory = selectedScholarCategory === "all" || s.category === selectedScholarCategory;
    const matchesQuery = !q || (
      s.name.toLowerCase().includes(q) ||
      s.field.toLowerCase().includes(q) ||
      s.era.toLowerCase().includes(q) ||
      s.region.toLowerCase().includes(q) ||
      (s.module && s.module.toLowerCase().includes(q)) ||
      s.majorWorks.some(w => w.toLowerCase().includes(q)) ||
      s.contributions.toLowerCase().includes(q)
    );
    return matchesCategory && matchesQuery;
  });
  renderScholars(filtered);
}

function renderScholars(scholarsList) {
  if (!elements.scholarsGrid) return;
  elements.scholarsGrid.innerHTML = "";
  if (scholarsList.length === 0) {
    elements.scholarsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;"><i class="fa-solid fa-scroll" style="font-size: 2rem; opacity: 0.4; margin-bottom: 0.5rem; display: block;"></i>No matching scholars or treatises found.</div>';
    return;
  }

  scholarsList.forEach(s => {
    const card = document.createElement("div");
    card.className = "scholar-card";
    card.innerHTML = `
      <div class="scholar-top">
        <div class="card-icon" style="background: rgba(245, 158, 11, 0.15); color: var(--text-gold);"><i class="fa-solid ${s.icon || 'fa-scroll'}"></i></div>
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div class="scholar-name">${s.name}</div>
            <span style="font-size: 0.68rem; padding: 2px 6px; border-radius: 4px; background: rgba(245, 158, 11, 0.1); color: var(--text-gold); border: 1px solid var(--border-gold); text-transform: uppercase;">${s.category}</span>
          </div>
          <div class="scholar-meta">${s.era} • ${s.region}</div>
        </div>
      </div>
      <div style="font-size: 0.78rem; color: var(--text-gold); margin-bottom: 0.3rem;"><strong>Field:</strong> ${s.field}</div>
      <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 0.4rem;"><strong>Key Texts:</strong> <em>${s.majorWorks.join(", ")}</em></div>
      <div class="scholar-contributions">${s.contributions}</div>
      <div style="margin-top: 0.75rem; padding-top: 0.5rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
        <span style="font-size: 0.72rem; color: var(--text-muted);"><i class="fa-solid fa-bookmark"></i> ${s.module || 'IKS Syllabus'}</span>
        <span style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 600;"><i class="fa-solid fa-arrow-right"></i> Ask Chatbot</span>
      </div>
    `;
    card.addEventListener("click", () => {
      closeAllModals();
      sendUserMessage(`Tell me in detail about ${s.name}, their era (${s.era}), key treatises (${s.majorWorks.join(", ")}), and their specific contributions to ${s.field} in Indian Knowledge Systems.`);
    });
    elements.scholarsGrid.appendChild(card);
  });
}

// Vector Store Search Inspector Modal
async function handleVectorSearch(e) {
  if (e) e.preventDefault();
  const query = elements.vectorQueryInput.value.trim();
  if (!query) return;

  elements.vectorResultsContainer.innerHTML = `
    <div style="text-align: center; padding: 2rem; color: var(--text-gold);">
      <i class="fa-solid fa-spinner fa-spin" style="font-size: 1.5rem;"></i>
      <p style="margin-top: 0.5rem;">Searching ChromaDB Vector Store for similarity matches...</p>
    </div>
  `;

  try {
    const res = await fetch(`${getApiBaseUrl()}/search?question=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      elements.vectorResultsContainer.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 1.5rem;">No document matches found in ChromaDB for this query.</div>';
      return;
    }

    elements.vectorResultsContainer.innerHTML = "";
    data.forEach((doc, idx) => {
      const card = document.createElement("div");
      card.className = "vector-result-card";
      
      const contentText = doc.text || doc.content || JSON.stringify(doc);
      const meta = doc.metadata ? JSON.stringify(doc.metadata, null, 2) : "";

      card.innerHTML = `
        <div style="color: var(--text-gold); font-weight: 600; margin-bottom: 0.4rem;">
          <i class="fa-solid fa-file-lines"></i> Chunk #${idx + 1}
        </div>
        <div style="line-height: 1.5; margin-bottom: 0.5rem;">${escapeHtml(contentText)}</div>
        ${meta ? `<div style="font-size: 0.72rem; color: var(--text-muted); border-top: 1px dashed var(--border-subtle); padding-top: 0.3rem;">Metadata: ${escapeHtml(meta)}</div>` : ""}
      `;
      elements.vectorResultsContainer.appendChild(card);
    });

  } catch (err) {
    elements.vectorResultsContainer.innerHTML = `
      <div style="color: var(--accent-crimson); padding: 1rem; background: rgba(244, 63, 94, 0.1); border-radius: 8px;">
        <strong>Search Failed:</strong> ${err.message}. Ensure backend is running and ChromaDB has been populated.
      </div>
    `;
  }
}

// Ingest / Sync Knowledge Base PDF
async function handleSyncKnowledgeBase() {
  if (!confirm("Do you want to re-process and index 'IKS_Scholars_Reference.pdf' into ChromaDB Vector Store?")) return;

  showToast("Processing PDF & embedding into ChromaDB...");
  try {
    const res = await fetch(`${getApiBaseUrl()}/doc`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const message = await res.text();
    showToast(`Success: ${message}`, "success");
  } catch (err) {
    showToast(`Sync error: ${err.message}`, "error");
  }
}

// Export Chat History
function exportCurrentChat() {
  const current = STATE.sessions[STATE.currentSessionId];
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
  showToast("Chat exported as Markdown file");
}

// Clear Active Chat
function clearCurrentChat() {
  const current = STATE.sessions[STATE.currentSessionId];
  if (!current || current.messages.length === 0) return;
  if (!confirm("Clear all messages in the current conversation?")) return;

  current.messages = [];
  saveSessions();
  renderCurrentChat();
  showToast("Conversation cleared");
}

// Backend Health Ping
async function checkBackendHealth() {
  const statusPill = document.getElementById("backendStatusText");
  try {
    // Ping with a lightweight check
    const res = await fetch(`${getApiBaseUrl()}/embed?text=ping`, { method: "GET" });
    if (res.ok && statusPill) {
      statusPill.textContent = "Connected • ChromaDB Online";
    }
  } catch (e) {
    if (statusPill) statusPill.textContent = "Ready • Local Mode";
  }
}

// Event Listeners Setup
function initEventListeners() {
  // Theme Toggle
  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.addEventListener("click", toggleTheme);
  }

  // Sidebar Toggles
  if (elements.toggleSidebarBtn) {
    elements.toggleSidebarBtn.addEventListener("click", () => {
      elements.sidebar.classList.toggle("open");
    });
  }

  if (elements.closeSidebarBtn) {
    elements.closeSidebarBtn.addEventListener("click", () => {
      elements.sidebar.classList.remove("open");
    });
  }

  // New Chat
  if (elements.btnNewChat) {
    elements.btnNewChat.addEventListener("click", createNewSession);
  }

  // Chat Form Submission
  if (elements.chatForm) {
    elements.chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      sendUserMessage();
    });
  }

  // Textarea Auto-expand & Enter shortcut
  if (elements.chatInput) {
    elements.chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendUserMessage();
      }
    });

    elements.chatInput.addEventListener("input", () => {
      elements.chatInput.style.height = "auto";
      elements.chatInput.style.height = Math.min(elements.chatInput.scrollHeight, 150) + "px";
    });
  }

  // Modals Open/Close
  if (elements.btnDirectory && elements.scholarsModal) {
    elements.btnDirectory.addEventListener("click", () => {
      elements.scholarsModal.classList.add("active");
    });
  }

  if (elements.closeScholarsBtn && elements.scholarsModal) {
    elements.closeScholarsBtn.addEventListener("click", () => {
      elements.scholarsModal.classList.remove("active");
    });
  }

  if (elements.btnVectorSearch && elements.vectorModal) {
    elements.btnVectorSearch.addEventListener("click", () => {
      elements.vectorModal.classList.add("active");
    });
  }

  if (elements.closeVectorBtn && elements.vectorModal) {
    elements.closeVectorBtn.addEventListener("click", () => {
      elements.vectorModal.classList.remove("active");
    });
  }

  // Close modals on backdrop click
  window.addEventListener("click", (e) => {
    if (e.target === elements.scholarsModal) elements.scholarsModal.classList.remove("active");
    if (e.target === elements.vectorModal) elements.vectorModal.classList.remove("active");
  });

  // Vector Search Form
  if (elements.vectorSearchForm) {
    elements.vectorSearchForm.addEventListener("submit", handleVectorSearch);
  }

  // Sync Doc Button
  if (elements.btnSyncDoc) {
    elements.btnSyncDoc.addEventListener("click", handleSyncKnowledgeBase);
  }

  // Backend API Settings Button
  if (elements.btnApiSettings) {
    elements.btnApiSettings.addEventListener("click", () => {
      const current = localStorage.getItem("iks_api_url") || "";
      const input = prompt("Enter your deployed Spring Boot Backend URL (e.g., https://iks-backend.onrender.com):\n(Leave empty to use default local/proxy)", current);
      if (input !== null) {
        localStorage.setItem("iks_api_url", input.trim());
        showToast(input.trim() ? "Backend URL set to " + input.trim() : "Reset to default Backend URL", "success");
        checkBackendHealth();
      }
    });
  }

  // Export & Clear
  if (elements.btnExportChat) elements.btnExportChat.addEventListener("click", exportCurrentChat);
  if (elements.btnClearChat) elements.btnClearChat.addEventListener("click", clearCurrentChat);

  // Voice Input Setup
  initVoiceInput();
}

function closeAllModals() {
  if (elements.scholarsModal) elements.scholarsModal.classList.remove("active");
  if (elements.vectorModal) elements.vectorModal.classList.remove("active");
}

// Helpers
function scrollToBottom() {
  if (elements.messagesContainer) {
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(msg, type = "info") {
  if (!elements.toastContainer) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  const icon = type === "error" ? "fa-circle-exclamation" : type === "success" ? "fa-circle-check" : "fa-circle-info";
  toast.innerHTML = `<i class="fa-solid ${icon}" style="color: var(--text-gold);"></i> <span>${escapeHtml(msg)}</span>`;
  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
