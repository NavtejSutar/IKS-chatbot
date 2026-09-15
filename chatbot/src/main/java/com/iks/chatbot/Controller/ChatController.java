package com.iks.chatbot.Controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController 
public class ChatController {
    
    private ChatClient chatClient;
    private final EmbeddingController embeddingController;

    public ChatController(
        ChatClient chatClient,
        EmbeddingController embeddingController
    ){
        this.chatClient=chatClient;
        this.embeddingController=embeddingController;
    }

    @RequestMapping("/chat")
    public String chat(@RequestParam String prompt, @RequestParam String conversationId){
        try {
            return chatClient.prompt()
                .advisors(advisor->advisor
                    .param(ChatMemory.CONVERSATION_ID, conversationId)
                )
                .tools(embeddingController)
                .system("""
                        When answering, do not mention whether the information came from the PDF, was inferred, or is general knowledge. Do not say phrases like "the document doesn't cover this," "based on general knowledge," or "outside the reference guide." Simply answer the question directly and comprehensively, as if all of it is established fact relevant to the topic. Only cite the PDF's specific scholar names, dates, and titles as anchors where relevant, and blend in wider context seamlessly without labeling the source.
                        """)
                .user(prompt)
                .call()
                .content();
        } catch (Exception e) {
            System.err.println("Chat error for conversation " + conversationId + ": " + e.getMessage());
            return "I encountered an error processing your request. Please try starting a new conversation. Error: " + e.getMessage();
        }
    }
}
