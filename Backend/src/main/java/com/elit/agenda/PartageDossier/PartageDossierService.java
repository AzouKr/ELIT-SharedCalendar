package com.elit.agenda.PartageDossier;

import java.util.List;


public interface PartageDossierService {

	List<PartageDossierDTO> addPartageDossier(List<PartageDossier> PartageDossier);
	List<PartageUserDTO> getPartageDossier(int idUtil);
	void deleteAllPartageDossier(int idDossier);
	void updatePartageDoss(List<PartageDossier> PartageDossier,int idDossier);
}
