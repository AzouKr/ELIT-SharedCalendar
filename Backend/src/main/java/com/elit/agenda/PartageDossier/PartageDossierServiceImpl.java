package com.elit.agenda.PartageDossier;

import java.lang.reflect.Type;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;


@Service
public class PartageDossierServiceImpl implements PartageDossierService {
	
	private PartageDossierRepo partageDossierRepo;

	public PartageDossierServiceImpl(PartageDossierRepo partageDossierRepo) {
		super();
		this.partageDossierRepo = partageDossierRepo;
	}

	@Override
	public List<PartageDossierDTO> addPartageDossier(List<PartageDossier> partageDossier) {

		ModelMapper modelMapper = new ModelMapper();
		List<PartageDossier> newDossPart = partageDossierRepo.saveAll(partageDossier);
		Type listType = new TypeToken<List<PartageDossierDTO>>(){}.getType();
		List<PartageDossierDTO> partageDossierDTO = modelMapper.map(newDossPart, listType);
		
		return partageDossierDTO;
	}

	@Override
	public List<PartageUserDTO> getPartageDossier(int idUtil) {
		ModelMapper modelMapper = new ModelMapper();
		List<PartageDossier> DossPart = partageDossierRepo.getPartageDossier(idUtil);
		Type listType = new TypeToken<List<PartageUserDTO>>(){}.getType();
		List<PartageUserDTO> partageDossierDTO = modelMapper.map(DossPart, listType);
		return partageDossierDTO;
	}

	@Override
	public void deleteAllPartageDossier(int idDossier) {
		partageDossierRepo.deleteAllPart(idDossier);
		
	}

	@Override
	public void updatePartageDoss(List<PartageDossier> PartageDossier, int idDossier) {
		partageDossierRepo.deleteAllPart(idDossier);
		partageDossierRepo.saveAll(PartageDossier);
	}
	
	

}
