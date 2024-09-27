package com.project.ExpenseTracker.controller;

import com.project.ExpenseTracker.dto.IncomeDTO;
import com.project.ExpenseTracker.entity.Income;
import com.project.ExpenseTracker.services.income.IncomeService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/income")
@CrossOrigin("*")
public class IncomeController {

    private IncomeService incomeService;

    public IncomeController(IncomeService incomeService){
        this.incomeService = incomeService;
    }
    @PostMapping("/createIncome")
    public ResponseEntity<?> createIncome(@RequestBody IncomeDTO incomeDTO){
        try{
            Income income = incomeService.createIncome(incomeDTO);
            return new ResponseEntity<>(income, HttpStatus.CREATED);
        }catch(DataIntegrityViolationException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/getAllIncomes")
    public ResponseEntity<List<IncomeDTO>> getAllIncomes(){
        try{
            return new ResponseEntity<>(incomeService.getAllIncomes(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateIncomeById/{id}")
    public ResponseEntity<?> updateIncomeById(@RequestBody IncomeDTO incomeDTO,@PathVariable("id") Long id){
        try{
            return new ResponseEntity<>(incomeService.updateIncomeById(incomeDTO, id), HttpStatus.OK);
        }catch(EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getIncomeById/{id}")
    public ResponseEntity<?> getIncomeById(@PathVariable("id") Long id){
        try{
            return new ResponseEntity<>(incomeService.getIncomeById(id),HttpStatus.OK);
        }catch(EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteIncomeById/{id}")
    public ResponseEntity<String> deleteIncomeById(@PathVariable("id") Long id){
        try {
            return new ResponseEntity<>(incomeService.deleteIncomeById(id), HttpStatus.OK);
        }catch(EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
