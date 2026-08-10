package com.samarth.Backend_portfolio.controller;

import com.samarth.Backend_portfolio.dto.ContactRequest;
import com.samarth.Backend_portfolio.dto.ContactResponse;
import com.samarth.Backend_portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ContactResponse> createContact(
            @Valid @RequestBody ContactRequest request
    ) {

        ContactResponse response =
                contactService.createContact(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}