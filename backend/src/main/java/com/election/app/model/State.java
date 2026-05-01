package com.election.app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "states")
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String stateName;
    private String capital;
    private String electionHq;
    
    // New Fields for Production Readiness
    private int lokSabhaSeats;
    private int vidhanSabhaSeats;
    private int rajyaSabhaSeats;
    
    private String currentCm;
    private String previousCm;
    private String currentDeputyCm;
    private String previousDeputyCm;

    public State() {}

    public State(String stateName, String capital, String electionHq) {
        this.stateName = stateName;
        this.capital = capital;
        this.electionHq = electionHq;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getStateName() { return stateName; }
    public void setStateName(String stateName) { this.stateName = stateName; }
    public String getCapital() { return capital; }
    public void setCapital(String capital) { this.capital = capital; }
    public String getElectionHq() { return electionHq; }
    public void setElectionHq(String electionHq) { this.electionHq = electionHq; }

    public int getLokSabhaSeats() { return lokSabhaSeats; }
    public void setLokSabhaSeats(int lokSabhaSeats) { this.lokSabhaSeats = lokSabhaSeats; }
    public int getVidhanSabhaSeats() { return vidhanSabhaSeats; }
    public void setVidhanSabhaSeats(int vidhanSabhaSeats) { this.vidhanSabhaSeats = vidhanSabhaSeats; }
    public int getRajyaSabhaSeats() { return rajyaSabhaSeats; }
    public void setRajyaSabhaSeats(int rajyaSabhaSeats) { this.rajyaSabhaSeats = rajyaSabhaSeats; }

    public String getCurrentCm() { return currentCm; }
    public void setCurrentCm(String currentCm) { this.currentCm = currentCm; }
    public String getPreviousCm() { return previousCm; }
    public void setPreviousCm(String previousCm) { this.previousCm = previousCm; }
    public String getCurrentDeputyCm() { return currentDeputyCm; }
    public void setCurrentDeputyCm(String currentDeputyCm) { this.currentDeputyCm = currentDeputyCm; }
    public String getPreviousDeputyCm() { return previousDeputyCm; }
    public void setPreviousDeputyCm(String previousDeputyCm) { this.previousDeputyCm = previousDeputyCm; }
}
