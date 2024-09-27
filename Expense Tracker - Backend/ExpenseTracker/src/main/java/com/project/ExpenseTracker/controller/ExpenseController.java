package com.project.ExpenseTracker.controller;

import com.project.ExpenseTracker.dto.ExpenseDTO;
import com.project.ExpenseTracker.entity.Expense;
import com.project.ExpenseTracker.services.expense.ExpenseService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expense")
@CrossOrigin("*")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService){
        this.expenseService = expenseService;
    };


    @PostMapping("/createExpense")
    public ResponseEntity<?> createExpense(@RequestBody ExpenseDTO expenseDTO){
        Expense expense = expenseService.createExpense(expenseDTO);
        try{
            return new ResponseEntity<>(expense, HttpStatus.CREATED);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/getAllExpenses")
    public ResponseEntity<List<Expense>> getAllExpenses(){
        try{
            return new ResponseEntity<>(expenseService.getAllExpenses(),HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    };

    @GetMapping("/getExpenseById/{id}")
    public ResponseEntity<?> getExpenseById(@PathVariable("id") Long id){
        try{
            return new ResponseEntity<>(expenseService.getExpenseById(id), HttpStatus.OK);
        }catch(EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    };

    @PutMapping("/updateExpenseById/{id}")
    public ResponseEntity<?> updateExpenseById(@RequestBody ExpenseDTO expenseDTO,@PathVariable("id") Long id){
        try{
            return new ResponseEntity<>(expenseService.updateExpenseById(expenseDTO,id),HttpStatus.OK);
        }catch(EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    };

    @DeleteMapping("/deleteExpenseById/{id}")
    public ResponseEntity<String> deleteExpenseById(@PathVariable("id") Long id){
        try {
            return new ResponseEntity<>(expenseService.deleteExpenseById(id),HttpStatus.OK);
        }catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
