package com.election.app.dto;

public class PartyDto {
    private String name;
    private String leader;
    private String symbol;
    private String influence;

    // No-args constructor for flexibility
    public PartyDto() {}

    public PartyDto(String name, String leader, String symbol, String influence) {
        this.name = name;
        this.leader = leader;
        this.symbol = symbol;
        this.influence = influence;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLeader() { return leader; }
    public void setLeader(String leader) { this.leader = leader; }

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public String getInfluence() { return influence; }
    public void setInfluence(String influence) { this.influence = influence; }
}
