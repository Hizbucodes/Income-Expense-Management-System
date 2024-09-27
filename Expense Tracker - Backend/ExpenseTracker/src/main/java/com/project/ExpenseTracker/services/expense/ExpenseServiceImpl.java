package com.project.ExpenseTracker.services.expense;

import com.project.ExpenseTracker.dto.ExpenseDTO;
import com.project.ExpenseTracker.entity.Expense;
import com.project.ExpenseTracker.repository.ExpenseRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository){
        this.expenseRepository = expenseRepository;
    }

    public Expense createExpense(ExpenseDTO expenseDTO){
        return saveExpense(new Expense(), expenseDTO);
    }

    private Expense saveExpense(Expense expense, ExpenseDTO expenseDTO){
        expense.setTitle(expenseDTO.getTitle());
        expense.setDescription(expenseDTO.getDescription());
        expense.setCategory(expenseDTO.getCategory());
        expense.setDate(expenseDTO.getDate());
        expense.setAmount(expenseDTO.getAmount());

        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses(){
        return expenseRepository.findAll().stream()
                .sorted(Comparator.comparing(Expense::getDate)
                        .reversed()).collect(Collectors.toList());
    }

    public Expense getExpenseById(Long id){
        Optional<Expense> expense = expenseRepository.findById(id);
        if(expense.isPresent()){
            return expense.get();
        }else{
            throw new EntityNotFoundException("Expense not found with this id: " + id);
        }
    }

    public Expense updateExpenseById(ExpenseDTO expenseDTO, Long id){
        Optional<Expense> expenseDb = expenseRepository.findById(id);

            if(expenseDb.isPresent()){
                Expense expense = expenseDb.get();
                if (Objects.nonNull(expenseDTO.getTitle()) && !"".equalsIgnoreCase(expenseDTO.getTitle())){
                    expense.setTitle(expenseDTO.getTitle());
                }
                if(Objects.nonNull(expenseDTO.getDescription()) && !"".equalsIgnoreCase(expenseDTO.getDescription())){
                    expense.setDescription(expenseDTO.getDescription());
                }

                if(Objects.nonNull(expenseDTO.getAmount())){
                    expense.setAmount(expenseDTO.getAmount());
                }

                if(Objects.nonNull(expenseDTO.getCategory()) && !"".equalsIgnoreCase(expenseDTO.getCategory())){
                    expense.setCategory(expenseDTO.getCategory());
                }

                if(Objects.nonNull(expenseDTO.getDate())){
                    expense.setDate(expenseDTO.getDate());
                }
                return expenseRepository.save(expense);
            }else {
                throw new EntityNotFoundException("Expense not found with this id: " + id);
            }
    }


    public String deleteExpenseById(Long id){
        Optional<Expense> expense = expenseRepository.findById(id);

        if(expense.isPresent()){
            expenseRepository.deleteById(id);
            return "Expense with ID " + id + " is Deleted Successfully";
        }else{
            throw new EntityNotFoundException("No Expense with ID " + id + " is present");
        }
    }
}
