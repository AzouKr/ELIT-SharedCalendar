package com.elit.agenda.Utilisateur;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Random;

import javax.mail.MessagingException;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.elit.agenda.Notification.EmailSenderService;
import com.elit.agenda.Participant.Participant;
import com.elit.agenda.Participant.ParticipantRepo;
import com.elit.agenda.RendezVous.RendezVous;
import com.elit.agenda.RendezVous.RendezVousRepo;





@Service
public class UtilisateurServiceImpl implements UtilisateurService {
	
	private UtilisateurRepository utilisateurRepository;
	@Autowired
	private EmailSenderService emailSenderService;
	@Autowired
	private RendezVousRepo rendezVousRepo;
	@Autowired
	private ParticipantRepo participantRepo;

	public UtilisateurServiceImpl(UtilisateurRepository utilisateurRepository) {
		super();
		this.utilisateurRepository = utilisateurRepository;
	}
	


	
	public List<UtilisateurDTO> getAllUtilisateur(int idUtil) {
		ModelMapper modelMapper = new ModelMapper();
		List<Utilisateur> user = utilisateurRepository.findAll();
		Utilisateur currentUser = utilisateurRepository.getCurrentUser(idUtil);
		user.remove(currentUser);
		Type listType = new TypeToken<List<UtilisateurDTO>>(){}.getType();
		List<UtilisateurDTO> utilisateurDTO =  modelMapper.map(user, listType);
		return utilisateurDTO;
	}

	




	@Override
	public UtilisateurDTO updateUtilisateur(Utilisateur utilisateur, int idUtil) {
		Utilisateur existinguser = utilisateurRepository.findById(idUtil).orElseThrow();
		ModelMapper modelMapper = new ModelMapper();

		existinguser.setProfile_pic(utilisateur.getProfile_pic());
		existinguser.setNom(utilisateur.getNom());
		existinguser.setPrenom(utilisateur.getPrenom());
		existinguser.setDateN(utilisateur.getDateN());
		existinguser.setLieuN(utilisateur.getLieuN());
		existinguser.setEmail(utilisateur.getEmail());
		existinguser.setTel(utilisateur.getTel());
		existinguser.setWebsite(utilisateur.getWebsite());
		existinguser.setTwitter(utilisateur.getTwitter());
		existinguser.setFacebook(utilisateur.getFacebook());
		existinguser.setInstagram(utilisateur.getInstagram());
		existinguser.setGithub(utilisateur.getGithub());
		

		
		Utilisateur newUser = utilisateurRepository.save(existinguser);
		UtilisateurDTO utilisateurDTO = modelMapper.map(newUser, UtilisateurDTO.class);
		return utilisateurDTO;
	}




	@Override
	public Utilisateur findByUsername(String userName) {
		return utilisateurRepository.findByUsername(userName);
	}




	@Override
	public UtilisateurDTO findByEmail(EmailDTO email) {
		ModelMapper modelMapper = new ModelMapper();
		Utilisateur user = utilisateurRepository.findByUsername(email.getEmail());
		UtilisateurDTO utilisateurDTO =  modelMapper.map(user, UtilisateurDTO.class);
		return utilisateurDTO;
	}




	@Override
	public UtilisateurDTO getUtilisateurById(int IdUtil) {
		ModelMapper modelMapper = new ModelMapper();
		Utilisateur user = utilisateurRepository.findById(IdUtil).orElseThrow();
		UtilisateurDTO utilisateurDTO =  modelMapper.map(user, UtilisateurDTO.class);
		return utilisateurDTO;
	}




	@Override
	public List<UsersProfilePicDTO> getUsersProfilePic(int idUtil) {
		ModelMapper modelMapper = new ModelMapper();
		List<Utilisateur> user = utilisateurRepository.findAll();
		Utilisateur currentUser = utilisateurRepository.getCurrentUser(idUtil);
		user.remove(currentUser);
		Type listType = new TypeToken<List<UsersProfilePicDTO>>(){}.getType();
		List<UsersProfilePicDTO> UsersProfilePicDTO =  modelMapper.map(user, listType);
		return UsersProfilePicDTO;
	}




