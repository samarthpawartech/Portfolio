package com.samarth.Backend_portfolio.service;

import com.samarth.Backend_portfolio.entity.Contact;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final String receiverEmail;
    private final String fromAddress;

    private static final DateTimeFormatter DATE_TIME_FORMATTER =
            DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss a");

    public EmailService(
            JavaMailSender mailSender,
            @Value("${contact.receiver-email}") String receiverEmail,
            @Value("${spring.mail.username}") String fromAddress
    ) {
        this.mailSender = mailSender;
        this.receiverEmail = receiverEmail;
        this.fromAddress = fromAddress;
    }

    public void sendContactNotification(Contact contact) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setFrom(fromAddress);

        mail.setTo(receiverEmail);

        mail.setReplyTo(contact.getEmail());

        mail.setSubject(
                "Portfolio Contact: " + contact.getSubject()
        );

        String displayPhone = formatPhone(contact.getPhone());

        String receivedTime = formatIndianTime(
                contact.getCreatedAt()
        );

        mail.setText(
                """
                ========================================
                New Portfolio Contact Message
                ========================================

                Name: %s
                Email: %s
                Phone: %s
                Subject: %s

                Message:
                %s

                Received: %s IST

                ========================================
                This message was submitted through your
                portfolio contact form.
                ========================================
                """.formatted(
                        contact.getName(),
                        contact.getEmail(),
                        displayPhone,
                        contact.getSubject(),
                        contact.getMessage(),
                        receivedTime
                )
        );

        mailSender.send(mail);
    }

    /**
     * Formats the phone number for email display.
     *
     * Database:
     * +919322007416
     *
     * Email:
     * +91 9322007416
     */
    private String formatPhone(String phone) {

        if (phone == null || phone.isBlank()) {
            return "Not provided";
        }

        String cleanedPhone = phone.trim();

        // India
        if (cleanedPhone.matches("^\\+91[0-9]{10}$")) {
            return "+91 " + cleanedPhone.substring(3);
        }

        // Other countries:
        // Keep the E.164 number as stored.
        return cleanedPhone;
    }

    /**
     * Formats LocalDateTime for Indian email display.
     *
     * Example:
     * 09-08-2026 10:30:25 PM
     */
    private String formatIndianTime(LocalDateTime dateTime) {

        if (dateTime == null) {
            return "Not available";
        }

        return dateTime.format(DATE_TIME_FORMATTER);
    }
}