import { Component } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { NgStyle } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherPlus } from '@ng-icons/feather-icons';
import { FormsModule, NgForm } from '@angular/forms';

interface MonthlySpent {
  month: string;
  year: number;
  spent: number;
}

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

  
  public isCheckModalOpen = false;
  public selectedMonth: string = '';
  public year: number | null = null;
  public spent: number | null = null;

  public monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  public dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  public today = new Date();

  // These will be updated dynamically

  public monthlySpent: MonthlySpent[] = [];

  ngOnInit() {
  }

  public addMonthlySpent(form: NgForm) {
    const { month, year, spent } = form.value;
    if(this.monthlySpent.find(item => item.month === month && item.year === year)) {
      this.monthlySpent.push({ month, year, spent });
      console.log(this.monthlySpent);
      this.isCheckModalOpen = false;
      form.reset();
    } else {
      this.isCheckModalOpen = true;
    }

  }

  OpenCheckModal() {
    this.isCheckModalOpen = true;
  }

  CloseCheckModal() {
    this.isCheckModalOpen = false;
  }
}
