package com.elit.agenda.Notification;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.api.v2010.account.MessageCreator;
import com.twilio.type.PhoneNumber;
import org.springframework.stereotype.Service;
import com.twilio.Twilio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service("twilio")
public class TwilioSmsSender implements SmsSender {

    private static final Logger LOGGER = LoggerFactory.getLogger(TwilioSmsSender.class);


    @Override
    public void sendSms(String phoneNumber, String message) {
        if (isPhoneNumberValid(phoneNumber)) {
        	Twilio.init("ACe20dc8638a323e7b03ad3788619e40a2","06d05c3817fc035f502791ca4ca687ad");
            PhoneNumber to = new PhoneNumber(phoneNumber);
            PhoneNumber from = new PhoneNumber("+19107271160");
            MessageCreator creator = Message.creator(to, from, message);
            creator.create();
            LOGGER.info("Send sms {}", phoneNumber,message);
        } else {
            throw new IllegalArgumentException(
                    "Phone number [" + phoneNumber + "] is not a valid number"
            );
        }

    }

    private boolean isPhoneNumberValid(String phoneNumber) {
        // TODO: Implement phone number validator
        return true;
    }
}