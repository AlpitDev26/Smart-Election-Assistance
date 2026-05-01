package com.election.app.repository;

import com.election.app.model.StatePartyMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StatePartyMappingRepository extends JpaRepository<StatePartyMapping, Long> {
    List<StatePartyMapping> findByStateId(Long stateId);
}
