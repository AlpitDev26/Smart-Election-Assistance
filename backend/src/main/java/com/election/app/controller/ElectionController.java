package com.election.app.controller;

import com.election.app.dto.ApiResponse;
import com.election.app.dto.PartyDto;
import com.election.app.model.Election;
import com.election.app.model.Event;
import com.election.app.model.State;
import com.election.app.service.ElectionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Election Management", description = "Endpoints for fetching states, parties, and election schedules")
public class ElectionController {

    @Autowired
    private ElectionService electionService;

    @GetMapping("/states")
    @Operation(summary = "Get all states", description = "Retrieves a list of all states and their capital/HQ details")
    public ApiResponse<List<State>> getStates() {
        return ApiResponse.success("States retrieved successfully", electionService.getAllStates());
    }

    @GetMapping("/parties/state/{stateName}")
    @Operation(summary = "Get parties by state", description = "Retrieves political parties active in a specific state")
    public ApiResponse<List<PartyDto>> getPartiesByState(@PathVariable String stateName) {
        return ApiResponse.success("Parties for " + stateName + " retrieved successfully", electionService.getPartiesByState(stateName));
    }

    @GetMapping("/elections")
    @Operation(summary = "Get all ongoing elections", description = "Retrieves a list of all upcoming and completed elections")
    public ApiResponse<List<Election>> getElections() {
        return ApiResponse.success("Elections retrieved successfully", electionService.getAllElections());
    }
    
    @GetMapping("/elections/state/{stateName}")
    @Operation(summary = "Get elections for a specific state")
    public ApiResponse<List<Election>> getElectionsByState(@PathVariable String stateName) {
        return ApiResponse.success("Elections for " + stateName + " retrieved successfully", electionService.getElectionsByState(stateName));
    }

    @GetMapping("/events")
    @Operation(summary = "Get election events feed")
    public ApiResponse<List<Event>> getEvents() {
        return ApiResponse.success("Events feed retrieved successfully", electionService.getAllEvents());
    }
}
