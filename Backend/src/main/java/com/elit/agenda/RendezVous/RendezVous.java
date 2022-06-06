package com.elit.agenda.RendezVous;

import java.sql.Time;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.elit.agenda.Dossier.Dossier;
import com.elit.agenda.Notification.Notification;
import com.elit.agenda.Utilisateur.Utilisateur;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

import com.elit.agenda.Participant.Participant;


@Data
@Entity
@Table(name="rendez_vous")
public class RendezVous {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_rdv", unique=true, nullable=false)
	private int id;

	@Temporal(TemporalType.DATE)
	@Column(name="date_d", nullable=false)
	private Date start;

	@Temporal(TemporalType.DATE)
	@Column(name="date_f", nullable=false)
	private Date end;

	@Column(nullable=false, length=300)
	private String description;

	@Column(name="heure_d", nullable=false)
	private Time startTime;

	@Column(name="heure_f", nullable=false)
	private Time endTime;

	@Column(nullable=false, length=100)
	private String lieu;

	@Column(name="titre", nullable=false, length=100)
	private String title;

	@Column(nullable=false)
	private byte type;
	
	@Column(nullable=false, length=45)
	private String color;


	//bi-directional many-to-one association to Notification
	@OneToMany(mappedBy="rendezVous",fetch = FetchType.LAZY)
	private List<Notification> notifications;
	
	//bi-directional many-to-one association to Participant
		@OneToMany(mappedBy="rendezVous",fetch = FetchType.LAZY)
		private List<Participant> participants;

	//bi-directional many-to-one association to Dossier
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="id_doss", nullable=false)
	private Dossier dossier;

	//bi-directional many-to-one association to Utilisateur
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="id_creator", nullable=false)
	private Utilisateur utilisateur;
	
	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public RendezVous() {
	}

	public int getid() {
		return this.id;
	}

	public void setid(int id) {
		this.id = id;
	}

	public Date getStart() {
		return this.start;
	}

	public void setStart(Date start) {
		this.start = start;
	}

	public Date getEnd() {
		return this.end;
	}

	public void setEnd(Date end) {
		this.end = end;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Time getStartTime() {
		return this.startTime;
	}

	public void setStartTime(Time startTime) {
		this.startTime = startTime;
	}

	public Time getEndTime() {
		return this.endTime;
	}

	public void setEndTime(Time endTime) {
		this.endTime = endTime;
	}

	public String getLieu() {
		return this.lieu;
	}

	public void setLieu(String lieu) {
		this.lieu = lieu;
	}

	public String gettitle() {
		return this.title;
	}

	public void settitle(String title) {
		this.title = title;
	}

	public byte getType() {
		return this.type;
	}

	public void setType(byte type) {
		this.type = type;
	}
	
	public List<Participant> getParticipants() {
		return this.participants;
	}

	public void setParticipants(List<Participant> participants) {
		this.participants = participants;
	}

	public Participant addParticipant(Participant participant) {
		getParticipants().add(participant);
		participant.setRendezVous(this);

		return participant;
	}

	public Participant removeParticipant(Participant participant) {
		getParticipants().remove(participant);
		participant.setRendezVous(null);

		return participant;
	}

	public List<Notification> getNotifications() {
		return this.notifications;
	}

	public void setNotifications(List<Notification> notifications) {
		this.notifications = notifications;
	}

	public Notification addNotification(Notification notification) {
		getNotifications().add(notification);
		notification.setRendezVous(this);

		return notification;
	}

	public Notification removeNotification(Notification notification) {
		getNotifications().remove(notification);
		notification.setRendezVous(null);

		return notification;
	}
	
	
	public Dossier getDossier() {
		return this.dossier;
	}

	public void setDossier(Dossier dossier) {
		this.dossier = dossier;
	}

	public Utilisateur getUtilisateur() {
		return this.utilisateur;
	}

	public void setUtilisateur(Utilisateur utilisateur) {
		this.utilisateur = utilisateur;
	}
}
