package com.project.ExpenseTracker.entity;

import com.project.ExpenseTracker.dto.IncomeDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Income {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private LocalDate date;
    private String category;
    private Double amount;

    public IncomeDTO getIncomeDto(){
        IncomeDTO incomeDTO = new IncomeDTO();
        incomeDTO.setId(id);
        incomeDTO.setTitle(title);
        incomeDTO.setDescription(description);
        incomeDTO.setDate(date);
        incomeDTO.setCategory(category);
        incomeDTO.setAmount(amount);

        return incomeDTO;
    }
}
