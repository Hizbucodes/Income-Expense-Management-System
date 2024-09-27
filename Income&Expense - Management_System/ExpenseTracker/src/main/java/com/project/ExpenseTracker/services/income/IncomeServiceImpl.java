package com.project.ExpenseTracker.services.income;

import com.project.ExpenseTracker.dto.IncomeDTO;
import com.project.ExpenseTracker.entity.Expense;
import com.project.ExpenseTracker.entity.Income;
import com.project.ExpenseTracker.repository.IncomeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class IncomeServiceImpl implements IncomeService {

    private final IncomeRepository incomeRepository;


    public IncomeServiceImpl(IncomeRepository incomeRepository){
        this.incomeRepository = incomeRepository;
    }

    public Income createIncome(IncomeDTO incomeDTO){
        try{
            return saveIncome(new Income(), incomeDTO);
        }catch(DataIntegrityViolationException e){
            throw new DataIntegrityViolationException(e.getMessage());
        }
    }

    private Income saveIncome(Income income, IncomeDTO incomeDTO){
        income.setTitle(incomeDTO.getTitle());
        income.setDescription(incomeDTO.getDescription());
        income.setCategory(incomeDTO.getCategory());
        income.setDate(incomeDTO.getDate());
        income.setAmount(incomeDTO.getAmount());

        return incomeRepository.save(income);
    }

    public List<IncomeDTO> getAllIncomes(){
       return incomeRepository.findAll().stream()
               .sorted(Comparator.comparing(Income::getDate).reversed())
               .map(Income::getIncomeDto)
               .collect(Collectors.toList());
    }

    public Income updateIncomeById(IncomeDTO incomeDTO, Long id){
        Optional<Income> incomeDb = incomeRepository.findById(id);

        if(incomeDb.isPresent()){
            Income income = incomeDb.get();
            if(Objects.nonNull(incomeDTO.getTitle()) && !"".equalsIgnoreCase(incomeDTO.getTitle())){
                income.setTitle(incomeDTO.getTitle());
            }

            if(Objects.nonNull(incomeDTO.getDescription()) && !"".equalsIgnoreCase(incomeDTO.getDescription())){
                income.setDescription(incomeDTO.getDescription());
            }

            if(Objects.nonNull(incomeDTO.getDate())){
                income.setDate(incomeDTO.getDate());
            }

            if(Objects.nonNull(incomeDTO.getAmount())){
                income.setAmount(incomeDTO.getAmount());
            }

            if(Objects.nonNull(incomeDTO.getCategory()) && !"".equalsIgnoreCase(incomeDTO.getCategory())){
                income.setCategory(incomeDTO.getCategory());
            }

            return incomeRepository.save(income);
        }else{
            throw new EntityNotFoundException("Income with ID " + id + " is not present");
        }
    }

    public IncomeDTO getIncomeById(Long id){

            Optional<Income> income = incomeRepository.findById(id);
            if(income.isPresent()){
                return income.get().getIncomeDto();
            }else{
                throw new EntityNotFoundException("Income with ID " + id + " is not present");
            }
    }


    public String deleteIncomeById(Long id){
        Optional<Income> income = incomeRepository.findById(id);

        if(income.isPresent()){
            incomeRepository.deleteById(id);
            return "Income with ID " + id + " is Deleted Successfully";
        }else{
            throw new EntityNotFoundException("Income with ID " + id + " is Not Present");
        }
    }

}
