
package com.election.app.mapper;

import com.election.app.dto.PartyDto;
import com.election.app.model.StatePartyMapping;
import org.springframework.stereotype.Component;

@Component
public class PartyMapper {

    /**
     * Manually map StatePartyMapping entity to PartyDto.
     * This is 100% reliable and avoids annotation processing issues in Java 23.
     */
    public PartyDto toDto(StatePartyMapping mapping) {
        if (mapping == null) return null;
        
        PartyDto dto = new PartyDto();
        
        // Map data from the nested Party entity
        if (mapping.getParty() != null) {
            dto.setName(mapping.getParty().getName());
            dto.setLeader(mapping.getParty().getLeader());
            dto.setSymbol(mapping.getParty().getSymbol());
        }
        
        // Map data from the mapping itself
        dto.setInfluence(mapping.getInfluenceLevel());
        
        return dto;
    }
}
