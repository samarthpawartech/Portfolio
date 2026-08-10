package com.samarth.Backend_portfolio.dto;

import java.time.LocalDateTime;

public record ContactResponse(
        Long id,
        String message,
        LocalDateTime createdAt
) {
}