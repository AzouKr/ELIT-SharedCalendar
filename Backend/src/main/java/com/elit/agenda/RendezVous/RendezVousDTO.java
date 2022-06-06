package com.elit.agenda.RendezVous;

import java.sql.Time;
import java.util.Date;
import java.util.List;

import com.elit.agenda.Dossier.Dossier;
import com.elit.agenda.Dossier.DossierDTO;
import com.elit.agenda.Participant.Participant;
import com.elit.agenda.Participant.ParticipantDTO;
import com.elit.agenda.Utilisateur.UtilisateurDTO;


public class RendezVousDTO {
	
	private int id;
	private Date start;
	private Date end;
	private String description;
	private Time startTime;
	private Time endTime;
	private String lieu;
	private String title;
	private String color;
	private DossierDTO dossier;
	private UtilisateurDTO utilisateur;
	private List<ParticipantDTO> Participants;
	private byte type;
	
	

	
	
	public List<ParticipantDTO> getParticipants() {
		return Participants;
	}
	public void setParticipants(List<ParticipantDTO> participants) {
		Participants = participants;
	}
	public UtilisateurDTO getUtilisateur() {
		return utilisateur;
	}
	public void setUtilisateur(UtilisateurDTO utilisateur) {
		this.utilisateur = utilisateur;
	}	
	public DossierDTO getDossier() {
		return dossier;
	}
	public void setDossier(DossierDTO dossier) {
		this.dossier = dossier;
	}
	public int getid() {
		return id;
	}
	public void setid(int id) {
		this.id = id;
	}
	public Date getStart() {
		return start;
	}
	public void setStart(Date start) {
		this.start = start;
	}
	public Date getEnd() {
		return end;
	}
	public void setEnd(Date end) {
		this.end = end;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Time getStartTime() {
		return startTime;
	}
	public void setStartTime(Time startTime) {
		this.startTime = startTime;
	}
	public Time getEndTime() {
		return endTime;
	}
	public void setEndTime(Time endTime) {
		this.endTime = endTime;
	}
	public String getLieu() {
		return lieu;
	}
	public void setLieu(String lieu) {
		this.lieu = lieu;
	}
	public String gettitle() {
		return title;
	}
	public void settitle(String title) {
		this.title = title;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public byte getType() {
		return type;
	}
	public void setType(byte type) {
		this.type = type;
	}

	
	

}
