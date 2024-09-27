package com.project.ExpenseTracker.controller;

import com.project.ExpenseTracker.dto.GraphDTO;
import com.project.ExpenseTracker.services.stats.StatsService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin("*")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService){
        this.statsService = statsService;
    }

    @GetMapping("/getChartData")
    public ResponseEntity<GraphDTO> getChartData(){
        try{
            return new ResponseEntity<>(statsService.getChartData(), HttpStatus.OK);
        }catch(EntityNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getStates")
    public ResponseEntity<?> getStats(){
        return new ResponseEntity<>(statsService.getStats(),HttpStatus.OK);
    }
}
