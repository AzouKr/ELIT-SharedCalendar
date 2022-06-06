package com.elit.agenda.Dossier;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.elit.agenda.PartageDossier.PartageDossier;
import com.elit.agenda.PartageDossier.PartageDossierRepo;
import com.elit.agenda.PartageDossier.PartageDossierService;
import com.elit.agenda.RendezVous.RendezVousService;


@Service
public class DossierServiceImpl implements DossierService {
	
	private DossierRepo dossierRepo;
	private PartageDossierRepo partageDossierRepo;
	@Autowired
	PartageDossierService partageDossierService;
	@Autowired
	RendezVousService rendezVousService;

	

	public DossierServiceImpl(DossierRepo dossierRepo, PartageDossierRepo partageDossierRepo) {
		super();
		this.dossierRepo = dossierRepo;
		this.partageDossierRepo = partageDossierRepo;
	}

	@Override
	public List<DossierDTO> getPublicDossier() {
		ModelMapper modelMapper = new ModelMapper();
		List<Dossier> listDoss = dossierRepo.getPublicDossier();	
		Type listType = new TypeToken<List<DossierDTO>>(){}.getType();
		List<DossierDTO> rendezVousDTO = modelMapper.map(listDoss, listType);
		return rendezVousDTO;
	}

	@Override
	public List<DossierDTO> getPrivateDossier(int idUtil) {
		ModelMapper modelMapper = new ModelMapper();
		List<Dossier> listDossowner = dossierRepo.getPrivateDossier(idUtil);	
		List<Dossier> Default = dossierRepo.getDefaultDossier(idUtil); 
		List<Dossier> listDoss = new ArrayList<>();
		listDoss.addAll(Default); listDoss.addAll(listDossowner);
		Type listType = new TypeToken<List<DossierDTO>>(){}.getType();
		List<DossierDTO> listDossDTO = modelMapper.map(listDoss, listType);
		return listDossDTO;
	}

	@Override
	public List<DossierDTO> getSharedDossier(int idUtil) {
		ModelMapper modelMapper = new ModelMapper();
		List<Dossier> listDosspartage = dossierRepo.getDossierPartage(idUtil);
		List<Dossier> listDosspartageOwn = dossierRepo.getDossierPartageOwn(idUtil);
		List<Dossier> combinedList = new ArrayList<>();
		combinedList.addAll(listDosspartageOwn);combinedList.addAll(listDosspartage);
		Type listType = new TypeToken<List<DossierDTO>>(){}.getType();
		List<DossierDTO> listDossDTO = modelMapper.map(combinedList, listType);
		return listDossDTO;
	}

	@Override
	public DossierDTO addDossier(Dossier dossier) {
		ModelMapper modelMapper = new ModelMapper();
		Dossier newDoss = dossierRepo.save(dossier);
		List<PartageDossier> ListPart = dossier.getPartageDossiers();
		if(!(ListPart.isEmpty())) {
			for (PartageDossier p: ListPart) {
				p.getDossier().setIdDossier(newDoss.getIdDossier());
			}
			partageDossierService.addPartageDossier(ListPart);
		}
		
		DossierDTO dossierDTO = modelMapper.map(newDoss, DossierDTO.class);
		return dossierDTO;
	}

	@Override
	public DossierDTO updateDossier(Dossier dossier, int idDoss) {
		
		Dossier existingDossier = dossierRepo.findById(idDoss).orElseThrow();
		
		existingDossier.setTitre(dossier.getTitre());
		existingDossier.setId_doss_creator(dossier.getId_doss_creator());
		existingDossier.setType(dossier.getType());
		
		Dossier newDoss = dossierRepo.save(existingDossier);
		
		List<PartageDossier> ListPart = dossier.getPartageDossiers();
		if(!(ListPart.isEmpty()) || ListPart != null) {
			for (PartageDossier p: ListPart) {
				p.getDossier().setIdDossier(newDoss.getIdDossier());
			}
			partageDossierService.updatePartageDoss(ListPart, idDoss);;
		}else {
			partageDossierService.deleteAllPartageDossier(idDoss);
		}
		
		ModelMapper modelMapper = new ModelMapper();
		DossierDTO dossierDTO = modelMapper.map(existingDossier, DossierDTO.class);
		return dossierDTO;
	}

	@Override
	public boolean deleteDossier(int idDoss) {
		Dossier existingDossier = dossierRepo.findById(idDoss).orElseThrow();
		partageDossierService.deleteAllPartageDossier(idDoss);
		rendezVousService.deleteAllRdvDoss(idDoss);
		dossierRepo.delete(existingDossier);
		return true;
	}

	@Override
	public List<DossierDTO> getAllUserDossier(int idUtil) {
		ModelMapper modelMapper = new ModelMapper();
		List<Dossier> listDosspublic = dossierRepo.getPublicDossier();
		List<Dossier> listDosspartage = dossierRepo.getDossierPartage(idUtil);
		List<Dossier> listDosspartageOwn = dossierRepo.getDossierPartageOwn(idUtil);
		List<Dossier> listDossPrivate = dossierRepo.getPrivateDossier(idUtil);
		List<Dossier> listDossDefault = dossierRepo.getDefaultDossier(idUtil);
		List<Dossier> listDoss = new ArrayList<>();
		Type listType = new TypeToken<List<DossierDTO>>(){}.getType();
		listDoss.addAll(listDossDefault);listDoss.addAll(listDossPrivate);
		listDoss.addAll(listDosspartageOwn);listDoss.addAll(listDosspartage);
		listDoss.addAll(listDosspublic);
		Set<Dossier> set = new LinkedHashSet<>(listDoss);
		List<Dossier> combinedList = new ArrayList<>(set);
		List<DossierDTO> listDossDTO = modelMapper.map(combinedList, listType);
		return listDossDTO;
	}
	
	

}
