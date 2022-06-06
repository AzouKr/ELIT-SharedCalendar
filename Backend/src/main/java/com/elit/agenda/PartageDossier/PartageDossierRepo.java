package com.elit.agenda.PartageDossier;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface PartageDossierRepo extends JpaRepository<PartageDossier, Integer> {

	@Query("SELECT p FROM PartageDossier p WHERE p.utilisateur.idUtil = ?1")
	List<PartageDossier> getPartageDossier(int idUtil);
	@Query("SELECT p FROM PartageDossier p WHERE p.dossier.idDossier = ?1")
	List<PartageDossier> getPartageDossierbydoss(int id);
	@Transactional
	@Modifying
	@Query("DELETE FROM PartageDossier p WHERE p.dossier.idDossier = ?1")
	void deleteAllPart(int id);
}
