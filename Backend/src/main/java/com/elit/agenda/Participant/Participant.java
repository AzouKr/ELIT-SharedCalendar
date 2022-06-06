package com.elit.agenda.Participant;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.elit.agenda.RendezVous.RendezVous;
import com.elit.agenda.Utilisateur.Utilisateur;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import lombok.Data;



@Data
@Entity
@NamedQuery(name="Participant.findAll", query="SELECT p FROM Participant p")
public class Participant implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id_part")
	private int idPart;

	//bi-directional many-to-one association to RendezVous
	@ManyToOne
	@JoinColumn(name="id_rdv_p")
	private RendezVous rendezVous;

	//bi-directional many-to-one association to Utilisateur
	@ManyToOne
	@JoinColumn(name="id_user")
	private Utilisateur utilisateur;

	public Participant() {
	}

	public int getIdPart() {
		return this.idPart;
	}

	public void setIdPart(int idPart) {
		this.idPart = idPart;
	}

	public RendezVous getRendezVous() {
		return this.rendezVous;
	}

	public void setRendezVous(RendezVous rendezVous) {
		this.rendezVous = rendezVous;
	}

	public Utilisateur getUtilisateur() {
		return this.utilisateur;
	}

	public void setUtilisateur(Utilisateur utilisateur) {
		this.utilisateur = utilisateur;
	}

}