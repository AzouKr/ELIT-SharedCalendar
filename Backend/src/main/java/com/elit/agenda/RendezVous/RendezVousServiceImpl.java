package com.elit.agenda.RendezVous;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import java.lang.reflect.Type;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.elit.agenda.Dossier.Dossier;
import com.elit.agenda.Dossier.DossierRepo;
import com.elit.agenda.Notification.Notification;
import com.elit.agenda.Notification.NotificationService;
import com.elit.agenda.Participant.Participant;
import com.elit.agenda.Participant.ParticipantService;
import com.elit.agenda.Utilisateur.Utilisateur;

@EnableScheduling
@Service
public class RendezVousServiceImpl implements RendezVousService {
	
	private RendezVousRepo rendezVousRepo;
	@Autowired
	private ParticipantService participantService;
	@Autowired
	NotificationService notificationService;
	@Autowired
	DossierRepo dossierRepo;


	public RendezVousServiceImpl(RendezVousRepo rendezVousRepo) {
		super();
		this.rendezVousRepo = rendezVousRepo;
	}

	
	
	@Override
	public RendezVousDTO getRdv(int id) {
		ModelMapper modelMapper = new ModelMapper();
		RendezVous existingrdv = rendezVousRepo.findById(id).orElseThrow();	
		RendezVousDTO rendezVousDTO = modelMapper.map(existingrdv, RendezVousDTO.class);
		return rendezVousDTO;	
	}
	
	

	@Override
	public RendezVousDTO addRdv(RendezVous rdv) {
		
		ModelMapper modelMapper = new ModelMapper();
		if(rdv.getType() == 0) {
			rdv.setColor("#F24A72");
		}
		if(rdv.getType() == 1) {
			rdv.setColor("#8479E1");
		}
		if(rdv.getType() == 2) {
			rdv.setColor("#5463FF");
		}
		RendezVous newRdv = rendezVousRepo.save(rdv);
		List<Participant> listPart = rdv.getParticipants();
		if(!listPart.isEmpty()) {
			for (Participant r: listPart) {
				r.getRendezVous().setid(newRdv.getid());
			}
			participantService.addParticipant(listPart,newRdv.getDescription());
			if(rdv.getType() == 1) {
				for (Participant r: listPart) {
					RendezVous newObj = new RendezVous();
					int idDossierPrv = dossierRepo.getIdDefaultFolder(r.getUtilisateur().getIdUtil());
					rdv.getDossier().setIdDossier(idDossierPrv);
					newObj.settitle(rdv.gettitle());
					newObj.setStart(rdv.getStart());
					newObj.setEnd(rdv.getEnd());
					newObj.setStartTime(rdv.getStartTime());
					newObj.setEndTime(rdv.getEndTime());
					newObj.setDescription(rdv.getDescription());
					newObj.setLieu(rdv.getLieu());
					newObj.setType(rdv.getType());
					newObj.setUtilisateur(rdv.getUtilisateur());
					newObj.setColor(rdv.getColor());
					newObj.setDossier(rdv.getDossier());
					RendezVous newRdvP = rendezVousRepo.save(newObj);
					participantService.addParticipantWithoutEmail(rdv.getParticipants(),newRdvP.getid());
				}
			}
		}
		
		LocalDate localDate = LocalDate.now();
		Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
		Notification notif = new Notification();
		notif.setTitre("Un Rendez-vous a été ajouté:  " + newRdv.gettitle());
		notif.setDateEnv(newRdv.getStart());
		notif.setRendezVous(newRdv);
		notif.setSeen(0);
		notif.setDateCreation(date);
		notificationService.addNotif(notif);
		
		RendezVous showrdv = rendezVousRepo.findById(newRdv.getid()).orElseThrow();
		RendezVousDTO rendezVousDTO = modelMapper.map(showrdv, RendezVousDTO.class);
		
		return rendezVousDTO;
	}
	
	
	

	@Override
	public RendezVousDTO updateRdv(RendezVous rdv, int id) {
		RendezVous existingrdv = rendezVousRepo.findById(id).orElseThrow();
		ModelMapper modelMapper = new ModelMapper();
		
		LocalDate localDate = LocalDate.now();
		Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
		
		List<Participant> listPart = rdv.getParticipants();
		notificationService.deleteNotif(id);
		existingrdv.settitle(rdv.gettitle());
		existingrdv.setStart(rdv.getStart());
		existingrdv.setEnd(rdv.getEnd());
		existingrdv.setStartTime(rdv.getStartTime());
		existingrdv.setEndTime(rdv.getEndTime());
		existingrdv.setDescription(rdv.getDescription());
		existingrdv.setLieu(rdv.getLieu());
		existingrdv.setType(rdv.getType());
		existingrdv.setDossier(rdv.getDossier());
		existingrdv.setUtilisateur(rdv.getUtilisateur());
		existingrdv.setColor(rdv.getColor());
		
		RendezVous newrdv = rendezVousRepo.save(existingrdv);
		if(!listPart.isEmpty()) {
			for (Participant r: listPart) {
				r.getRendezVous().setid(newrdv.getid());
			}
			participantService.updateParticipant(rdv.getParticipants(), id, newrdv.getDescription());
		}
		
		Notification notif = new Notification();
		notif.setTitre("Un Rendez-vous a été modifié:  " + newrdv.gettitle());
		notif.setDateEnv(newrdv.getStart());
		notif.setRendezVous(newrdv);
		notif.setSeen(0);
		notif.setDateCreation(date);
		notificationService.addNotif(notif);
		
		RendezVous showrdv = rendezVousRepo.findById(newrdv.getid()).orElseThrow();
		RendezVousDTO rendezVousDTO = modelMapper.map(showrdv, RendezVousDTO.class);
		return rendezVousDTO;
	}

