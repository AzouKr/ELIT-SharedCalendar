package com.elit.agenda.Utilisateur;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
@Service
public class CostumeUserService implements UserDetailsService {
	
	@Autowired
	private UtilisateurRepository utilisateurRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Utilisateur utilisateur =utilisateurRepository.findByUsername(username);
		User user = new User();
		user.setUsername(utilisateur.getEmail());
		user.setPassword(utilisateur.getMdps());
		
		if(null==user) {
			throw new UsernameNotFoundException("User Not Found with userName "+username);
		}
		return user;
	}

}
