package com.samarth.Backend_portfolio.repository;

import com.samarth.Backend_portfolio.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository
        extends JpaRepository<Contact, Long> {
}