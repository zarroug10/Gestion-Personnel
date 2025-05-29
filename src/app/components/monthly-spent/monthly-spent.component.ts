import { Component, inject } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { NgStyle } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherPlus } from '@ng-icons/feather-icons';
import { FormsModule, NgForm } from '@angular/forms';
import { monthlySpent } from '../../models/mothlySpent';
import { MonthService } from '../../services/monthly.service';


@Component({
  selector: 'app-monthly-spent',
  imports: [
    CurrencyPipe,
    NgStyle,
    NgIcon,
    FormsModule,
    NgFor
  ],
  providers: [
    provideIcons({
       featherPlus,
    }),
  ],
  templateUrl: './monthly-spent.component.html',
})
export class MonthlySpentComponent {

  public monthlySpent : monthlySpent[] = [];
  public monthlyService = inject(MonthService);

  
  public isCheckModalOpen = false;
  public selectedMonth: string = '';
  public year: number | null = null;
  public spent: number | null = null;

  public monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  ngOnInit() {
    this.getMonthlySpent();
  }

  public getMonthlySpent(){
     this.monthlyService.getMonthsSpents().subscribe({
      next: data => {
        this.monthlySpent = data; // Fix: Assign data TO vacationRequests
      },
      error: err => {
        console.error('Error fetching vacation requests:', err);
      }
    });
  }

  public addMonthlySpent(form: NgForm) {
    const { month, year, spent } = form.value;
      // this.monthlySpent.push({ month, year, totalAmount });
      console.log(this.monthlySpent);
      this.isCheckModalOpen = false;
      form.reset();
  }

  OpenCheckModal() {
    this.isCheckModalOpen = true;
  }

  CloseCheckModal() {
    this.isCheckModalOpen = false;
  }
}
