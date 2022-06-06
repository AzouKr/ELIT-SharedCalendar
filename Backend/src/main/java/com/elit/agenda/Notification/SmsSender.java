package com.elit.agenda.Notification;

public interface SmsSender {

    void sendSms(String phoneNumber, String message);
}
