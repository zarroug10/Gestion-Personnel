import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherPlus } from '@ng-icons/feather-icons';

interface Employee {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-absence',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [provideIcons({featherPlus})],
  templateUrl: './absence.component.html',
})
export class AbsenceComponent implements OnInit {
  public isOptionMenuOpen = false;
  public selectedEmployee: Employee | null = null;
  public dateFrom: string = '';
  public dateTo: string = '';
  public description: string = '';
  
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

  isStartOrEnd(day: number, month: number, year: number): boolean {
    const d = new Date(year, month, day);
    return Boolean(
      (this.fromDate && d.getTime() === this.fromDate.getTime()) ||
      (this.toDate && d.getTime() === this.toDate.getTime())
    );
  }
} 