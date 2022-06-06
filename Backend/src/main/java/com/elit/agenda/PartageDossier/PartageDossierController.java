package com.elit.agenda.PartageDossier;


import java.lang.reflect.Type;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
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

import com.elit.agenda.RendezVous.RendezVousDTO;




@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/partagedossier")
public class PartageDossierController {
	
	private PartageDossierService partageDossierService;
	@Autowired
	private PartageDossierRepo partageDossierRepo;

	public PartageDossierController(PartageDossierService partageDossierService) {
		super();
		this.partageDossierService = partageDossierService;
	}
	
	@PostMapping("/add")
	public List<PartageDossierDTO> addParticipant(@RequestBody List<PartageDossier> partageDossier){
		return partageDossierService.addPartageDossier(partageDossier);
	}
	
	@GetMapping("/{idDossier}")
	public List<PartageUserDTO> getPartageDossier(@PathVariable("idDossier") int idDoss){
		ModelMapper modelMapper = new ModelMapper();
		List<PartageDossier> partd = partageDossierRepo.getPartageDossierbydoss(idDoss);
		Type listType = new TypeToken<List<PartageUserDTO>>(){}.getType();
		List<PartageUserDTO> partagedossierDTO = modelMapper.map(partd, listType);
		return partagedossierDTO;
	}

}
