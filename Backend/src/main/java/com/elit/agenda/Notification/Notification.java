package com.elit.agenda.Notification;

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
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.elit.agenda.RendezVous.RendezVous;

import lombok.Data;


@Data
@Entity
@Table(name="notification")
public class Notification {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_notif", unique=true, nullable=false)
	private int idNotif;

	@Temporal(TemporalType.DATE)
	@Column(name="date_env", nullable=false)
	private Date dateEnv;
	@Temporal(TemporalType.DATE)
	@Column(name="date_creation", nullable=false)
	private Date dateCreation;

	@Column(nullable=false, length=200)
	private String titre;
	
	@Column(nullable=false)
	private int seen;

	//bi-directional many-to-one association to RendezVous
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="id_rdv", nullable=false)
	private RendezVous rendezVous;

	public Notification() {
	}

	public int getIdNotif() {
		return this.idNotif;
	}

	public void setIdNotif(int idNotif) {
		this.idNotif = idNotif;
	}

	public Date getDateEnv() {
		return this.dateEnv;
	}

	public void setDateEnv(Date dateEnv) {
		this.dateEnv = dateEnv;
	}

	public String getTitre() {
		return this.titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public RendezVous getRendezVous() {
		return this.rendezVous;
	}

	public void setRendezVous(RendezVous rendezVous) {
		this.rendezVous = rendezVous;
	}

	public int getSeen() {
		return seen;
	}

	public void setSeen(int seen) {
		this.seen = seen;
	}

	public Date getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}

	

	
	
	
	
}
