package com.project.ExpenseTracker.dto;

import com.project.ExpenseTracker.entity.Expense;
import com.project.ExpenseTracker.entity.Income;
import lombok.Data;

import java.util.List;

@Data
public class GraphDTO {
    private List<Expense> expenseList;
    private List<Income> incomeList;
}
