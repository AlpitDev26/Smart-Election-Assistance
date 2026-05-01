package com.election.app.repository;

import com.election.app.model.Election;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ElectionRepository extends JpaRepository<Election, Long> {
    List<Election> findByStateIgnoreCase(String state);
}
