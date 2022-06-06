package com.elit.agenda.RendezVous;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.elit.agenda.Notification.EmailSenderService;
import com.elit.agenda.Participant.Participant;


@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/rdv")
public class RendezVousController {

	private RendezVousService rendezVousService;

	public RendezVousController(RendezVousService rendezVousService) {
		super();
		this.rendezVousService = rendezVousService;
	}
	
	
	@GetMapping("/{idRdv}")
	public RendezVousDTO getARdvByid(@PathVariable("idRdv") int idRdv){
		return rendezVousService.getRdv(idRdv);
	}
	

	
	
	@PostMapping("/add")
	public RendezVousDTO addRdv(@RequestBody RendezVous rdv){
		return rendezVousService.addRdv(rdv);
	}
	
	
	@PostMapping("/update/{idRdv}")
	public RendezVousDTO updateRdv(@RequestBody RendezVous rdv, @PathVariable("idRdv") int idRdv){
		return rendezVousService.updateRdv(rdv, idRdv);
	}
	
	
	@GetMapping("/delete/{idRdv}")
	public boolean deleteRdv(@PathVariable("idRdv") int idRdv){
		return rendezVousService.deleteRdv(idRdv);
	}
	
	@GetMapping("/getrdvstats/{idutil}")
	public RdvStatsDTO getRdvStats(@PathVariable("idutil") int idUtil){
		return rendezVousService.getRdvStats(idUtil);
	}
	
	@GetMapping("/gettauxachv")
	public Float getTauxAchv(){
		return rendezVousService.getTauxAchv();
	}
	
	@GetMapping("/gettodayrdv/{idutil}")
	public List<RendezVousDTO> getTodayRdv(@PathVariable("idutil") int idUtil){
		return rendezVousService.getTodaysRdv(idUtil);
	}
	
	@PostMapping("/searchrdv/{idutil}")
	public List<RendezVousDTO> searchRdv(@PathVariable("idutil") int idUtil, @RequestBody String search){
		return rendezVousService.searchRdv(search, idUtil);
	}
	
}
