/**
 * API Client for IKS Spring AI Backend
 */

export const apiService = {
  // Send chat message with Spring AI ChatMemory conversation ID
  async sendChat(prompt, conversationId) {
    const url = `/chat?prompt=${encodeURIComponent(prompt)}&conversationId=${encodeURIComponent(conversationId)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "text/plain, application/json, */*"
      }
    });

    if (!response.ok) {
      throw new Error(`Server returned error ${response.status}: ${response.statusText}`);
    }

    return await response.text();
  },

  // Inspect Vector Store similarity chunks
  async searchVectorStore(question) {
    const url = `/search?question=${encodeURIComponent(question)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Search failed with status ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  },

  // Re-index PDF into ChromaDB
  async syncDocument() {
    const response = await fetch("/doc", {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Sync failed with status ${response.status}: ${response.statusText}`);
    }

    return await response.text();
  },

  // Lightweight health check
  async checkHealth() {
    try {
      const response = await fetch("/embed?text=health", { method: "GET" });
      return response.ok;
    } catch {
      return false;
    }
  }
};
