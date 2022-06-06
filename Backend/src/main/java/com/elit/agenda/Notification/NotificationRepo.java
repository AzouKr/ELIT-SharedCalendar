package com.elit.agenda.Notification;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;


public interface NotificationRepo extends JpaRepository<Notification, Integer> {
	@Query("SELECT n FROM Notification n inner join n.rendezVous u WHERE u.utilisateur.idUtil = ?1")
	List<Notification> getNotifOwn(int idUtil);
	
	@Query(value ="SELECT * FROM agenda.notification inner join agenda.participant WHERE agenda.notification.id_rdv = agenda.participant.id_rdv_p &&  agenda.participant.id_user = ?1 && agenda.notification.seen = 0", nativeQuery = true)
	List<Notification> getNotifPart(int idUtil);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM Notification n WHERE n.rendezVous.id = ?1")
	void deleteNotif(int id);
}
