package com.elit.agenda.Dossier;

import java.util.List;

import com.elit.agenda.PartageDossier.PartageDossier;
import com.elit.agenda.PartageDossier.PartageDossierDTO;

public class DossierDTO {
	
	private int idDossier;
	private String titre;
	private byte type;
	private int id_doss_creator;
	private List<PartageDossierDTO> partageDossiers;
	
	
	
	public List<PartageDossierDTO> getPartageDossiers() {
		return partageDossiers;
	}
	public void setPartageDossiers(List<PartageDossierDTO> partageDossiers) {
		this.partageDossiers = partageDossiers;
	}
	public int getId_doss_creator() {
		return id_doss_creator;
	}
	public void setId_doss_creator(int id_doss_creator) {
		this.id_doss_creator = id_doss_creator;
	}
	public int getIdDossier() {
		return idDossier;
	}
	public void setIdDossier(int idDossier) {
		this.idDossier = idDossier;
	}
	
	public String getTitre() {
		return titre;
	}
	public void setTitre(String titre) {
		this.titre = titre;
	}
	public byte getType() {
		return type;
	}
	public void setType(byte type) {
		this.type = type;
	}
	

}
