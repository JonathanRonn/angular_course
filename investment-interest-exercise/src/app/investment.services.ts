import { Injectable, signal } from "@angular/core";
import type { InvestmentData, InvestmentResults } from "./investment-input.model";

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
    results = signal<InvestmentResults[]>([]);

    calculateInvestmentResults(data:InvestmentData) {
    
        const {initialInvestment, annualInvestment, expectedReturn, duration} = data;
        const results: InvestmentResults[] = [];
        let investmentValue = initialInvestment;
      
        for (let i = 0; i < duration; i++) {
          const year = i + 1;
          const interestEarnedInYear = investmentValue * (expectedReturn / 100);
          investmentValue += interestEarnedInYear + annualInvestment;
          const totalInterest =
            investmentValue - annualInvestment * year - initialInvestment;
          results.push({
            year: year,
            interest: interestEarnedInYear,
            valueEndOfYear: investmentValue,
            annualInvestment: annualInvestment,
            totalInterest: totalInterest,
            totalAmountInvested: initialInvestment + annualInvestment * year,
          });
        }
    
        this.results.set(results);
    }
}