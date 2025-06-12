import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { NgStyle } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherPlus } from '@ng-icons/feather-icons';
import { FormsModule, NgForm } from '@angular/forms';
import { monthlySpent, monthlySpentRequest } from '../../models/mothlySpent';
import { MonthService } from '../../services/monthly.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-monthly-spent',
  imports: [
    CurrencyPipe,
    NgStyle,
    NgIcon,
    FormsModule
],
  providers: [
    provideIcons({
       featherPlus,
    }),
    ToastrService
  ],
  templateUrl: './monthly-spent.component.html',
})
export class MonthlySpentComponent {

  public monthlySpent : monthlySpent[] = [];
  public monthlyService = inject(MonthService);
  private toastr = inject(ToastrService);

  
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
        this.toastr.error('Error fetching monthly expenses', 'Error');
        console.error('Error fetching spents:', err);
      }
    });
  }

  public DeleteMonth(id:string){
    this.monthlyService.DeleteMonth(id).subscribe({
      next:()=> {
         this.toastr.success("Deleted Successfully !");
        this.isDeleteModalOpen = false;
        this.getMonthlySpent();
      },
           error: err => {
          // Extract the first error message from the response
          const errorMessage = err.error[''] ? err.error[''][0] : err.message;
          
          this.toastr.error('Error While Creating the User', errorMessage, {
              timeOut: 3000,
              positionClass: 'toast-top-right'
          });
      }
    })
  }

public addMonthlySpent(form: NgForm) {
  this.monthspents = form.value;
  this.monthlyService.currentMonthSpent(this.monthspents).subscribe({
    next: () => {
      this.toastr.success('Monthly expense added successfully', 'Success');
      this.getMonthlySpent();
      this.isCheckModalOpen = false;
      form.reset();
    },
      error: err => {
          // Extract the first error message from the response
          const errorMessage = err.error[''] ? err.error[''][0] : err.message;
          
          this.toastr.error('Error While Creating the User', errorMessage, {
              timeOut: 3000,
              positionClass: 'toast-top-right'
          });
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
