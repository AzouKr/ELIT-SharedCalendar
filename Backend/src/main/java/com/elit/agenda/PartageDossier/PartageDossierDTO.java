package com.elit.agenda.PartageDossier;

import com.elit.agenda.Dossier.Dossier;
import com.elit.agenda.Dossier.DossierDTO;
import com.elit.agenda.Utilisateur.Utilisateur;
import com.elit.agenda.Utilisateur.UtilisateurDTO;

public class PartageDossierDTO {
	
	private int idDossPart;
	private UtilisateurDTO utilisateur;
	public int getIdDossPart() {
		return idDossPart;
	}
	public void setIdDossPart(int idDossPart) {
		this.idDossPart = idDossPart;
	}
	
	public UtilisateurDTO getUtilisateur() {
		return utilisateur;
	}
	public void setUtilisateur(UtilisateurDTO utilisateur) {
		this.utilisateur = utilisateur;
	}
	
	
}
