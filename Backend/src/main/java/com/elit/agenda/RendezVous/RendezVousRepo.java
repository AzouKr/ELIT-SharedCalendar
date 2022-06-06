package com.elit.agenda.RendezVous;


import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface RendezVousRepo extends JpaRepository<RendezVous, Integer> {
	@Query("SELECT r FROM RendezVous r WHERE r.dossier.idDossier = ?1")
	List<RendezVous> getAllRdv(int idDossier);
	@Query("SELECT r FROM RendezVous r inner join r.participants p WHERE (r.dossier.idDossier = ?1 AND r.utilisateur.idUtil = ?2) OR (r.dossier.idDossier = ?1 AND p.utilisateur.idUtil = ?2)")
	List<RendezVous> getAllRdvPrv(int idDossier, int idUtil);
	@Query("SELECT COUNT(*) FROM RendezVous r WHERE r.utilisateur.idUtil = ?1")
	int getNbrRdvCreated(int idUtil);
	@Query("SELECT COUNT(*) FROM RendezVous r inner join r.participants p WHERE p.utilisateur.idUtil = ?1")
	int getNbrRdvParticipate(int idUtil);
	@Query("SELECT COUNT(*) FROM RendezVous r ")
	int getNbrRdv();
	@Query("SELECT r FROM RendezVous r")
	List<RendezVous> getAllRdv();
	@Query(value = "SELECT r.id_rdv, r.titre, r.description, r.lieu, r.date_d, r.heure_d, r.date_f , r.heure_f, r.type, r.id_creator, r.id_doss, r.color FROM agenda.rendez_vous as r inner join agenda.dossier WHERE r.date_d = ?1 AND r.id_doss = agenda.dossier.id_dossier AND agenda.dossier.type = 0", nativeQuery = true)
	List<RendezVous> getTodaysRdv(String today, int idUtil);
	@Query(value = "SELECT r.id_rdv, r.titre, r.description, r.lieu, r.date_d, r.heure_d, r.date_f , r.heure_f, r.type, r.id_creator, r.id_doss, r.color FROM agenda.rendez_vous as r inner join agenda.participant inner join agenda.dossier WHERE r.date_d = ?1 AND agenda.participant.id_rdv_p = r.id_rdv AND agenda.participant.id_user = ?2 AND r.id_doss = agenda.dossier.id_dossier AND agenda.dossier.type != 3", nativeQuery = true)
	List<RendezVous> getTodaysRdvP(String today, int idUtil);
	@Query(value = "SELECT r.id_rdv, r.titre, r.description, r.lieu, r.date_d, r.heure_d, r.date_f , r.heure_f, r.type, r.id_creator, r.id_doss, r.color FROM agenda.rendez_vous as r inner join agenda.dossier WHERE r.date_d = ?1 AND r.id_doss = agenda.dossier.id_dossier AND agenda.dossier.id_doss_creator = ?2 AND (agenda.dossier.type = 1 OR agenda.dossier.type = 3)", nativeQuery = true)
	List<RendezVous> getTodaysRdvOwn(String today, int idUtil);
	
	
	@Query(value = "SELECT r.id_rdv, r.titre, r.description, r.lieu, r.date_d, r.heure_d, r.date_f , r.heure_f, r.type, r.id_creator, r.id_doss, r.color FROM agenda.rendez_vous as r inner join agenda.dossier WHERE MATCH (r.titre, r.description, r.lieu) AGAINST (?1) && (r.id_doss = agenda.dossier.id_dossier && agenda.dossier.id_doss_creator = ?2 && (agenda.dossier.type = 1 || agenda.dossier.type = 3))", nativeQuery = true)
	List<RendezVous> searchRdvOwn(String search, int idUtil);
	@Query(value = "SELECT r.id_rdv, r.titre, r.description, r.lieu, r.date_d, r.heure_d, r.date_f , r.heure_f, r.type, r.id_creator, r.id_doss, r.color FROM agenda.rendez_vous as r inner join agenda.dossier WHERE MATCH (r.titre, r.description, r.lieu) AGAINST (?1) && (r.id_doss = agenda.dossier.id_dossier && agenda.dossier.type = 0)", nativeQuery = true)
	List<RendezVous> searchRdvPublic(String search);
	@Query(value = "SELECT r.id_rdv, r.titre, r.description, r.lieu, r.date_d, r.heure_d, r.date_f , r.heure_f, r.type, r.id_creator, r.id_doss, r.color FROM agenda.rendez_vous as r inner join agenda.dossier WHERE MATCH (r.titre, r.description, r.lieu) AGAINST (?1) && (r.id_doss = agenda.dossier.id_dossier && agenda.dossier.type = 2)", nativeQuery = true)
	List<RendezVous> searchRdvPartage(String search);
	@Query(value = "SELECT * FROM agenda.rendez_vous WHERE date_d = ?1 AND heure_d BETWEEN ?2 AND ?3 AND heure_f BETWEEN ?2 AND ?3", nativeQuery = true)
	List<RendezVous> getIdOccupe(String Date, String HeureD, String HeureF);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM RendezVous r WHERE r.dossier.idDossier = ?1")
	void deleteAllRdvDoss(int id);

}


