package com.elit.agenda.Notification;



import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/notification")
public class NotificationController {
	
	private NotificationService notificationService;

	public NotificationController(NotificationService notificationService) {
		super();
		this.notificationService = notificationService;
	}


	@GetMapping("/{idUtil}")
	public List<NotificationDTO> getAllRdvInDoss(@PathVariable("idUtil") int idUtil){
		List<NotificationDTO> notificationDTO = notificationService.getNotif(idUtil); 
		return notificationDTO;
	}
	
	@GetMapping("/test")
	public void sendSms(){
		notificationService.sendSms();
		
	}
	

}
