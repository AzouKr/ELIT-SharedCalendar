package com.elit.agenda.Utilisateur;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer>{
	@Query("SELECT u FROM Utilisateur u WHERE u.email = ?1")
	Utilisateur findByUsername(String userName);
	@Query("SELECT u FROM Utilisateur u WHERE u.idUtil = ?1")
	Utilisateur getCurrentUser(int idUtil);

}
