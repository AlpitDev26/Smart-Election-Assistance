package com.election.app.service;

import com.election.app.dto.PartyDto;
import com.election.app.mapper.PartyMapper;
import com.election.app.model.Election;
import com.election.app.model.Event;
import com.election.app.model.State;
import com.election.app.model.StatePartyMapping;
import com.election.app.repository.ElectionRepository;
import com.election.app.repository.EventRepository;
import com.election.app.repository.StatePartyMappingRepository;
import com.election.app.repository.StateRepository;
import com.election.app.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ElectionService {

    private static final Logger logger = LoggerFactory.getLogger(ElectionService.class);

    private final StateRepository stateRepository;
    private final StatePartyMappingRepository statePartyMappingRepository;
    private final ElectionRepository electionRepository;
    private final EventRepository eventRepository;
    private final PartyMapper partyMapper;

    @Autowired
    public ElectionService(StateRepository stateRepository, 
                           StatePartyMappingRepository statePartyMappingRepository,
                           ElectionRepository electionRepository,
                           EventRepository eventRepository,
                           PartyMapper partyMapper) {
        this.stateRepository = stateRepository;
        this.statePartyMappingRepository = statePartyMappingRepository;
        this.electionRepository = electionRepository;
        this.eventRepository = eventRepository;
        this.partyMapper = partyMapper;
    }

    public List<State> getAllStates() {
        logger.info("Fetching all states");
        return stateRepository.findAll();
    }

    public List<PartyDto> getPartiesByState(String stateName) {
        logger.info("Fetching parties for state: {}", stateName);
        State state = stateRepository.findByStateNameIgnoreCase(stateName)
                .orElseThrow(() -> new ResourceNotFoundException("State not found: " + stateName));
        
        List<StatePartyMapping> mappings = statePartyMappingRepository.findByStateId(state.getId());
        return mappings.stream()
                .map(partyMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<Election> getAllElections() {
        logger.info("Fetching all elections");
        return electionRepository.findAll();
    }
    
    public List<Election> getElectionsByState(String stateName) {
        logger.info("Fetching elections for state: {}", stateName);
        return electionRepository.findByStateIgnoreCase(stateName);
    }

    public List<Event> getAllEvents() {
        logger.info("Fetching all election events");
        return eventRepository.findAll();
    }
}
