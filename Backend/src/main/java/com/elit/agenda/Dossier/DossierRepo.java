package com.elit.agenda.Dossier;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface DossierRepo extends JpaRepository<Dossier, Integer> {
	@Query("SELECT d FROM Dossier d WHERE d.type = 0")
	List<Dossier> getPublicDossier();
	@Query("SELECT d FROM Dossier d WHERE d.type = 1 AND d.id_doss_creator = ?1")
	List<Dossier> getPrivateDossier(int idUtil);
	@Query("SELECT d FROM Dossier d inner join d.partageDossiers p WHERE d.type = 2 AND p.utilisateur.idUtil = ?1")
	List<Dossier> getDossierPartage(int idUtil);
	@Query("SELECT d FROM Dossier d WHERE d.type = 2 AND d.id_doss_creator = ?1")
	List<Dossier> getDossierPartageOwn(int idUtil);
	@Query("SELECT d FROM Dossier d WHERE d.type = 3 AND d.id_doss_creator = ?1")
	List<Dossier> getDefaultDossier(int idUtil);
	@Query(value = "SELECT id_dossier FROM agenda.dossier WHERE agenda.dossier.type = 3 AND agenda.dossier.id_doss_creator = ?1", nativeQuery = true)
	int getIdDefaultFolder(int idUtil);
}
