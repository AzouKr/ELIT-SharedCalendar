package com.elit.agenda.Utilisateur;

import org.springframework.security.core.GrantedAuthority;

public class Authority implements GrantedAuthority {
	
	private String roleCode;
	private String roleDescription;

	@Override
	public String getAuthority() {
		
		return roleCode;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getRoleDescription() {
		return roleDescription;
	}

	public void setRoleDescription(String roleDescription) {
		this.roleDescription = roleDescription;
	}

	private Authority createAuthority(String roleCode,String roleDescription) {
		Authority authority=new Authority();
		authority.setRoleCode(roleCode);
		authority.setRoleDescription(roleDescription);
		return authority;
	}
	
}
