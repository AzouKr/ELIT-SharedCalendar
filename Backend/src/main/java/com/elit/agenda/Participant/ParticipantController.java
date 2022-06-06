package com.elit.agenda.Participant;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/participant")
public class ParticipantController {

	private ParticipantService participantService;
	
	public ParticipantController(ParticipantService participantService) {
		super();
		this.participantService = participantService;
	}


	@PostMapping("/add")
	public void addParticipant(){
		participantService.adddParticipant();
	}
	
	@GetMapping("/getAllParticipant/{idRdv}")
	public List<ParticipantDTO> getParticipant(@PathVariable("idRdv") int idRdv){
		return participantService.getParticipant(idRdv);
	}
	@GetMapping("/deleteAllParticipant/{idRdv}")
	public void deleteParticipant(@PathVariable("idRdv") int idRdv){
		participantService.deleteParticipant(idRdv);
	}
}
