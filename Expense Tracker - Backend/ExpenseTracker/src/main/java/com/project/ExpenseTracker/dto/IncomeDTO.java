package com.project.ExpenseTracker.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class IncomeDTO {

    private Long id;
    private String title;
    private String description;
    private LocalDate date;
    private String category;
    private Double amount;
}
