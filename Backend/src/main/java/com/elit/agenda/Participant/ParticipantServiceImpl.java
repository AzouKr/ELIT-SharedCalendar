package com.elit.agenda.Participant;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.elit.agenda.Notification.EmailSenderService;
import com.elit.agenda.Notification.TwilioSmsSender;
import com.elit.agenda.RendezVous.RendezVous;
import com.elit.agenda.RendezVous.RendezVousDTO;
import com.elit.agenda.RendezVous.RendezVousRepo;
import com.elit.agenda.RendezVous.RendezVousService;
import com.elit.agenda.Utilisateur.Utilisateur;
import com.elit.agenda.Utilisateur.UtilisateurDTO;
import com.elit.agenda.Utilisateur.UtilisateurService;

@Service
public class ParticipantServiceImpl implements ParticipantService{
	
	private ParticipantRepo participantRepo;
	@Autowired
	private EmailSenderService emailSenderService;
	@Autowired
	private UtilisateurService utilisateurService;
	@Autowired
	private RendezVousRepo rendezVousRepo;
	@Autowired
	TwilioSmsSender twilioSmsSender;


	public ParticipantServiceImpl(ParticipantRepo participantRepo) {
		super();
		this.participantRepo = participantRepo;
	}



	@Override
	public List<ParticipantDTO> addParticipant(List<Participant> participant, String description) {
		
		ModelMapper modelMapper = new ModelMapper();
		participantRepo.saveAll(participant);		
		int id_rdv = participant.get(0).getRendezVous().getid();
		List<Participant> existingParticipant = participantRepo.getParticipant(id_rdv);
		Type listType = new TypeToken<List<ParticipantDTO>>(){}.getType();
		List<ParticipantDTO> participantDTO = modelMapper.map(existingParticipant, listType);
		RendezVous current = rendezVousRepo.findById(id_rdv).orElseThrow();
		
//		String[] emailIds = new String[participantDTO.size()];
//		String subject = "Un nouveau Rendez-Vous a été ajoutée";
//		String body = emailSenderService.createBody(current);
//		
//		int i = 0;
//		for (ParticipantDTO p: participantDTO) {
//			UtilisateurDTO user = utilisateurService.getUtilisateurById(p.getUtilisateur().getIdUtil());
//			emailIds[i]= user.getEmail();
//			i++;
//		    }
//
//		try {
//			emailSenderService.sendMails(emailIds, body, subject);
//		} catch (MessagingException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
		return null;
	}



	@Override
	public List<ParticipantDTO> getParticipant(int id) {
		ModelMapper modelMapper = new ModelMapper();
		List<Participant> listParticipant = participantRepo.getParticipant(id);
		Type listType = new TypeToken<List<ParticipantDTO>>(){}.getType();
		List<ParticipantDTO> participantDTO = modelMapper.map(listParticipant, listType);
		
		return participantDTO;
	}



	@Override
	public void deleteParticipant(int idRdv) {
		participantRepo.deleteAllPart(idRdv);
	}



	@Override
	public void updateParticipant(List<Participant> participant, int idRdv, String description) {
		participantRepo.deleteAllPart(idRdv);
		ModelMapper modelMapper = new ModelMapper();
		participantRepo.saveAll(participant);		
		int id_rdv = participant.get(0).getRendezVous().getid();
		List<Participant> existingParticipant = participantRepo.getParticipant(id_rdv);
		Type listType = new TypeToken<List<ParticipantDTO>>(){}.getType();
		List<ParticipantDTO> participantDTO = modelMapper.map(existingParticipant, listType);
		
		String[] emailIds = new String[participantDTO.size()];
		String subject = "Un Rendez-Vous a été modifiée";
		String body = description;
		
		int i = 0;
		for (ParticipantDTO p: participantDTO) {
			UtilisateurDTO user = utilisateurService.getUtilisateurById(p.getUtilisateur().getIdUtil());
			emailIds[i]= user.getEmail();
			i++;
		    }

		try {
			emailSenderService.sendMails(emailIds, body, subject);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		
	}



	@Override
	public void adddParticipant() {
		
//		String message = "Rappel : vous avez un rendez-vous dans une heure \"Meeting avec AYADI Naila\"";
//		twilioSmsSender.sendSms("+213774736674", message);
		System.out.println("hello");		
	}



	@Override
	public void addParticipantWithoutEmail(List<Participant> participant, int newRdvP) {
		List<Participant> listPart = new ArrayList<>();
		for (Participant r: participant) {
			Participant part = new Participant();
			part.setRendezVous(r.getRendezVous());
			part.getRendezVous().setid(newRdvP);
			part.setUtilisateur(r.getUtilisateur());
			listPart.add(part);
		}
		participantRepo.saveAll(listPart);
	}
	
	
	

}
