package com.samarth.Backend_portfolio.service;

import com.samarth.Backend_portfolio.entity.Contact;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    private static final ZoneId INDIA_ZONE =
            ZoneId.of("Asia/Kolkata");

    private static final DateTimeFormatter DATE_TIME_FORMATTER =
            DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss a");

    private final JavaMailSender mailSender;
    private final String receiverEmail;
    private final String fromAddress;

    public EmailService(
            JavaMailSender mailSender,
            @Value("${contact.receiver-email:}") String receiverEmail,
            @Value("${spring.mail.username:}") String fromAddress
    ) {
        this.mailSender = mailSender;
        this.receiverEmail = receiverEmail;
        this.fromAddress = fromAddress;
    }

    public void sendContactNotification(Contact contact) {

        if (contact == null) {
            throw new IllegalArgumentException("Contact cannot be null");
        }

        if (receiverEmail == null || receiverEmail.isBlank()) {
            throw new IllegalStateException(
                    "CONTACT_RECEIVER_EMAIL is not configured"
            );
        }

        if (fromAddress == null || fromAddress.isBlank()) {
            throw new IllegalStateException(
                    "MAIL_USERNAME is not configured"
            );
        }

        String phone = formatPhone(contact.getPhone());
        String receivedTime = formatIndianTime(contact.getCreatedAt());

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setFrom(fromAddress);
        mail.setTo(receiverEmail);

        if (contact.getEmail() != null
                && !contact.getEmail().isBlank()) {

            mail.setReplyTo(contact.getEmail().trim());
        }

        String subject = safeValue(
                contact.getSubject(),
                "New Portfolio Contact"
        );

        mail.setSubject("Portfolio Contact: " + subject);

        String body = """
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
                safeValue(contact.getName(), "Not provided"),
                safeValue(contact.getEmail(), "Not provided"),
                phone,
                subject,
                safeValue(contact.getMessage(), "Not provided"),
                receivedTime
        );

        mail.setText(body);

        mailSender.send(mail);
    }

    private String formatPhone(String phone) {

        if (phone == null || phone.isBlank()) {
            return "Not provided";
        }

        String cleanedPhone = phone.trim();

        // +919322007416
        if (cleanedPhone.matches("^\\+91[0-9]{10}$")) {
            return "+91 " + cleanedPhone.substring(3);
        }

        // If backend receives only digits
        // 9322007416
        if (cleanedPhone.matches("^[0-9]{10}$")) {
            return "+91 " + cleanedPhone;
        }

        return cleanedPhone;
    }

    private String formatIndianTime(Instant timestamp) {

        if (timestamp == null) {
            return "Not available";
        }

        ZonedDateTime indianTime =
                timestamp.atZone(INDIA_ZONE);

        return indianTime.format(DATE_TIME_FORMATTER);
    }

    private String safeValue(String value, String fallback) {

        if (value == null || value.isBlank()) {
            return fallback;
        }

        return value.trim();
    }
}