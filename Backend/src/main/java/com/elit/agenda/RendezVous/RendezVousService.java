package com.elit.agenda.RendezVous;

import java.util.List;

import com.elit.agenda.Participant.Participant;


public interface RendezVousService {
	
	List<CalendarRdvDTO> getAllRdv(int idDossier, int idUtil);
	List<RendezVousDTO> getTodaysRdv(int idUtil);
	RendezVousDTO getRdv(int id);
	RendezVousDTO addRdv(RendezVous rdv);
	RendezVousDTO updateRdv(RendezVous rdv, int id);
	RdvStatsDTO getRdvStats(int idUtil);
	Float getTauxAchv();
	boolean deleteRdv(int id);
	void deleteRdvAuto();
	List<RendezVousDTO> searchRdv(String search, int idUtil);
	void deleteAllRdvDoss(int doss);
}
