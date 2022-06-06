package com.elit.agenda.Utilisateur;

public class VerificationCodeDTO {
	
	private int Code;
	private boolean existe;
	public int getCode() {
		return Code;
	}
	public void setCode(int code) {
		Code = code;
	}
	public boolean isExiste() {
		return existe;
	}
	public void setExiste(boolean existe) {
		this.existe = existe;
	}
	@Override
	public String toString() {
		return "VerificationCodeDTO [Code=" + Code + ", existe=" + existe + "]";
	}
	
	

}
