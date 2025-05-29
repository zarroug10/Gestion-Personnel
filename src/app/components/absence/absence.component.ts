import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherCheck } from '@ng-icons/feather-icons';
import { VacationRequests } from '../../models/VacationRequests';
import { VacationRequestsService } from '../../services/vacation-requests.service';
import { vacation } from '../../models/vacation';

@Component({
  selector: 'app-absence',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgIcon,
    DatePipe
  ],
  providers: [provideIcons({featherCheck})],
  templateUrl: './absence.component.html',
})
export class AbsenceComponent implements OnInit {
  public dateFrom: string = '';
  public dateTo: string = '';
  public description: string = '';
  public isFormValid = false;
  public vacationService = inject(VacationRequestsService);
  public isLoading = false;
  
  public monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  public dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  public today = new Date();
  public month1 = { year: 0, month: 0 };

  private fromDate: Date | null = null;
  private toDate: Date | null = null;

  ngOnInit() {
    this.setInitialMonths();
  }

  setInitialMonths() {
    const now = new Date();
    this.month1 = { year: now.getFullYear(), month: now.getMonth() };
  }

  prevMonth() {
    if (this.month1.month === 0) {
      this.month1 = { year: this.month1.year - 1, month: 11 };
    } else {
      this.month1 = { year: this.month1.year, month: this.month1.month - 1 };
    }
  }

  nextMonth() {
    if (this.month1.month === 11) {
      this.month1 = { year: this.month1.year + 1, month: 0 };
    } else {
      this.month1 = { year: this.month1.year, month: this.month1.month + 1 };
    }
  }

  isToday(day: number, month: number, year: number): boolean {
    return (
      day === this.today.getDate() &&
      month === this.today.getMonth() &&
      year === this.today.getFullYear()
    );
  }

  public onSubmit(form: NgForm) {
    if (!this.dateFrom || !this.dateTo || !this.description.trim()) {
      console.error('Form is invalid. Please fill all required fields.');
      return;
    }

    // Convert dates to proper ISO format for the API
    const startDate = this.fromDate ? this.fromDate.toISOString() : this.dateFrom;
    const endDate = this.toDate ? this.toDate.toISOString() : this.dateFrom;

    const vacationRequest: vacation = {
      startDate: this.dateFrom,
      endDate: this.dateTo,
      reason: this.description,
      isApproved: false,
      isPending:true
    };

    console.log('Vacation request submitted:', vacationRequest);
    
    this.isLoading = true;
    this.vacationService.SubmitRequest(vacationRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Request submitted successfully:', response);
        this.resetForm();
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error submitting request:', error);
      }
    });
  }

  public resetForm() {
    this.dateFrom = '';
    this.dateTo = '';
    this.description = '';
    this.fromDate = null;
    this.toDate = null;
    this.checkFormValidity();
  }

  public checkFormValidity() {
    this.isFormValid = Boolean(
      this.dateFrom && 
      this.dateTo && 
      this.description.trim()
    );
  }

  public getCalendarDays(year: number, month: number): (number | null)[] {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = Array(firstDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }

  public onDayClick(day: number, month: number, year: number) {
    const clicked = new Date(year, month, day);
    if (!this.fromDate || (this.fromDate && this.toDate)) {
      this.fromDate = clicked;
      this.toDate = null;
    } else if (clicked < this.fromDate) {
      this.toDate = this.fromDate;
      this.fromDate = clicked;
    } else {
      this.toDate = clicked;
    }
    
    // Format dates properly for display in the input fields
    this.dateFrom = this.fromDate ? this.formatDateForInput(this.fromDate) : '';
    this.dateTo = this.toDate ? this.formatDateForInput(this.toDate) : '';
    this.checkFormValidity();
  }

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  public isInRange(day: number, month: number, year: number): boolean {
    if (!this.fromDate || !this.toDate) return false;
    const d = new Date(year, month, day);
    return d > this.fromDate && d < this.toDate;
  }

  public isStartOrEnd(day: number, month: number, year: number): boolean {
    const d = new Date(year, month, day);
    return Boolean(
      (this.fromDate && d.getTime() === this.fromDate.getTime()) ||
      (this.toDate && d.getTime() === this.toDate.getTime())
    );
  }
}