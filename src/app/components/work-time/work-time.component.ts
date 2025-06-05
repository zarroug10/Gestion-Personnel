import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherCheck, featherEdit, featherTrash } from '@ng-icons/feather-icons';

import { workRequest, WorkTimeEntry } from '../../models/WorkTimeEntry';
import { Employee } from '../../models/Employee';
import { AuthentificationService } from '../../services/auth/authentifcation.service';
import { WorkTimeService } from '../../services/workTime.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-work-time',
  imports: [
    NgClass,
    NgIcon,
    CommonModule,
    ReactiveFormsModule,
    DatePipe
  ],
  providers: [provideIcons({featherCheck, featherEdit, featherTrash})],
  templateUrl: './work-time.component.html',
})
export class WorkTimeComponent implements OnInit {

  public isOptionMenuOpen = false;
  public dateFrom: string = '';
  public dateTo: string = '';
  public description: string = '';
  public duration: number = 0;
  public isLoading = false;

  // Form Group
  public workTimeForm: FormGroup;

  private authService = inject(AuthentificationService);
  private WorkTimeService = inject(WorkTimeService);
  private fb = inject(FormBuilder);

  constructor() {
    // Initialize the form
    this.workTimeForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  // Method to add/submit work time entry
  public addWork() {
    if (this.workTimeForm.invalid) {
      console.error('Form is invalid. Please fill all required fields.');
      this.markFormGroupTouched();
      return;
    }

    const formValue = this.workTimeForm.value;
    
    const workRequest: workRequest = {
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      description: formValue.description,
      isApproved: false,
      isPending: true
    };

    console.log('Work time request submitted:', workRequest);
    
    this.isLoading = true;
    this.WorkTimeService.SubmitRequest(workRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Request submitted successfully:', response);
        this.resetForm();
        this.getUserWorkTime(); // Refresh the list
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error submitting request:', error);
      }
    });
  }

  // Legacy onSubmit method (keeping for backward compatibility)
  public onSubmit() {
    this.addWork();
  }
  
  //Samples of work time entries
  public workTimeEntries: WorkTimeEntry[] = [];

  // Reset form method
  public resetForm() {
    this.workTimeForm.reset();
    this.dateFrom = '';
    this.dateTo = '';
    this.description = '';
    this.fromDate = null;
    this.toDate = null;
  }

  // Legacy restForm method (keeping for backward compatibility)
  public restForm() {
    this.resetForm();
  }

  // Mark all form fields as touched to show validation errors
  private markFormGroupTouched() {
    Object.keys(this.workTimeForm.controls).forEach(key => {
      const control = this.workTimeForm.get(key);
      control?.markAsTouched();
    });
  }

  // Getter methods for easy access to form controls in template
  get startDateControl() {
    return this.workTimeForm.get('startDate');
  }

  get endDateControl() {
    return this.workTimeForm.get('endDate');
  }

  get descriptionControl() {
    return this.workTimeForm.get('description');
  }

  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  today = new Date();

  // These will be updated dynamically
  month1 = { year: 0, month: 0 };

  private fromDate: Date | null = null;
  private toDate: Date | null = null;

  ngOnInit() {
    this.setInitialMonths();
    this.getUserWorkTime();
  }

  setInitialMonths() {
    const now = new Date();
    this.month1 = { year: now.getFullYear(), month: now.getMonth() };
  }

  // Navigation
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

  public toggleMenu() {
    this.isOptionMenuOpen = !this.isOptionMenuOpen;
  }

  public getUserWorkTime() {
    var userId = this.authService.currentUser()?.id;
    if (userId) {
      this.WorkTimeService.getWorkLoadByUser(userId).pipe(
        map(entries =>
          entries.map(entry => ({
            ...entry,
            duration: this.calculateDurationInDays(entry.startDate, entry.endDate)
          }))
        )
      ).subscribe({
        next: data => {
          this.workTimeEntries = data;
          console.log(this.workTimeEntries);
        },
        error: err => console.log(err)
      });
    }
  }

calculateDurationInDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Round to nearest full day
  const msInDay = 1000 * 60 * 60 * 24;
  return Math.round((end.getTime() - start.getTime()) / msInDay);
}

  // Helper method to format date without timezone conversion
  private formatDateLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  applyDateRange() {
    console.log('Selected range:', this.dateFrom, 'to', this.dateTo);
  }

  getCalendarDays(year: number, month: number): (number | null)[] {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = Array(firstDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }

  onDayClick(day: number, month: number, year: number) {
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
    
    // Format dates without timezone conversion
    this.dateFrom = this.fromDate ? this.formatDateLocal(this.fromDate) : '';
    this.dateTo = this.toDate ? this.formatDateLocal(this.toDate) : '';
    
    // Update form controls when dates are selected from calendar
    this.workTimeForm.patchValue({
      startDate: this.dateFrom,
      endDate: this.dateTo
    });
  }

  isInRange(day: number, month: number, year: number): boolean {
    if (!this.fromDate || !this.toDate) return false;
    const currentDate = new Date(year, month, day);
    const fromTime = new Date(this.fromDate.getFullYear(), this.fromDate.getMonth(), this.fromDate.getDate());
    const toTime = new Date(this.toDate.getFullYear(), this.toDate.getMonth(), this.toDate.getDate());
    return currentDate > fromTime && currentDate < toTime;
  }

  public WorkTimeEntriesInRange(month: number, year: number, day: number): WorkTimeEntry[] {
    return this.workTimeEntries.filter(entry => {
      const entryStartDate = new Date(entry.startDate);
      const entryEndDate = entry.endDate ? new Date(entry.endDate) : entryStartDate;
      const currentDate = new Date(year, month, day);
      
      // Check if current date falls within the entry date range (inclusive)
      return currentDate >= entryStartDate && currentDate <= entryEndDate;
    });
  }

  isStartOrEnd(day: number, month: number, year: number): boolean {
    const currentDate = new Date(year, month, day);
    const fromTime = this.fromDate ? new Date(this.fromDate.getFullYear(), this.fromDate.getMonth(), this.fromDate.getDate()) : null;
    const toTime = this.toDate ? new Date(this.toDate.getFullYear(), this.toDate.getMonth(), this.toDate.getDate()) : null;
    
    return Boolean(
      (fromTime && currentDate.getTime() === fromTime.getTime()) ||
      (toTime && currentDate.getTime() === toTime.getTime())
    );
  }

  public deleteWorkTimeEntry(id: string) {
   return  this.WorkTimeService.DeleteRecord(id);
  }
}