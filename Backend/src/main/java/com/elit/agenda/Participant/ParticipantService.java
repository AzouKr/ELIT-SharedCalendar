package com.elit.agenda.Participant;

import java.util.List;

public interface ParticipantService {

	List<ParticipantDTO> addParticipant(List<Participant> participant, String description);
	void addParticipantWithoutEmail(List<Participant> participant, int newRdvP);
	void adddParticipant();
	void deleteParticipant(int idRdv);
	List<ParticipantDTO> getParticipant(int idRdv);
	void updateParticipant(List<Participant> participant, int idRdv, String description);
}
