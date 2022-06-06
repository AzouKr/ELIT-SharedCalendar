package com.elit.agenda.Notification;

import java.util.List;


public interface NotificationService {
	
	void addNotif(Notification notification);
	List<NotificationDTO> getNotif(int idUtil);
	void deleteNotif(int rdv);
	void markSeen();
	void sendSms();
}
