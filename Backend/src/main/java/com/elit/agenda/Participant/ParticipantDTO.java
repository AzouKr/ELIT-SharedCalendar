package com.elit.agenda.Participant;

import com.elit.agenda.Utilisateur.UtilisateurDTO;

public class ParticipantDTO {
	
	private int idPart;
	private UtilisateurDTO utilisateur;
	
	
	public int getIdPart() {
		return idPart;
	}
	public void setIdPart(int idPart) {
		this.idPart = idPart;
	}
	public UtilisateurDTO getUtilisateur() {
		return utilisateur;
	}
	public void setUtilisateur(UtilisateurDTO utilisateur) {
		this.utilisateur = utilisateur;
	}
	
	

}
