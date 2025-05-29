import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../models/Employee';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-employees',
  standalone: true,  // Add this if using standalone components
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {
  public userService = inject(UserService);
  public isModalOpen = false;
  public isFireModalOpen = false;
  public isEditModalOpen = false;
  public searchEmployee = '';
  public employeeForm: FormGroup = new FormGroup({});
  public editEmployeeForm: FormGroup = new FormGroup({});
  public selectedEmployee = signal< User | null >(null);
  
  public employees : User[] = [];

  constructor(private fb: FormBuilder) {
    this.initForms();
  }

  ngOnInit(): void {
    this.getEmployees();
  }
  
  private initForms() {
    // Initialize add employee form
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contract: ['', Validators.required],
      salary: [0, Validators.required],
      role: ['', Validators.required],
      cin: ['', Validators.required]
    });
    
    // Initialize edit employee form
    this.editEmployeeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contract: ['', Validators.required],
      salary: [0, Validators.required],
      role: ['', Validators.required],
      cin: ['', Validators.required]
    });
  }

  public openModal() {
    this.employeeForm.reset({role: ''});
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
  }

  public openFireModal(employee: User) {
    this.selectedEmployee.set(employee);
    this.isFireModalOpen = true;
  }

  public closeFireModal() {
    this.isFireModalOpen = false;
    this.selectedEmployee.set(null);
  }

  public openEditModal(employee: User) {
    this.selectedEmployee.set({...employee});
    this.editEmployeeForm.patchValue({
      id: employee.id,
      name: employee.username,
      email: employee.email,
      role:  employee.roles?.join(', '),
      contract: employee.contract.contractType,
      salary: employee.contract.salary,
      cin: employee.cin
    });
    this.isEditModalOpen = true;
  }

  public closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedEmployee.set(null);
  }
  
  public addEmployee() {
    if(this.employeeForm.valid) {
      const newEmployee = {
        id: this.employees.length + 1,
        ...this.employeeForm.value
      };
      this.employees.push(newEmployee);
      this.closeModal();
    } else {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.employeeForm.controls).forEach(key => {
        const control = this.employeeForm.get(key);
        control?.markAsTouched();
      });
    }
  }
  
  public updateEmployee() {
    if(this.editEmployeeForm.valid && this.selectedEmployee()) {
      const updatedEmployee = this.editEmployeeForm.value;
      const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
      
      if(index !== -1) {
        this.employees[index] = updatedEmployee;
      }
      
      this.closeEditModal();
    } else {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.editEmployeeForm.controls).forEach(key => {
        const control = this.editEmployeeForm.get(key);
        control?.markAsTouched();
      });
    }
  }
  public getEmployees(){
    this.userService.getUsers().subscribe({
      next:data => this.employees = data
    })
    console.log(this.employees)
  }
  
  public fireEmployee() {
    if(this.selectedEmployee) {
      this.employees = this.employees.filter(emp => emp.id !== this.selectedEmployee()?.id);
      this.closeFireModal();
    }
  }
  public getDuration(start:string, end:string){
    var  startDate = new Date(start);
    var endDate = new Date(end);
     const startTime = startDate.getFullYear();
    const endTime = endDate.getFullYear();
    return  endTime - startTime;
  }

  public filterEmployees() {
    if (!this.searchEmployee) {
      // Return without filtering
      return;
    }
    
    // this.employees = this.employees.filter(employee => 
    //   employee.name.toLowerCase().includes(this.searchEmployee.toLowerCase())
    // );
  }
}