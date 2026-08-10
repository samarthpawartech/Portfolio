package com.samarth.Backend_portfolio.service;

import com.samarth.Backend_portfolio.dto.ContactRequest;
import com.samarth.Backend_portfolio.dto.ContactResponse;
import com.samarth.Backend_portfolio.entity.Contact;
import com.samarth.Backend_portfolio.repository.ContactRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {

    private static final Logger log =
            LoggerFactory.getLogger(ContactService.class);

    private final ContactRepository contactRepository;
    private final EmailService emailService;

    public ContactService(
            ContactRepository contactRepository,
            EmailService emailService
    ) {
        this.contactRepository = contactRepository;
        this.emailService = emailService;
    }

    @Transactional
    public ContactResponse createContact(ContactRequest request) {

        if (request == null) {
            throw new IllegalArgumentException(
                    "Contact request cannot be null"
            );
        }

        String name = request.name() == null
                ? ""
                : request.name().trim();

        String email = request.email() == null
                ? ""
                : request.email().trim();

        String countryCode = request.countryCode() == null
                ? ""
                : request.countryCode().trim();

        String phoneNumber = request.phoneNumber() == null
                ? ""
                : request.phoneNumber()
                .replaceAll("\\D", "");

        String subject = request.subject() == null
                ? ""
                : request.subject().trim();

        String message = request.message() == null
                ? ""
                : request.message().trim();

        // ==============================
        // REQUIRED FIELD VALIDATION
        // ==============================

        if (name.isBlank()) {
            throw new IllegalArgumentException(
                    "Name is required"
            );
        }

        if (email.isBlank()) {
            throw new IllegalArgumentException(
                    "Email is required"
            );
        }

        if (countryCode.isBlank()) {
            throw new IllegalArgumentException(
                    "Country code is required"
            );
        }

        if (phoneNumber.isBlank()) {
            throw new IllegalArgumentException(
                    "Phone number is required"
            );
        }

        if (subject.isBlank()) {
            throw new IllegalArgumentException(
                    "Subject is required"
            );
        }

        if (message.isBlank()) {
            throw new IllegalArgumentException(
                    "Message is required"
            );
        }

        // ==============================
        // EMAIL VALIDATION
        // ==============================

        if (!email.matches(
                "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$"
        )) {
            throw new IllegalArgumentException(
                    "Invalid email address"
            );
        }

        // ==============================
        // COUNTRY CODE VALIDATION
        // ==============================

        if (!countryCode.matches(
                "^\\+[1-9][0-9]{0,3}$"
        )) {
            throw new IllegalArgumentException(
                    "Invalid country code"
            );
        }

        // ==============================
        // PHONE NUMBER VALIDATION
        // ==============================

        if (!phoneNumber.matches(
                "^[0-9]{6,15}$"
        )) {
            throw new IllegalArgumentException(
                    "Invalid phone number"
            );
        }

        // ==============================
        // CREATE FULL PHONE NUMBER
        // ==============================
        //
        // +91 + 9322007416
        //
        // = +919322007416
        // ==============================

        String normalizedPhone =
                countryCode + phoneNumber;

        // ==============================
        // DEBUG LOG
        // ==============================

        log.info(
                "CONTACT DEBUG -> countryCode={}, phoneNumber={}, normalizedPhone={}",
                countryCode,
                phoneNumber,
                normalizedPhone
        );

        // ==============================
        // CREATE ENTITY
        // ==============================

        Contact contact = new Contact();

        contact.setName(name);
        contact.setEmail(email);
        contact.setPhone(normalizedPhone);
        contact.setSubject(subject);
        contact.setMessage(message);

        // ==============================
        // SAVE DATABASE
        // ==============================

        Contact saved =
                contactRepository.save(contact);

        log.info(
                "New contact saved: id={}, email={}, phone={}, createdAt={}",
                saved.getId(),
                saved.getEmail(),
                saved.getPhone(),
                saved.getCreatedAt()
        );

        // ==============================
        // SEND EMAIL
        // ==============================

        try {

            emailService.sendContactNotification(saved);

            log.info(
                    "Contact notification email sent successfully: contactId={}",
                    saved.getId()
            );

        } catch (Exception ex) {

            log.error(
                    "Failed to send notification email for contact id={}",
                    saved.getId(),
                    ex
            );
        }

        // ==============================
        // RESPONSE
        // ==============================

        return new ContactResponse(
                saved.getId(),
                "Thanks! Your message has been received.",
                saved.getCreatedAt()
        );
    }
}