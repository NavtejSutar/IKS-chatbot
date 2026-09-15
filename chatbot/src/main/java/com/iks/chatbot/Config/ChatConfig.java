package com.iks.chatbot.Config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration 
public class ChatConfig {

    @Bean
    public ChatMemory chatMemory(){
        return MessageWindowChatMemory.builder()
            .maxMessages(20)
            .build();
    }

    @Bean 
    public ChatClient chatClient(
        OpenAiChatModel chatModel,
        ChatMemory chatMemory
    ){
        return ChatClient.builder(chatModel)
            .defaultAdvisors(
                MessageChatMemoryAdvisor
                    .builder(chatMemory)
                    .build()
                )
            .build();
    }

    @Bean 
    @Primary 
    public EmbeddingModel embeddingModel(
        EmbeddingModel googleGenAiTextEmbedding
    ){
        return googleGenAiTextEmbedding;
    }
}