	@Override
	public VerificationCodeDTO verificationCode(EmailDTO email) {
		
		Utilisateur user = utilisateurRepository.findByUsername(email.getEmail());
		
		Random rnd = new Random();
	    int code = rnd.nextInt(999999);
		String emailId = email.getEmail();
		String subject = "Code de validation ELIT";
		String body = emailSenderService.createBodyCode(emailId, code);
		
		
		try {
			emailSenderService.sendMail(emailId, body, subject);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		VerificationCodeDTO verificationCodeDTO = new VerificationCodeDTO();
		verificationCodeDTO.setCode(code);
		verificationCodeDTO.setExiste(true);
		
		return verificationCodeDTO;
	}




	@Override
	public ModMdpResponse updateMdp(int idUtil, UpdateMdpDTO mdp) {
		Utilisateur existinguser = utilisateurRepository.findById(idUtil).orElseThrow();
		ModMdpResponse msgres = new ModMdpResponse();
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		boolean isPasswordMatch = passwordEncoder.matches(mdp.getOldMdp(), existinguser.getMdps());
		if(!isPasswordMatch) {
			msgres.setMsg("Votre ancien mot de passe a été mal saisi");
			msgres.setValid(false);
			return msgres;
		}
		if((mdp.getNewMdp().equals(mdp.getOldMdp()))) {
			msgres.setMsg("Le nouveau mot de passe ne peut pas être le même que votre ancien mot de passe.");
			msgres.setValid(false);
			return msgres;
		}
		if(!(mdp.getNewMdp().equals(mdp.getConfirMdp()))) {
			msgres.setMsg("Votre mot de passe et votre mot de passe de confirmation ne correspondent pas.");
			msgres.setValid(false);
			return msgres;
		}
		String encodedPassword = passwordEncoder.encode(mdp.getNewMdp());
		existinguser.setMdps(encodedPassword);
		utilisateurRepository.save(existinguser);
		msgres.setValid(true);
		return msgres;
	}




	@Override
	public boolean findEmail(String email) {
		Utilisateur user = utilisateurRepository.findByUsername(email);
		if(user == null) {
			return false;
		}
		return true;
	}




	@Override
	public ModMdpResponse setNewMdp(String email, MdpOublie mdp) {
		
		Utilisateur existinguser = utilisateurRepository.findByUsername(email);
		ModMdpResponse msgres = new ModMdpResponse();
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		boolean isPasswordMatch = passwordEncoder.matches(mdp.getNewMdp(), existinguser.getMdps());
		if(isPasswordMatch) {
			msgres.setMsg("Le nouveau mot de passe ne peut pas être le même que votre ancien mot de passe.");
			msgres.setValid(false);
			return msgres;
		}
		if(!(mdp.getNewMdp().equals(mdp.getConfirMdp()))) {
			msgres.setMsg("Votre mot de passe et votre mot de passe de confirmation ne correspondent pas.");
			msgres.setValid(false);
			return msgres;
		}
		String encodedPassword = passwordEncoder.encode(mdp.getNewMdp());
		existinguser.setMdps(encodedPassword);
		utilisateurRepository.save(existinguser);
		msgres.setValid(true);
		return msgres;
	}




	@Override
	public List<UtilisateurDTO> getUtilRdv(int idUtil, DateDTO date) {
		ModelMapper modelMapper = new ModelMapper();
		List<RendezVous> listIds = rendezVousRepo.getIdOccupe(date.getDate(), date.getHeureD(), date.getHeureF());
		List<Utilisateur> user = utilisateurRepository.findAll();
		Utilisateur currentUser = utilisateurRepository.getCurrentUser(idUtil);
		user.remove(currentUser);
		for (RendezVous l: listIds) {
			Utilisateur deletedone = utilisateurRepository.findById(l.getUtilisateur().getIdUtil()).orElseThrow();
			user.remove(deletedone);
		}
		List<Participant> listpart = participantRepo.getIdOccupe(date.getDate(), date.getHeureD(), date.getHeureF());
		for (Participant l: listpart) {
			Utilisateur deletedone = utilisateurRepository.findById(l.getUtilisateur().getIdUtil()).orElseThrow();
			user.remove(deletedone);
		}
		Type listType = new TypeToken<List<UtilisateurDTO>>(){}.getType();
		List<UtilisateurDTO> utilisateurDTO =  modelMapper.map(user, listType);
		return utilisateurDTO;
	}

}
