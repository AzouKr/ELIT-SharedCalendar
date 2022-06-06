package com.elit.agenda.PartageDossier;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.elit.agenda.Dossier.Dossier;
import com.elit.agenda.Utilisateur.Utilisateur;

import lombok.Data;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;


@Data
@Entity
@Table(name="partage_dossier")
@NamedQuery(name="PartageDossier.findAll", query="SELECT p FROM PartageDossier p")
public class PartageDossier implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_doss_part")
	private int idDossPart;

	//bi-directional many-to-one association to Dossier
	@ManyToOne
	@JoinColumn(name="id_doss_p")
	private Dossier dossier;
	
	//bi-directional many-to-one association to Utilisateur
		@ManyToOne
		@JoinColumn(name="id_user")
		private Utilisateur utilisateur;

	public PartageDossier() {
	}

	public int getIdDossPart() {
		return this.idDossPart;
	}

	public void setIdDossPart(int idDossPart) {
		this.idDossPart = idDossPart;
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