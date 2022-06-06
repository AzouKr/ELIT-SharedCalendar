package com.elit.agenda.Utilisateur;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/utilisateur")
public class UtilisateurController {
	

	private UtilisateurService utilisateurService;
	
	public UtilisateurController(UtilisateurService utilisateurService) {
		super();
		this.utilisateurService = utilisateurService;
	}
	
	
	// build get all Utilisateurs REST API
		@GetMapping("/getall/{idUtil}")
		public List<UtilisateurDTO> getAllUtilisateur(@PathVariable("idUtil") int idUtil){
			return utilisateurService.getAllUtilisateur(idUtil);
		}
		
		@PostMapping("/getall/{idUtil}")
		public List<UtilisateurDTO> getAllAvailable(@PathVariable("idUtil") int idUtil ,@RequestBody DateDTO datee){
			return utilisateurService.getUtilRdv(idUtil,datee);
		}
		
		
	// build get Utilisateur by id REST API
	// http://localhost:8080/api/utilisateur/1
	@GetMapping("{IdUtil}")
	public UtilisateurDTO getUtilisateurById(@PathVariable("IdUtil") int IdUtil){
		return utilisateurService.getUtilisateurById(IdUtil);
	}
	
	@PostMapping("/getuserbyemail")
	public UtilisateurDTO UtilisatlitByEmail(@RequestBody EmailDTO email){		
		return utilisateurService.findByEmail(email);
	}
	
	// build update Utilisateur REST API
		// http://localhost:8080/api/utilisateur/1
		@PostMapping("{id}")
		public UtilisateurDTO updateUtilisateur(@PathVariable("id") int IdUtil ,@RequestBody Utilisateur utilisateur){
			return utilisateurService.updateUtilisateur(utilisateur, IdUtil);
		}
		
		@GetMapping("/profilepic/{IdUtil}")
		public List<UsersProfilePicDTO> getUsersProfilePic(@PathVariable("IdUtil") int IdUtil){
			return utilisateurService.getUsersProfilePic(IdUtil);
		}
		
		@PostMapping("/verificationcode")
		public VerificationCodeDTO VerificationCode(@RequestBody EmailDTO email){		
			return utilisateurService.verificationCode(email);
		}
		
		@PostMapping("/updatemdp/{idUtil}")
		public ModMdpResponse updateMdp(@PathVariable("idUtil") int IdUtil ,@RequestBody UpdateMdpDTO mdp){		
			return utilisateurService.updateMdp(IdUtil, mdp);
		}
		
		@GetMapping("/findemail/{email}")
		public boolean findEmail(@PathVariable("email") String email){		
			return utilisateurService.findEmail(email);
		}
		
		@PostMapping("/setnewpass/{email}")
		public ModMdpResponse updateMdp(@PathVariable("email") String email,@RequestBody MdpOublie mdp){		
			return utilisateurService.setNewMdp(email,mdp);
		}
}
