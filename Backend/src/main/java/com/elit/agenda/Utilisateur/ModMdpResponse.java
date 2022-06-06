package com.elit.agenda.Utilisateur;

public class ModMdpResponse {
	private boolean valid;
	private String msg;
	public boolean isValid() {
		return valid;
	}
	public void setValid(boolean valid) {
		this.valid = valid;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	@Override
	public String toString() {
		return "ModMdpResponse [valid=" + valid + ", msg=" + msg + "]";
	}
	
	

}
