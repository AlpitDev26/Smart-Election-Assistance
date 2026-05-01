package com.election.app.config;

import com.election.app.model.*;
import com.election.app.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class DataInitializer {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    CommandLineRunner initDatabase(StateRepository stateRepository, 
                                 FaqRepository faqRepository,
                                 PartyRepository partyRepository,
                                 StatePartyMappingRepository mappingRepository) {
        return args -> {
            if (stateRepository.count() == 0) {
                logger.info("Initializing Master National Election Database...");

                // 1. REGIONAL & NATIONAL PARTIES
                Party bjp = createParty("BJP", "J.P. Nadda", "Lotus", "National Party");
                Party inc = createParty("INC", "Mallikarjun Kharge", "Hand", "National Party");
                Party aap = createParty("AAP", "Arvind Kejriwal", "Broom", "National Party");
                Party tmc = createParty("TMC", "Mamata Banerjee", "Flowers", "Regional Power (Bengal)");
                Party dmk = createParty("DMK", "M.K. Stalin", "Rising Sun", "Regional Power (Tamil Nadu)");
                Party admk = createParty("AIADMK", "E.K. Palaniswami", "Two Leaves", "Regional Power (Tamil Nadu)");
                Party ss = createParty("SHS", "Eknath Shinde", "Bow and Arrow", "Regional Power (Maharashtra)");
                Party sp = createParty("SP", "Akhilesh Yadav", "Bicycle", "Regional Power (UP)");
                Party tdp = createParty("TDP", "N. Chandrababu Naidu", "Bicycle", "Regional Power (Andhra)");
                Party ysrcp = createParty("YSRCP", "Y.S. Jagan Mohan Reddy", "Fan", "Regional Power (Andhra)");
                Party brs = createParty("BRS", "K. Chandrashekar Rao", "Car", "Regional Power (Telangana)");
                Party bjd = createParty("BJD", "Naveen Patnaik", "Conch", "Regional Power (Odisha)");
                
                partyRepository.saveAll(List.of(bjp, inc, aap, tmc, dmk, admk, ss, sp, tdp, ysrcp, brs, bjd));

                // 2. COMPREHENSIVE STATES DATA
                List<State> states = new ArrayList<>();
                
                // Maharashtra
                State mh = createState("Maharashtra", "Mumbai", 48, 288, 19, "Eknath Shinde", "Uddhav Thackeray", "Devendra Fadnavis", "Ajit Pawar");
                states.add(mh);
                
                // Uttar Pradesh
                State up = createState("Uttar Pradesh", "Lucknow", 80, 403, 31, "Yogi Adityanath", "Akhilesh Yadav", "Keshav Prasad Maurya", "Brajesh Pathak");
                states.add(up);

                // Tamil Nadu
                State tn = createState("Tamil Nadu", "Chennai", 39, 234, 18, "M. K. Stalin", "E. K. Palaniswami", "Udhayanidhi Stalin", "N/A");
                states.add(tn);

                // West Bengal
                State wb = createState("West Bengal", "Kolkata", 42, 294, 16, "Mamata Banerjee", "Buddhadeb Chatterjee", "N/A", "N/A");
                states.add(wb);

                // Delhi
                State dl = createState("Delhi", "New Delhi", 7, 70, 3, "Arvind Kejriwal", "Sheila Dikshit", "N/A", "N/A");
                states.add(dl);

                // Andhra Pradesh
                State ap = createState("Andhra Pradesh", "Amaravati", 25, 175, 11, "N. Chandrababu Naidu", "Y.S. Jagan Mohan Reddy", "Pawan Kalyan", "N/A");
                states.add(ap);

                // Telangana
                State ts = createState("Telangana", "Hyderabad", 17, 119, 7, "A. Revanth Reddy", "K. Chandrashekar Rao", "Mallu Bhatti Vikramarka", "N/A");
                states.add(ts);

                // Odisha
                State od = createState("Odisha", "Bhubaneswar", 21, 147, 10, "Mohan Charan Majhi", "Naveen Patnaik", "K.V. Singh Deo", "Pravati Parida");
                states.add(od);

                // Punjab
                State pb = createState("Punjab", "Chandigarh", 13, 117, 7, "Bhagwant Mann", "Charanjit Singh Channi", "N/A", "N/A");
                states.add(pb);

                // Rajasthan
                State rj = createState("Rajasthan", "Jaipur", 25, 200, 10, "Bhajan Lal Sharma", "Ashok Gehlot", "Diya Kumari", "Prem Chand Bairwa");
                states.add(rj);

                stateRepository.saveAll(states);

                // 3. REGIONAL PARTY MAPPINGS
                mappingRepository.save(createMapping(mh, ss, "Dominant"));
                mappingRepository.save(createMapping(mh, bjp, "High"));
                mappingRepository.save(createMapping(tn, dmk, "Dominant"));
                mappingRepository.save(createMapping(tn, admk, "Major Opposition"));
                mappingRepository.save(createMapping(wb, tmc, "Dominant"));
                mappingRepository.save(createMapping(dl, aap, "Dominant"));
                mappingRepository.save(createMapping(ap, tdp, "Dominant"));
                mappingRepository.save(createMapping(ap, ysrcp, "Major Opposition"));
                mappingRepository.save(createMapping(ts, inc, "Dominant"));
                mappingRepository.save(createMapping(ts, brs, "Major Opposition"));
                mappingRepository.save(createMapping(od, bjp, "Dominant"));
                mappingRepository.save(createMapping(od, bjd, "Major Opposition"));

                logger.info("Master National Database Initialized successfully.");
            }

            if (faqRepository.count() == 0) {
                Faq f1 = new Faq();
                f1.setQuestion("What is the voting age?");
                f1.setAnswer("The minimum age to vote in India is 18 years.");
                f1.setKeywords("age,18");
                faqRepository.save(f1);
            }
        };
    }

    private State createState(String name, String cap, int ls, int vs, int rs, String cm, String pcm, String dcm1, String dcm2) {
        State s = new State();
        s.setStateName(name);
        s.setCapital(cap);
        s.setElectionHq(cap);
        s.setLokSabhaSeats(ls);
        s.setVidhanSabhaSeats(vs);
        s.setRajyaSabhaSeats(rs);
        s.setCurrentCm(cm);
        s.setPreviousCm(pcm);
        s.setCurrentDeputyCm(dcm1 + (dcm2.equals("N/A") ? "" : ", " + dcm2));
        s.setPreviousDeputyCm("N/A");
        return s;
    }

    private Party createParty(String name, String leader, String symbol, String desc) {
        Party p = new Party();
        p.setName(name);
        p.setLeader(leader);
        p.setSymbol(symbol);
        p.setDescription(desc);
        return p;
    }

    private StatePartyMapping createMapping(State s, Party p, String influence) {
        StatePartyMapping m = new StatePartyMapping();
        m.setState(s);
        m.setParty(p);
        m.setInfluenceLevel(influence);
        return m;
    }
}
