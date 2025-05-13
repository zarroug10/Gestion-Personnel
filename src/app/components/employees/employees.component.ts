import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employees',
  imports: [
    CurrencyPipe,
    NgIf,
  ],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {
  ngOnInit(): void {
    this.employees = this.employees;
    this.filterEmployees(this.searchEmployee);
  }
  public isModalOpen = false;
  public isFireModalOpen = false;
  public searchEmployee = '';
  public isEditModalOpen = false;

  public employees = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Developer',
      email: 'john.doe@example.com',
      cin: '1234567',
      phone: '1234567',
      salary: '1234567',
    }, 
    {
      id: 2,
      name: 'Jane Doe',
      role: 'Designer',
      email: 'jane.doe@example.com',
      cin: '1234567',
      phone: '1234567',
      salary: '1234567',
    },
    {
      id: 3,
      name: 'John Doe',
      role: 'Manager',
      email: 'john.doe@example.com',
      cin: '1234567',
      phone: '1234567',
      salary: '1234567',
    },
    {
      id: 4,
      name: 'John Doe',
      role: 'Developer',
      email: 'john.doe@example.com',
      cin: '1234567',
      phone: '1234567',
      salary: '1234567',
    },
    {
      id: 5,
      name: 'John Doe',
      role: 'Developer',
      email: 'john.doe@example.com',
      cin: '1234567',
      phone: '1234567',
      salary: '1234567',
    },
  ];

  public openModal() {
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
  }

  public openFireModal() {
    this.isFireModalOpen = true;
  }

  public closeFireModal() {
    this.isFireModalOpen = false;
  }

  public openEditModal() {
    this.isEditModalOpen = true;
  }

  public closeEditModal() {
    this.isEditModalOpen = false;
  }

  public filterEmployees(text: string) {
    if (text === '') {
      this.employees = this.employees;
    } else {
      this.employees = this.employees.filter(employee => employee.name.toLowerCase().includes(text.toLowerCase()));
    }
  }
}
