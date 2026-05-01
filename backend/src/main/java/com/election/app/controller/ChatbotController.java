package com.election.app.controller;

import com.election.app.dto.ApiResponse;
import com.election.app.dto.ChatRequest;
import com.election.app.dto.ChatResponse;
import com.election.app.service.ChatbotService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Tag(name = "Chatbot", description = "AI-powered election assistant chatbot")
public class ChatbotController {

    private final ChatbotService chatbotService;

    @Autowired
    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping({"/chatbot/ask", "/chat"})
    @Operation(summary = "Ask the AI assistant a question")
    public ResponseEntity<ApiResponse<ChatResponse>> askQuestion(@RequestBody ChatRequest request) {
        ChatResponse response = chatbotService.processMessage(request.getMessage());
        // Wrapped in ApiResponse as expected by ElectionAssistant.js
        return ResponseEntity.ok(new ApiResponse<>(true, "Response generated", response));
    }
}
