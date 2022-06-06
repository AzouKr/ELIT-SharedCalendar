package com.elit.agenda.Utilisateur;

import java.util.List;

public interface UtilisateurService {
	List<UtilisateurDTO> getAllUtilisateur(int idUtil);
	List<UtilisateurDTO> getUtilRdv(int idUtil, DateDTO date);
	UtilisateurDTO getUtilisateurById(int IdUtil);
	UtilisateurDTO updateUtilisateur(Utilisateur utilisateur, int idUtil);
	Utilisateur findByUsername(String userName);
	UtilisateurDTO findByEmail(EmailDTO email);
	List<UsersProfilePicDTO> getUsersProfilePic(int idUtil);
	VerificationCodeDTO verificationCode(EmailDTO email); 
	ModMdpResponse updateMdp(int idUtil, UpdateMdpDTO mdp);
	boolean findEmail(String email);
	ModMdpResponse setNewMdp(String email,MdpOublie mdp);
}
