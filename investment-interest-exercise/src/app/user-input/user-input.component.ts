import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { InvestmentData } from '../investment-input.model';
import { signal } from '@angular/core';

import { InvestmentService } from '../investment.services';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  constructor(public investmentService: InvestmentService) {}

  calculate = output<InvestmentData>();
  initialInvestment = signal('0');
  annualInvestment = signal('0');
  expectedReturn = signal('7');
  duration = signal('10');
  
  onSubmit() {
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.initialInvestment(),
      annualInvestment: +this.annualInvestment(),
      expectedReturn: +this.expectedReturn(),
      duration: +this.duration(),
    });

    this.initialInvestment.set('0');
    this.annualInvestment.set('0');
    this.expectedReturn.set('7');
    this.duration.set('10');
  }
}
