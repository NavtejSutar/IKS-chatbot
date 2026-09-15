# ज्ञान सेतु (Jnana Setu) - IKS Chatbot React Frontend

A modern, responsive, and feature-rich Web Application for exploring **Indian Knowledge Systems (IKS)**, designed to connect directly with the **Spring Boot & Spring AI 2.0 Tool-Calling RAG Backend**.

---

## 🌟 Key Features

### 1. **Visual & Aesthetic Design**
- **Neo-Vedic Glassmorphism Theme**: Deep Obsidian Cosmic palette (`#0B0F19`) accented with saffron gold gradients, glowing mandala orbs, and Sandalwood Ivory day mode.
- **Classical Indian Typography**: Pairing Google Fonts **Cinzel** for headings with **Outfit** and **JetBrains Mono**.
- **Daily Sanskrit Wisdom**: Dynamic Subhashita banners with authentic Devanagari verses and English philosophical translations.

### 2. **AI & RAG Experience**
- **Spring AI `ChatMemory` State Preservation**: Automatically creates and maintains conversation sessions using individual `conversationId` parameters sent to `/chat?prompt=...&conversationId=...`.
- **LaTeX Math & KaTeX Equation Rendering**: Renders mathematical sutras and formulas (e.g. Madhava's infinite series for $\pi$, sine series, trigonometry, algebra).
- **Tool-Calling Indicator**: Live animated pill indicator when the Spring AI backend invokes RAG tools.
- **Voice Dictation (Speech-to-Text)**: One-click microphone button using Web Speech Recognition for hands-free queries.
- **Audio Reader (Text-to-Speech)**: Integrated speech synthesis allowing users to listen to responses.

### 3. **Curriculum & Knowledge Tools**
- **IKS Scholars & Treatises Catalog**: Filterable directory of 15+ classical scholars (Aryabhata, Sushruta, Charaka, Madhava, Brahmagupta, Kautilya, Panini, Dharampal, Nagarjuna, Gautama, etc.) with 1-click "Ask Chatbot" prompt buttons.
- **ChromaDB Vector Store Inspector**: Query `/search?question=...` directly to inspect retrieved semantic chunks and metadata.
- **Knowledge Base Sync**: Direct trigger to `/doc` to vectorize `IKS_Scholars_Reference.pdf`.
- **IKS Curriculum Navigator**: Interactive sidebar covering Modules 1, 2, and 3 (Ganita, Ayurveda, Rasashastra, Nyaya Logic, Arthashastra, Heritage Engineering, and Indigenous Education).

---

## 🚀 Getting Started

### 1. Start the Spring Boot Backend
Ensure your Spring Boot backend application is running on `http://localhost:8080`.

### 2. Run the React Frontend (Dev Mode)
In the `frontend` directory:

```bash
npm install
npm run dev
```

This starts the Vite dev server at `http://localhost:3000` with automated proxy to `http://localhost:8080`.

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Directory Structure

```
frontend/
├── index.html               # Main HTML entry point
├── package.json             # React 18, Tailwind, Lucide, KaTeX, React-Markdown
├── vite.config.js           # Vite dev server with proxy to Spring Boot (port 8080)
├── tailwind.config.js       # Custom Vedic theme palette and fonts
├── postcss.config.js
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Main App layout & session controller
    ├── index.css            # Tailwind directives, animations & glassmorphism
    ├── data/
    │   └── iksData.js       # Scholars directory, prompts & Sanskrit subhashitas
    ├── services/
    │   └── api.js           # Spring AI API service (/chat, /search, /doc, /embed)
    └── components/
        ├── Header.jsx       # Top navigation, tools, subhashita, theme switcher
        ├── Sidebar.jsx      # Session history & IKS Curriculum explorer
        ├── ChatArea.jsx     # Welcome Hero, message stream, Markdown & KaTeX rendering
        ├── ChatInput.jsx    # Speech-to-text, prompt chips carousel, auto-resize textarea
        ├── ScholarsModal.jsx # Searchable scholars & treatises directory
        ├── VectorInspectorModal.jsx # Live ChromaDB semantic search inspector
        └── Toast.jsx        # Notification toasts
```
