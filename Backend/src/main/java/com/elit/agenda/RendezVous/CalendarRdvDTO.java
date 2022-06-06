package com.elit.agenda.RendezVous;

import java.util.Date;

public class CalendarRdvDTO {
	
	private int id;
	private String title;
	private Date start;
	private Date end;
	private String color;
	public int getid() {
		return id;
	}
	public void setid(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public Date getStart() {
		return start;
	}
	public void setStart(Date start) {
		this.start = start;
	}
	public Date getEnd() {
		return end;
	}
	public void setEnd(Date end) {
		this.end = end;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	@Override
	public String toString() {
		return "CalendarRdvDTO [id=" + id + ", title=" + title + ", start=" + start + ", end=" + end + ", color="
				+ color + "]";
	}
	
	
	

}
