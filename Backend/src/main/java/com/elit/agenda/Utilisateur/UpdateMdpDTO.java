package com.elit.agenda.Utilisateur;

public class UpdateMdpDTO {
	private String oldMdp;
	private String newMdp;
	private String confirMdp;
	public String getOldMdp() {
		return oldMdp;
	}
	public void setOldMdp(String oldMdp) {
		this.oldMdp = oldMdp;
	}
	public String getNewMdp() {
		return newMdp;
	}
	public void setNewMdp(String newMdp) {
		this.newMdp = newMdp;
	}
	public String getConfirMdp() {
		return confirMdp;
	}
	public void setConfirMdp(String confirMdp) {
		this.confirMdp = confirMdp;
	}
	@Override
	public String toString() {
		return "UpdateMdpDTO [oldMdp=" + oldMdp + ", newMdp=" + newMdp + ", confirMdp=" + confirMdp + "]";
	}
	
	

}
