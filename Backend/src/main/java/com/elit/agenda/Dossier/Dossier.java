package com.elit.agenda.Dossier;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.elit.agenda.RendezVous.RendezVous;

import lombok.Data;
import com.elit.agenda.Dossier.*;
import com.elit.agenda.PartageDossier.*;


@Data
@Entity
@Table(name="dossier")

public class Dossier {
	
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_dossier", unique=true, nullable=false)
	private int idDossier;

	@Column(nullable=false, length=45)
	private String titre;

	@Column(nullable=false)
	private byte type;
	
	@Column(nullable=false)
	private int id_doss_creator;
	
	
	
	//bi-directional many-to-one association to PartageDossier
		@OneToMany(mappedBy="dossier",fetch = FetchType.LAZY)
		private List<PartageDossier> partageDossiers;

	//bi-directional many-to-one association to RendezVous
	@OneToMany(mappedBy="dossier",fetch = FetchType.LAZY)
	private List<RendezVous> rendezVouses;

	public Dossier() {
	}

	public int getIdDossier() {
		return this.idDossier;
	}

	public void setIdDossier(int idDossier) {
		this.idDossier = idDossier;
	}

	public String getTitre() {
		return this.titre;
	}

	public void setTitre(String titre) {
		this.titre = titre;
	}

	public byte getType() {
		return this.type;
	}

	public void setType(byte type) {
		this.type = type;
	}
	
	
	
	public int getId_doss_creator() {
		return id_doss_creator;
	}

	public void setId_doss_creator(int id_doss_creator) {
		this.id_doss_creator = id_doss_creator;
	}

	public List<PartageDossier> getPartageDossiers() {
		return this.partageDossiers;
	}

	public void setPartageDossiers(List<PartageDossier> partageDossiers) {
		this.partageDossiers = partageDossiers;
	}

	public PartageDossier addPartageDossier(PartageDossier partageDossier) {
		getPartageDossiers().add(partageDossier);
		partageDossier.setDossier(this);

		return partageDossier;
	}

	public PartageDossier removePartageDossier(PartageDossier partageDossier) {
		getPartageDossiers().remove(partageDossier);
		partageDossier.setDossier(null);

		return partageDossier;
	}

	public List<RendezVous> getRendezVouses() {
		return this.rendezVouses;
	}

	public void setRendezVouses(List<RendezVous> rendezVouses) {
		this.rendezVouses = rendezVouses;
	}

	public RendezVous addRendezVous(RendezVous rendezVous) {
		getRendezVouses().add(rendezVous);
		rendezVous.setDossier(this);

		return rendezVous;
	}

	public RendezVous removeRendezVous(RendezVous rendezVous) {
		getRendezVouses().remove(rendezVous);
		rendezVous.setDossier(null);

		return rendezVous;
	}
}
