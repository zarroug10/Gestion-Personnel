import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe, NgFor } from '@angular/common';
import { NgStyle } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherPlus } from '@ng-icons/feather-icons';
import { FormsModule, NgForm } from '@angular/forms';
import { monthlySpent, monthlySpentRequest } from '../../models/mothlySpent';
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
  public isDeleteModalOpen = false;
  public selectedMonth: string = '';
  public year: number | null = null;
  public totalAmount: number | null = null;
  public monthspents!:monthlySpentRequest ;
  public SelectedItem = signal<monthlySpent | null > ( null ) ;

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
        this.monthlySpent = data;
      },
      error: err => {
        console.error('Error fetching spents:', err);
      }
    });
  }

  public DeleteMonth(id:string){
    this.monthlyService.DeleteMonth(id).subscribe({
      next:()=> {
        console.log("Deleted Successfully !");
        this.isDeleteModalOpen = false;
        this.getMonthlySpent();
      },
      error:err => console.error(err)
    })
  }

public addMonthlySpent(form: NgForm) {
  this.monthspents = form.value;
  this.monthlyService.currentMonthSpent(this.monthspents).subscribe({
    next: () => {
      console.log("The Record Created Successfully !");
      this.getMonthlySpent();
      this.isCheckModalOpen = false;
      form.reset();
    },
    error: err => {
      console.error('Error Creating spent requests:', err);
    }
  });
}

  OpenCheckModal() {
    this.isCheckModalOpen = true;
  }

  CloseCheckModal() {
    this.isCheckModalOpen = false;
  }

  OpenDeleteModel(item:monthlySpent){
    console.log(item);
    this.isDeleteModalOpen = true ;

    this.SelectedItem.set(item);
  }

  closeDeleteModel(){
    this.isDeleteModalOpen = false ;
  }
}
