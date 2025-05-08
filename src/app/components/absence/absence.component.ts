import { Component } from '@angular/core';
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
export class AbsenceComponent {
  public isOptionMenuOpen = false;
  public selectedEmployee: Employee | null = null;
  
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

  constructor() {
    // Set default selected employee
    this.selectedEmployee = this.employees[0];
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
} 