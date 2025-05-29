import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherCheck, featherEdit, featherTrash } from '@ng-icons/feather-icons';

import { WorkTimeEntry } from '../../models/WorkTimeEntry';
import { Employee } from '../../models/Employee';




@Component({
  selector: 'app-work-time',
  imports: [NgClass,
    NgIcon,
    CommonModule,
    FormsModule,
    DatePipe
  ],
  providers: [provideIcons({featherCheck, featherEdit, featherTrash})],
  templateUrl: './work-time.component.html',
})
export class WorkTimeComponent {

  public isOptionMenuOpen = false;
  public selectedEmployee: Employee | null = null;
  public dateFrom: string = '';
  public dateTo: string = '';
  public description: string = '';
  public duration: number = 0;


  public addWorkTime() {
    if (!this.selectedEmployee || !this.dateFrom || !this.dateTo || !this.description.trim()) return;

    const newEntry: WorkTimeEntry = {
      employeeId: this.selectedEmployee.id,
      employeeName: this.selectedEmployee.name,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      duration: this.duration,
      description: this.description
    };

    this.workTimeEntries.push(newEntry);

    // Clear input fields
    this.dateFrom = '';
    this.dateTo = '';
    this.description = '';
    this.fromDate = null;
    this.toDate = null;
  }
  
  //Samples of work time entries
  public workTimeEntries: WorkTimeEntry[] = [
    {
      employeeId: 1,
      employeeName: 'Jane Smith',
      dateFrom: '2025-05-01',
      dateTo: '2025-05-05',
      description: 'Worked on project X',
      duration: 4
    },
    {
      employeeId: 2,
      employeeName: 'Jane Smith',
      dateFrom: '2025-05-02',
      dateTo: '2025-05-06', 
      description: 'Worked on project Y',
      duration: 4
    },
    {
      employeeId: 3,
      employeeName: 'Jane Smith',
      dateFrom: '2025-05-23',
      dateTo: '2025-05-27',
      description: 'Worked on project Z',
      duration: 4
    },
    {
      employeeId: 4,
      employeeName: 'Jane Smith',
      dateFrom: '2025-05-23',
      dateTo: '2025-05-27',
      description: 'Worked on project Z',
      duration: 4
    },
    {
      employeeId: 5,
      employeeName: 'Jane Smith',
      dateFrom: '2025-05-23',
      dateTo: '2025-05-27',
      description: 'Worked on project Z',
      duration: 4
    },
    {
      employeeId: 6,
      employeeName: 'Jane Smith',
      dateFrom: '2025-05-23',
      dateTo: '2025-05-27',
      description: 'Worked on project Z',
      duration: 4
    },
    {
      employeeId: 7,
      employeeName: 'Jane Smith',
      dateFrom: '2025-05-23',
      dateTo: '',
      description: 'Worked on project Z',
      duration: 4
    },
    {
      employeeId: 8,
      employeeName: 'Jane Smith',
      dateFrom: '2025-05-23',
      dateTo: '2025-05-27',
      description: 'Worked on project Z',
      duration: 4
    }
  ];


  // Sample employee data - replace with actual data from your service
  public employees: Employee[] = [
    {
      id: 1,
      name: 'Tom Cook',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 2,
      name: 'Wade Cooper',
      image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 3,
      name: 'John Doe',
      image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 4,
      name: 'Jane Smith',
      image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 5,
      name: 'Alice Johnson',
      image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 6,
      name: 'Bob Brown',
      image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 7,
      name: 'Charlie Davis',
      image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: 8,
      name: 'David Miller',
      image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    
    
  ];

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

  constructor() {
    // Set default selected employee
    this.selectedEmployee = this.employees[0];
  }

  ngOnInit() {
    this.setInitialMonths();
  }

  setInitialMonths() {
    const now = new Date();
    this.month1 = { year: now.getFullYear(), month: now.getMonth() };
    // If December, next month is January of next year
  }

  // Navigation
  prevMonth() {
    // Move both months back by one
    if (this.month1.month === 0) {
      this.month1 = { year: this.month1.year - 1, month: 11 };
    } else {
      this.month1 = { year: this.month1.year, month: this.month1.month - 1 };
    }
  }

  nextMonth() {
    // Move both months forward by one
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

  public selectEmployee(employee: Employee) {
    this.selectedEmployee = employee;
    this.isOptionMenuOpen = false;
  }

  public isSelected(employee: Employee): boolean {
    return this.selectedEmployee?.id === employee.id;
  }
  

  
  applyDateRange() {
    // You can handle the selected date range here
    // For example, you can filter data, send to API, etc.
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
    this.dateFrom = this.fromDate ? this.fromDate.toISOString().slice(0, 10) : '';
    this.dateTo = this.toDate ? this.toDate.toISOString().slice(0, 10) : '';
  }

  isInRange(day: number, month: number, year: number): boolean {
    if (!this.fromDate || !this.toDate) return false;
    const d = new Date(year, month, day);
    return d > this.fromDate && d < this.toDate;
  }

  
  public WorkTimeEntriesInRange(month:number,year:number,day:number):WorkTimeEntry[] {
    return this.workTimeEntries.filter(entry => {
      const entryDate = new Date(entry.dateFrom);
      const entryDateTo = new Date(entry.dateTo);
      const d = new Date(year, month, day);
      return d > entryDate && d < entryDateTo;
    });
  }

  isStartOrEnd(day: number, month: number, year: number): boolean {
    const d = new Date(year, month, day);
    return Boolean(
      (this.fromDate && d.getTime() === this.fromDate.getTime()) ||
      (this.toDate && d.getTime() === this.toDate.getTime())
    );
  }

  public deleteWorkTimeEntry(entry: WorkTimeEntry) {
    this.workTimeEntries = this.workTimeEntries.filter(e => e !== entry);
  }
  
} 
