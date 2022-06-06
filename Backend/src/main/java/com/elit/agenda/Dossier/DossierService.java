package com.elit.agenda.Dossier;

import java.util.List;

public interface DossierService {
	List<DossierDTO> getPublicDossier();
	List<DossierDTO> getPrivateDossier(int idUtil);
	List<DossierDTO> getSharedDossier(int idUtil);
	List<DossierDTO> getAllUserDossier(int idUtil);
	DossierDTO addDossier(Dossier dossier);
	DossierDTO updateDossier(Dossier dossier, int idDoss);
	boolean deleteDossier(int idDoss);
}
