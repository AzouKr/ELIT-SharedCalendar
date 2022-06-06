package com.elit.agenda.Utilisateur;

import java.util.Date;


public class UtilisateurDTO {
	
	private int idUtil;
	private Date dateN;
	private String email;
	private String lieuN;
	private String nom;
	private String prenom;	
	private Date dateR;
	private String profile_pic;
	private int tel;
	private String website;
	private String github;
	private String facebook;
	private String twitter;
	private String instagram;
	private String speciality;

	
	
	
	public String getSpeciality() {
		return speciality;
	}
	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	public String getGithub() {
		return github;
	}
	public void setGithub(String github) {
		this.github = github;
	}
	public String getFacebook() {
		return facebook;
	}
	public void setFacebook(String facebook) {
		this.facebook = facebook;
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
	public Date getDateR() {
		return dateR;
	}
	public void setDateR(Date dateR) {
		this.dateR = dateR;
	}
	public String getProfile_pic() {
		return profile_pic;
	}
	public void setProfile_pic(String profile_pic) {
		this.profile_pic = profile_pic;
	}
	public int getIdUtil() {
		return idUtil;
	}
	public void setIdUtil(int idUtil) {
		this.idUtil = idUtil;
	}
	public Date getDateN() {
		return dateN;
	}
	public void setDateN(Date dateN) {
		this.dateN = dateN;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getLieuN() {
		return lieuN;
	}
	public void setLieuN(String lieuN) {
		this.lieuN = lieuN;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public int getTel() {
		return tel;
	}
	public void setTel(int tel) {
		this.tel = tel;
	}
	
	

}
