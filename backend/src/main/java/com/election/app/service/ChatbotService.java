package com.election.app.service;

import com.election.app.dto.ChatResponse;
import com.election.app.model.Faq;
import com.election.app.repository.FaqRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
public class ChatbotService {

    private static final Logger logger = LoggerFactory.getLogger(ChatbotService.class);
    
    private final FaqRepository faqRepository;

    @Autowired
    public ChatbotService(FaqRepository faqRepository) {
        this.faqRepository = faqRepository;
    }

    /**
     * Production-ready local keyword matching system.
     * It scores FAQs based on how many keywords match the user's input.
     */
    public ChatResponse processMessage(String userMessage) {
        String input = userMessage.toLowerCase().trim();
        logger.info("Processing local chat request: {}", input);

        List<Faq> faqs = faqRepository.findAll();
        
        // Find the best matching FAQ based on keyword overlap
        Faq bestMatch = faqs.stream()
                .filter(faq -> {
                    String[] keywords = faq.getKeywords().toLowerCase().split(",");
                    for (String keyword : keywords) {
                        if (input.contains(keyword.trim())) return true;
                    }
                    return false;
                })
                .max(Comparator.comparingInt(faq -> {
                    // Simple scoring: count how many keywords are present
                    int score = 0;
                    String[] keywords = faq.getKeywords().toLowerCase().split(",");
                    for (String keyword : keywords) {
                        if (input.contains(keyword.trim())) score++;
                    }
                    return score;
                }))
                .orElse(null);

        String answer;
        if (bestMatch != null) {
            answer = bestMatch.getAnswer();
            logger.info("Best local match found: {}", bestMatch.getQuestion());
        } else {
            answer = "I'm your Election Assistant. I can help you with: \n" +
                     "1. Voting Process (How to vote)\n" +
                     "2. Required IDs (Voter ID, Aadhaar)\n" +
                     "3. Registration (New Voter)\n" +
                     "4. Polling Booths\n" +
                     "Please ask a question about these topics!";
        }

        return new ChatResponse(answer, LocalDateTime.now());
    }
}
