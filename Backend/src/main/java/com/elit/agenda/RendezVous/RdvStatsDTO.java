package com.elit.agenda.RendezVous;

public class RdvStatsDTO {
	
	private int create;
	private int participate;
	private int total;
	public int getCreate() {
		return create;
	}
	public void setCreate(int create) {
		this.create = create;
	}
	public int getParticipate() {
		return participate;
	}
	public void setParticipate(int participate) {
		this.participate = participate;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	@Override
	public String toString() {
		return "RdvStats [create=" + create + ", participate=" + participate + ", total=" + total + "]";
	}
	
	

}
