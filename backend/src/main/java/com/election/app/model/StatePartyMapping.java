package com.election.app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "state_party_mapping")
public class StatePartyMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "state_id")
    private State state;

    @ManyToOne
    @JoinColumn(name = "party_id")
    private Party party;

    @Column(name = "influence_level", nullable = false)
    private String influenceLevel;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public State getState() { return state; }
    public void setState(State state) { this.state = state; }

    public Party getParty() { return party; }
    public void setParty(Party party) { this.party = party; }

    public String getInfluenceLevel() { return influenceLevel; }
    public void setInfluenceLevel(String influenceLevel) { this.influenceLevel = influenceLevel; }
}
