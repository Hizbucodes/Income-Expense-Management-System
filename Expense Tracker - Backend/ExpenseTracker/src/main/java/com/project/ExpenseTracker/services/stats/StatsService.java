package com.project.ExpenseTracker.services.stats;

import com.project.ExpenseTracker.dto.GraphDTO;
import com.project.ExpenseTracker.dto.StatsDTO;

public interface StatsService {
    GraphDTO getChartData();
    StatsDTO getStats();
}
