package com.iks.chatbot.Controller;

import java.util.List;

import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.reader.pdf.PagePdfDocumentReader;
import org.springframework.ai.reader.pdf.config.PdfDocumentReaderConfig;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.core.io.ClassPathResource;

@RestController 
public class EmbeddingController {
    private final EmbeddingModel embeddingModel;
    private final VectorStore vectorStore;

    public EmbeddingController(
        EmbeddingModel embeddingModel,
        VectorStore vectorStore
    ){
        this.embeddingModel=embeddingModel;
        this.vectorStore=vectorStore;
    }

    @RequestMapping("/embed")
    public String embedding(
        @RequestParam String text
    ){
        float[] vector=embeddingModel.embed(text);
        return "Embedding: " + vector.length;
    }

    public List<Document> loadPDF(){
        PagePdfDocumentReader reader=new PagePdfDocumentReader(
            new ClassPathResource("IKS_Scholars_Reference.pdf"),
            PdfDocumentReaderConfig.builder()
                .withPageTopMargin(0)
                .withPageBottomMargin(0)
                .build()
        );
        return reader.get();
    }

    @RequestMapping("/doc")
    public String addVector(){
        List<Document> doc=loadPDF();
        TokenTextSplitter splitter=TokenTextSplitter.builder().build();
        List<Document> ls=splitter.apply(doc);
        int batchSize = 100;

        for (int i = 0; i < ls.size(); i += batchSize) {

            int end = Math.min(i + batchSize, ls.size());

            List<Document> batch = ls.subList(i, end);

            vectorStore.add(batch);

            System.out.println(
                "Added documents " + i + " to " + (end - 1)
            );
        }

        return "Documents added: " + ls.size();
    }

    @RequestMapping("/search")
    @Tool(description = "Searches the 'IKS Scholars Reference Guide' — a 9-page reference document covering scholars, texts, and contributions relevant to the Indian Knowledge Systems (IKS) syllabus. The document is organized into three modules: (1) Foundations & Context — colonial education policy (Macaulay, Bentinck), critics of colonial education (Dharampal), ancient educational institutions, and local heritage sites (Kanheri water management); (2) Core Disciplines — Medicine/Ayurveda (Charaka, Sushruta, Vagbhata, Dhanvantari), Alchemy/Rasashastra (Nagarjuna, Govinda Bhagavatpada), Mathematics (Aryabhata, Brahmagupta, Bhaskara I & II, Madhava, Mahavira, Varahamihira), Logic/Nyaya (Gautama, Vatsyayana, Gangesha Upadhyaya, Dignaga, Dharmakirti), and Art of Governance/Arthashastra (Chanakya/Kautilya, Kamandaka); (3) Elective Topics — Aesthetics, Town Planning, Strategic Studies, Krishi Shastra, Vyakarana & Lexicography, Natyashastra, Ancient Sports, Yoga and Wellbeing, Linguistics, Chitrasutra, Architecture, Taxation, Banking, and Trade and Commerce, each with associated scholars, their era, key texts, and exam-relevant contributions. Use this tool to answer any question about a specific scholar's identity, dates, key works, contributions, or which IKS topic/module they belong to, as well as cross-topic questions (e.g., which scholars appear in multiple sections, or how two scholars relate to each other).")
    public List<Document> search(
        @RequestParam String question
    ){
        System.out.println("Search called");
        SearchRequest request=SearchRequest.builder()
            .query(question)
            .topK(3)
            .build();
        return vectorStore.similaritySearch(request);
    }
}
