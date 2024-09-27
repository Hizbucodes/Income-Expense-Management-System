package com.project.ExpenseTracker.services.stats;

import com.project.ExpenseTracker.dto.GraphDTO;
import com.project.ExpenseTracker.dto.StatsDTO;
import com.project.ExpenseTracker.entity.Expense;
import com.project.ExpenseTracker.entity.Income;
import com.project.ExpenseTracker.repository.ExpenseRepository;
import com.project.ExpenseTracker.repository.IncomeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.OptionalDouble;

@Service
public class StatsServiceImpl implements StatsService{

    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;

    public StatsServiceImpl(IncomeRepository incomeRepository, ExpenseRepository expenseRepository){
        this.incomeRepository = incomeRepository;
        this.expenseRepository = expenseRepository;
    }

    public GraphDTO getChartData(){
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(27);

        GraphDTO graphDTO = new GraphDTO();
        graphDTO.setExpenseList(expenseRepository.findByDateBetween(startDate,endDate));
        graphDTO.setIncomeList(incomeRepository.findByDateBetween(startDate,endDate));

        return graphDTO;
    }


    public StatsDTO getStats(){
        Double totalIncome = incomeRepository.sumAllAmounts();
        Double totalExpense = expenseRepository.sumAllAmounts();

        Optional<Income> optionalIncome = incomeRepository.findFirstByOrderByDateDesc();
        Optional<Expense> optionalExpense = expenseRepository.findFirstByOrderByDateDesc();



        StatsDTO statsDTO = new StatsDTO();
        statsDTO.setExpense(totalExpense);
        statsDTO.setIncome(totalIncome);

        optionalIncome.ifPresent(statsDTO::setLatestIncome);
        optionalExpense.ifPresent(statsDTO::setLatestExpense);

        statsDTO.setBalance(Math.abs(totalIncome - totalExpense));

        List<Income> incomeList = incomeRepository.findAll();
        List<Expense> expenseList = expenseRepository.findAll();

        OptionalDouble minIncome = incomeList.stream()
                .mapToDouble(Income::getAmount).min();
        OptionalDouble maxIncome = incomeList.stream()
                .mapToDouble(Income::getAmount).max();

        OptionalDouble minExpense = expenseList.stream()
                .mapToDouble(Expense::getAmount).min();
        OptionalDouble maxExpense = expenseList.stream()
                .mapToDouble(Expense::getAmount).max();

        statsDTO.setMaxExpense(maxExpense.isPresent() ? maxExpense.getAsDouble() : null);
        statsDTO.setMinExpense(minExpense.isPresent() ? minExpense.getAsDouble() : null);


        statsDTO.setMaxIncome(maxIncome.isPresent() ? maxIncome.getAsDouble() : null);
        statsDTO.setMinIncome(minIncome.isPresent() ? minIncome.getAsDouble() : null);

        return statsDTO;
    }
}
