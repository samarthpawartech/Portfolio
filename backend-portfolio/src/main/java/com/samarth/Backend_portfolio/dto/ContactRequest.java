package com.samarth.Backend_portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ContactRequest(

        @NotBlank(message = "Name is required")
        @Size(
                max = 100,
                message = "Name must not exceed 100 characters"
        )
        String name,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email address")
        @Size(
                max = 255,
                message = "Email must not exceed 255 characters"
        )
        String email,

        @NotBlank(message = "Country code is required")
        @Pattern(
                regexp = "^\\+[1-9][0-9]{0,3}$",
                message = "Invalid country code"
        )
        String countryCode,

        @NotBlank(message = "Phone number is required")
        @Pattern(
                regexp = "^[0-9]{6,15}$",
                message = "Invalid phone number"
        )
        String phoneNumber,

        @NotBlank(message = "Subject is required")
        @Size(
                max = 200,
                message = "Subject must not exceed 200 characters"
        )
        String subject,

        @NotBlank(message = "Message is required")
        @Size(
                min = 10,
                max = 5000,
                message = "Message must be between 10 and 5000 characters"
        )
        String message

) {
}