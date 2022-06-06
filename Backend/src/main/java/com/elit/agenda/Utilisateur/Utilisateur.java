package com.elit.agenda.Utilisateur;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.elit.agenda.PartageDossier.PartageDossier;
import com.elit.agenda.Participant.Participant;
import com.elit.agenda.RendezVous.RendezVous;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;



@Data
@Entity
@Table(name="utilisateur")
public class Utilisateur {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="id_util", unique=true, nullable=false)
	private int idUtil;

	@Temporal(TemporalType.DATE)
	@Column(name="date_n", nullable=false)
	private Date dateN;
	
	@Temporal(TemporalType.DATE)
	@Column(name="date_rec", nullable=false)
	private Date dateR;

	@Column(nullable=false, length=45)
	private String email;

	@Column(name="lieu_n", nullable=false, length=45)
	private String lieuN;
	@JsonIgnore
	@Column(nullable=false, length=100)
	private String mdps;

	@Column(nullable=false, length=45)
	private String nom;

	@Column(nullable=false, length=45)
	private String prenom;

	@Column(nullable=false)
	private int tel;
	
	@Column(nullable=false, length=200)
	private String profile_pic;
	
	@Column(nullable=false, length=45)
	private String speciality;
	
	@Column(nullable=true, length=100)
	private String github;
	
	@Column(nullable=true, length=100)
	private String website;
	
	@Column(nullable=true, length=100)
	private String twitter;
	
	@Column(nullable=true, length=100)
	private String instagram;

	@Column(nullable=true, length=100)
	private String facebook;
	
	
	
	
	//bi-directional many-to-one association to PartageDossier
		@OneToMany(mappedBy="utilisateur",fetch = FetchType.LAZY)
		private List<PartageDossier> partageDossiers;

		//bi-directional many-to-one association to Participant
		@OneToMany(mappedBy="utilisateur",fetch = FetchType.LAZY)
		private List<Participant> participants;

	//bi-directional many-to-one association to RendezVous
	@OneToMany(mappedBy="utilisateur",fetch = FetchType.LAZY)
	private List<RendezVous> rendezVouses;

	public Utilisateur() {
	}

	
	
	
	public String getSpeciality() {
		return speciality;
	}




	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}




	public String getGithub() {
		return github;
	}




	public void setGithub(String github) {
		this.github = github;
	}




	public String getWebsite() {
		return website;
	}




	public void setWebsite(String website) {
		this.website = website;
	}




	public String getTwitter() {
		return twitter;
	}




	public void setTwitter(String twitter) {
		this.twitter = twitter;
	}




	public String getInstagram() {
		return instagram;
	}




	public void setInstagram(String instagram) {
		this.instagram = instagram;
	}




	public String getFacebook() {
		return facebook;
	}




	public void setFacebook(String facebook) {
		this.facebook = facebook;
	}




	public Date getDareR() {
		return dateR;
	}



	public void setDareR(Date dareR) {
		this.dateR = dareR;
	}



	public String getProfile_pic() {
		return profile_pic;
	}



	public void setProfile_pic(String profile_pic) {
		this.profile_pic = profile_pic;
	}



	public int getIdUtil() {
		return this.idUtil;
	}

	public void setIdUtil(int idUtil) {
		this.idUtil = idUtil;
	}

	public Date getDateN() {
		return this.dateN;
	}

	public void setDateN(Date dateN) {
		this.dateN = dateN;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLieuN() {
		return this.lieuN;
	}

	public void setLieuN(String lieuN) {
		this.lieuN = lieuN;
	}

	public String getMdps() {
		return this.mdps;
	}

	public void setMdps(String mdps) {
		this.mdps = mdps;
	}

	public String getNom() {
		return this.nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return this.prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public int getTel() {
		return this.tel;
	}

	public void setTel(int tel) {
		this.tel = tel;
	}
	
	public List<PartageDossier> getPartageDossiers() {
		return this.partageDossiers;
	}

	public void setPartageDossiers(List<PartageDossier> partageDossiers) {
		this.partageDossiers = partageDossiers;
	}

	public PartageDossier addPartageDossier(PartageDossier partageDossier) {
		getPartageDossiers().add(partageDossier);
		partageDossier.setUtilisateur(this);

		return partageDossier;
	}

	public PartageDossier removePartageDossier(PartageDossier partageDossier) {
		getPartageDossiers().remove(partageDossier);
		partageDossier.setUtilisateur(null);

		return partageDossier;
	}

	public List<Participant> getParticipants() {
		return this.participants;
	}

	public void setParticipants(List<Participant> participants) {
		this.participants = participants;
	}


	public List<RendezVous> getRendezVouses() {
		return this.rendezVouses;
	}

	public void setRendezVouses(List<RendezVous> rendezVouses) {
		this.rendezVouses = rendezVouses;
	}

	public RendezVous addRendezVous(RendezVous rendezVous) {
		getRendezVouses().add(rendezVous);
		rendezVous.setUtilisateur(this);

		return rendezVous;
	}

	public RendezVous removeRendezVous(RendezVous rendezVous) {
		getRendezVouses().remove(rendezVous);
		rendezVous.setUtilisateur(null);

		return rendezVous;
	}

}
