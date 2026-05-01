package com.election.app.dto;

import java.time.LocalDateTime;

public class ChatResponse {
    private String response;
    private LocalDateTime timestamp;

    public ChatResponse() {}

    public ChatResponse(String response) {
        this.response = response;
        this.timestamp = LocalDateTime.now();
    }

    public ChatResponse(String response, LocalDateTime timestamp) {
        this.response = response;
        this.timestamp = timestamp;
    }

    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
