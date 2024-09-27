package com.project.ExpenseTracker.services.expense;

import com.project.ExpenseTracker.dto.ExpenseDTO;
import com.project.ExpenseTracker.entity.Expense;

import java.util.List;

public interface ExpenseService {
    Expense createExpense(ExpenseDTO expenseDTO);
    List<Expense> getAllExpenses();
    Expense getExpenseById(Long id);
    Expense updateExpenseById(ExpenseDTO expenseDTO, Long id);
    String deleteExpenseById(Long id);
}
