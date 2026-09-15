package com.iks.chatbot.Config;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

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

    @Bean
    @Primary
    public VectorStore vectorStore(
        EmbeddingModel embeddingModel,
        org.springframework.ai.chroma.vectorstore.ChromaApi chromaApi
    ) {
        String tenant = "default_tenant";
        String database = "default_database";
        String collectionName = "SpringAiCollection";
        try {
            chromaApi.getCollection(tenant, database, collectionName);
        } catch (Exception e) {
            try {
                chromaApi.createCollection(tenant, database, new org.springframework.ai.chroma.vectorstore.ChromaApi.CreateCollectionRequest(collectionName));
            } catch (Exception ex) {
                // Ignore if collection already exists
            }
        }
        return org.springframework.ai.chroma.vectorstore.ChromaVectorStore.builder(chromaApi, embeddingModel)
            .tenantName(tenant)
            .databaseName(database)
            .collectionName(collectionName)
            .initializeSchema(false)
            .build();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("*")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*");
            }
        };
    }
}

