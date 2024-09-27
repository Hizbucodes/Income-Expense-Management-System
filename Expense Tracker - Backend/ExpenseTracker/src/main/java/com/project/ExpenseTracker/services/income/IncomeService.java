package com.project.ExpenseTracker.services.income;

import com.project.ExpenseTracker.dto.IncomeDTO;
import com.project.ExpenseTracker.entity.Income;

import java.util.List;

public interface IncomeService {
    Income createIncome(IncomeDTO incomeDTO);
    List<IncomeDTO> getAllIncomes();
    Income updateIncomeById(IncomeDTO incomeDTO, Long id);
    IncomeDTO getIncomeById(Long id);
    String deleteIncomeById(Long id);
}
