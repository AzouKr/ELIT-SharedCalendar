package com.elit.agenda.Dossier;



import java.util.List;

import org.modelmapper.ModelMapper;
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

import com.elit.agenda.RendezVous.CalendarRdvDTO;
import com.elit.agenda.RendezVous.RendezVous;
import com.elit.agenda.RendezVous.RendezVousDTO;
import com.elit.agenda.RendezVous.RendezVousService;


@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/dossier")
public class DossierController {
	
	private DossierService dossierService;
	private RendezVousService rendezVousService;
	@Autowired
	private DossierRepo dossierRepo;
	public DossierController(DossierService dossierService, RendezVousService rendezVousService) {
		super();
		this.dossierService = dossierService;
		this.rendezVousService = rendezVousService;
	}
	
	
	@GetMapping("/getrdv/{idDossier}/{idUtil}")
	public List<CalendarRdvDTO> getAllRdvInDoss(@PathVariable("idDossier") int idDossier, @PathVariable("idUtil") int idUtil){
		List<CalendarRdvDTO> rendezVousDTO = rendezVousService.getAllRdv(idDossier,idUtil); 
		return rendezVousDTO;
	}
	
	@GetMapping("/getpublic")
	public List<DossierDTO> getPublicDoss(){
		return dossierService.getPublicDossier();
	}
	

	@GetMapping("/getprivate/{idUtil}")
	public List<DossierDTO> getPrivateDoss(@PathVariable("idUtil") int idUtil){
		return dossierService.getPrivateDossier(idUtil);
	}
	
	@GetMapping("/getshared/{idUtil}")
	public List<DossierDTO> getSharedDossier(@PathVariable("idUtil") int idUtil){
		return dossierService.getSharedDossier(idUtil);
	}
	
	@GetMapping("/alluserdoss/{idUtil}")
	public List<DossierDTO> getUserDossier(@PathVariable("idUtil") int idUtil){
		return dossierService.getAllUserDossier(idUtil);
	}
	
	@PostMapping("/add")
	public DossierDTO addDossier(@RequestBody Dossier dossier){
		return dossierService.addDossier(dossier);
	}
	
	@PostMapping("/update/{idDoss}")
	public DossierDTO updateDossier(@PathVariable("idDoss") int idDoss, @RequestBody Dossier dossier){
		return dossierService.updateDossier(dossier, idDoss);
	}
	
	
	@GetMapping("/delete/{idDoss}")
	public boolean deleteDossier(@PathVariable("idDoss") int idDoss){
		return dossierService.deleteDossier(idDoss);
	}
	
	@GetMapping("/getdossier/{idDoss}")
	public DossierDTO getDossier(@PathVariable("idDoss") int idDoss){
		ModelMapper modelMapper = new ModelMapper();
		Dossier dosse = dossierRepo.findById(idDoss).orElseThrow();
		DossierDTO dossierDTO = modelMapper.map(dosse, DossierDTO.class);
		return dossierDTO;
	}
}
