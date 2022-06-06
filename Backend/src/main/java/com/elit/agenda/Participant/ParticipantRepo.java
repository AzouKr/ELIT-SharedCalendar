package com.elit.agenda.Participant;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface ParticipantRepo extends JpaRepository<Participant, Integer> {
	@Query("SELECT p FROM Participant p WHERE p.rendezVous.id = ?1")
	List<Participant> getParticipant(int id);
	@Transactional
	@Modifying
	@Query("DELETE FROM Participant p WHERE p.rendezVous.id = ?1")
	void deleteAllPart(int id);
	@Query(value = "SELECT id_part,id_rdv_p,id_user FROM agenda.participant inner join agenda.rendez_vous WHERE  agenda.rendez_vous.date_d = ?1 AND agenda.rendez_vous.heure_d BETWEEN ?2 AND ?3 AND agenda.rendez_vous.heure_f BETWEEN ?2 AND ?3 AND agenda.participant.id_rdv_p = agenda.rendez_vous.id_rdv ", nativeQuery = true)
	List<Participant> getIdOccupe(String Date, String HeureD, String HeureF);
}