	@Override
	public boolean deleteRdv(int id) {
		RendezVous existingrdv = rendezVousRepo.findById(id).orElseThrow();
		participantService.deleteParticipant(id);
		notificationService.deleteNotif(id);
		rendezVousRepo.delete(existingrdv);
		
		return true;
	}

	@Override
	public List<CalendarRdvDTO> getAllRdv(int idDossier, int idUtil) {
		Dossier doss = dossierRepo.findById(idDossier).orElseThrow();
		List<RendezVous> existingrdv = new ArrayList<RendezVous>();
		switch(doss.getType()) {
		case 0:
			existingrdv = rendezVousRepo.getAllRdv(idDossier);	 
			break;
		case 1:
			existingrdv = rendezVousRepo.getAllRdvPrv(idDossier, idUtil);
			break;
		case 2:
			existingrdv = rendezVousRepo.getAllRdv(idDossier);	
			break;
		case 3:
			existingrdv = rendezVousRepo.getAllRdvPrv(idDossier, idUtil);
			break;
		}
		ModelMapper modelMapper = new ModelMapper();
		Type listType = new TypeToken<List<CalendarRdvDTO>>(){}.getType();
		List<CalendarRdvDTO> CalendarRdvDTO = modelMapper.map(existingrdv, listType);
		
		return CalendarRdvDTO;
	}



	@Override
	public RdvStatsDTO getRdvStats(int idUtil) {
		RdvStatsDTO rdvstats = new RdvStatsDTO();
		rdvstats.setCreate(rendezVousRepo.getNbrRdvCreated(idUtil));
		rdvstats.setParticipate(rendezVousRepo.getNbrRdvParticipate(idUtil));
		rdvstats.setTotal(rdvstats.getCreate() + rdvstats.getParticipate());
		return rdvstats;
	}



	@Override
	public Float getTauxAchv() {
		
		LocalDate localDate = LocalDate.now();
		int NbrTotal = rendezVousRepo.getNbrRdv();
		int NbrRdvP=0;
		List<RendezVous> allRdv = rendezVousRepo.getAllRdv();
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		for (RendezVous r: allRdv) {
			String dateToString = df.format(r.getEnd());
			LocalDate rdvdate = LocalDate.parse(dateToString);
			if(localDate.isAfter(rdvdate)) {
				NbrRdvP++;
			}
		    }
		
		return (float) ((NbrRdvP*100)/NbrTotal);
	}



	@Override
	public List<RendezVousDTO> getTodaysRdv(int idUtil) {
		ZoneId defaultZoneId = ZoneId.systemDefault();
		LocalDate today = LocalDate.now();
		Date todayDate = Date.from(today.atStartOfDay(defaultZoneId).toInstant());
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String dateToString = df.format(todayDate);

		
		ModelMapper modelMapper = new ModelMapper();
		List<RendezVous> rdvPublic = rendezVousRepo.getTodaysRdv(dateToString,idUtil);	
		List<RendezVous> rdvCreated = rendezVousRepo.getTodaysRdvOwn(dateToString,idUtil);	
		List<RendezVous> rdvParticipated = rendezVousRepo.getTodaysRdvP(dateToString,idUtil);
		Set<RendezVous> set = new LinkedHashSet<>();
		set.addAll(rdvCreated);set.addAll(rdvParticipated);set.addAll(rdvPublic);
		Type listType = new TypeToken<List<RendezVousDTO>>(){}.getType();
		List<RendezVousDTO> rendezVousDTO = modelMapper.map(set, listType);
		
		return rendezVousDTO;
	}



	@Override
	@Scheduled(cron = "0 0 * * * *")
	public void deleteRdvAuto() {
		List<RendezVous> allRdv = rendezVousRepo.findAll();
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		LocalDate today = LocalDate.now();
		for (RendezVous r: allRdv) {
			String dateToString = df.format(r.getEnd());
			LocalDate rdvdate = LocalDate.parse(dateToString);
			LocalDate afterWeek = rdvdate.plusDays(7);
			if(afterWeek.isBefore(today)) {
				participantService.deleteParticipant(r.getid());
				notificationService.deleteNotif(r.getid());
				rendezVousRepo.delete(r);
			}
		}
		
		
	}



	@Override
	public List<RendezVousDTO> searchRdv(String search, int idUtil) {
		ModelMapper modelMapper = new ModelMapper();
		List<RendezVous> ListRdvOwn = rendezVousRepo.searchRdvOwn(search,idUtil);
		List<RendezVous> ListRdvPablic = rendezVousRepo.searchRdvPublic(search);
		List<RendezVous> ListRdvPartage = rendezVousRepo.searchRdvPartage(search);
		Set<RendezVous> set = new LinkedHashSet<>(ListRdvOwn);
        set.addAll(ListRdvOwn);set.addAll(ListRdvPablic);set.addAll(ListRdvPartage);
        List<RendezVous> combinedList = new ArrayList<>(set);
        Type listType = new TypeToken<List<RendezVousDTO>>(){}.getType();
		List<RendezVousDTO> rendezVousDTO = modelMapper.map(combinedList, listType);
		return rendezVousDTO;
	}



	@Override
	public void deleteAllRdvDoss(int doss) {
		List<RendezVous> ListRdv = rendezVousRepo.getAllRdv(doss);
		for (RendezVous r: ListRdv) {
			participantService.deleteParticipant(r.getid());
			notificationService.deleteNotif(r.getid());
		}
		rendezVousRepo.deleteAllRdvDoss(doss);
		
	}

	
}
