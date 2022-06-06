package com.elit.agenda.Notification;

import java.util.Date;

import com.elit.agenda.RendezVous.RendezVousDTO;

public class NotificationDTO {

	private int idNotif;
	private Date dateEnv;
	private String titre;
	
	public int getIdNotif() {
		return idNotif;
	}
	public void setIdNotif(int idNotif) {
		this.idNotif = idNotif;
	}
	public Date getDateEnv() {
		return dateEnv;
	}
	public void setDateEnv(Date dateEnv) {
		this.dateEnv = dateEnv;
	}
	public String getTitre() {
		return titre;
	}
	public void setTitre(String titre) {
		this.titre = titre;
	}
	
	
}
