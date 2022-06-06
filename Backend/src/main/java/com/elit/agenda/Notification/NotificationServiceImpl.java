package com.elit.agenda.Notification;

import java.lang.reflect.Type;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.elit.agenda.Participant.Participant;
import com.elit.agenda.RendezVous.RendezVous;
import com.elit.agenda.RendezVous.RendezVousRepo;

@EnableScheduling
@Service
public class NotificationServiceImpl implements NotificationService {
	
	private NotificationRepo notificationRepo;
	@Autowired
	TwilioSmsSender twilioSmsSender;
	@Autowired
	RendezVousRepo rendezVousRepo;
	
	public NotificationServiceImpl(NotificationRepo notificationRepo) {
		super();
		this.notificationRepo = notificationRepo;
	}

	@Override
	public void addNotif(Notification notification) {
		notificationRepo.save(notification);
	}

	@Override
	public List<NotificationDTO> getNotif(int idUtil) {
		
		ModelMapper modelMapper = new ModelMapper();
		//List<Notification> notifOwn = notificationRepo.getNotifOwn(idUtil);
		List<Notification> notifPart = notificationRepo.getNotifPart(idUtil);
		List<Notification> listNotif = new ArrayList<>();
		//listNotif.addAll(notifOwn);listNotif.addAll(notifPart);
		for (Notification n: notifPart) {
			if(n.getSeen() == 0) {
				listNotif.add(n);
			}
		}
		Type listType = new TypeToken<List<NotificationDTO>>(){}.getType();
		List<NotificationDTO> notificationDTO = modelMapper.map(listNotif, listType);
		
		return notificationDTO;
	}

	@Override
	public void deleteNotif(int rdv) {
		notificationRepo.deleteNotif(rdv);
		
	}

	@Override
	@Scheduled(cron = "0 0 0 * * *")
	public void markSeen() {
		List<Notification> ListNotif = notificationRepo.findAll();
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		LocalDate today = LocalDate.now();
		for (Notification n: ListNotif) {
			String dateToString = df.format(n.getDateCreation());
			LocalDate notifdatecreation = LocalDate.parse(dateToString);
			if(today.isAfter(notifdatecreation)) {
				n.setSeen(1);
			}
		}
		
		notificationRepo.saveAll(ListNotif);
				
	}

	@Override
	@Scheduled(cron = "0 0 * * * *")
	public void sendSms() {
		
		List<RendezVous> ListRdv = rendezVousRepo.findAll();
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		LocalDate localDate = LocalDate.now();
		
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("HH");
		String time = LocalTime.now().format(dtf);
		LocalTime timeNow = LocalTime.parse(time.toString(),dtf);
		
		for (RendezVous r: ListRdv) {
			String dateToString = df.format(r.getStart());
			LocalDate rdvdate = LocalDate.parse(dateToString);
			if(localDate.isEqual(rdvdate)) {
				if((r.getStartTime().getHours() - timeNow.getHour()) == 1) {
					String message = "Vous avez un Rendez-vous à: " + r.getStartTime() + " titré: "+r.gettitle();
					String telNbr;
					List<Participant> ListPart = r.getParticipants();
					for (Participant p: ListPart) {
						telNbr = "+213"+Integer.toString(p.getUtilisateur().getTel());
						//twilioSmsSender.sendSms(telNbr, message);
					}
					
					
				}
			}

		}
		
		
	}


	
}
