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
  public currentStep = 1;
  
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
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    gender: ['', Validators.required],
    cin: ['', Validators.required],
    status: ['', Validators.required],
    kidsNumber: [0, Validators.required],
    role: ['', Validators.required],
    contract: this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      salary: [0, Validators.required],
      contractType: ['', Validators.required],
    })
  });

    // Initialize edit employee form
    this.editEmployeeForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contract: ['', Validators.required],
      salary: [0, Validators.required],
      status: ['', Validators.required],
      cin: ['', Validators.required]
    });
  }

  public openModal() {
    this.employeeForm.reset({role: ''});
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
    this.currentStep = 1
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
      status:  employee.status,
      contract: employee.contract.contractType,
      salary: employee.contract.salary,
      cin: employee.cin
    });
    this.isEditModalOpen = true;
    console.log(this.selectedEmployee())
  }

  public closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedEmployee.set(null);
  }
  
  public addEmployee() {
    if(this.employeeForm.valid) {
    this.userService.Register(this.employeeForm.value).subscribe({
      next:()=> {
        console.log("User Created Successfully ");
        this.getEmployees()
        this.closeModal();
      },
      error: err=>{
      console.log("Error While Creating the User :", err);
      console.log(this.employeeForm.value);
        } 
    })
    } else {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.employeeForm.controls).forEach(key => {
        const control = this.employeeForm.get(key);
        control?.markAsTouched();
      });
    }
  }
  
  public updateEmployee():void {
  var  userId = this.selectedEmployee()?.id;
    if (userId) {
    this.userService.UpdateUser(userId,this.editEmployeeForm.value).subscribe({
      next:()=> {
        console.log("user Updated Successfully !")
        window.location.reload();
      },
      error: err => console.error(err)
    });
  } else {
    console.error('No user ID available');
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

nextStep() {
  if (this.currentStep < 3) {
    this.currentStep++;
  }
}

previousStep() {
  if (this.currentStep > 1) {
    this.currentStep--;
  }
}
    
    // this.employees = this.employees.filter(employee => 
    //   employee.name.toLowerCase().includes(this.searchEmployee.toLowerCase())
    // );
}