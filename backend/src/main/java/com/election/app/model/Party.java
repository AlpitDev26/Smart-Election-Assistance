package com.election.app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "parties")
public class Party {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String symbol;

    @Column(nullable = false)
    private String leader;

    private String description;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public String getLeader() { return leader; }
    public void setLeader(String leader) { this.leader = leader; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
