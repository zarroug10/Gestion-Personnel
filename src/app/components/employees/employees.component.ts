import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../models/Employee';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { AuthentificationService } from '../../services/auth/authentifcation.service';

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
  public authService = inject(AuthentificationService);
  public isModalOpen = false;
  public isFireModalOpen = false;
  public isEditModalOpen = false;
  public searchEmployee = '';
  public employeeForm: FormGroup = new FormGroup({});
  public editEmployeeForm: FormGroup = new FormGroup({});
  public selectedEmployee = signal< User | null >(null);
  public currentStep = 1;
  
  public employees : User[] = [];
  public paginatedEmployees: User[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public totalPages: number = 1;
  public Math = Math; // Make Math available in template

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
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required],
      cin: ['', Validators.required],
      contractDto: this.fb.group({
            contractType: ['', Validators.required],
            salary: [0, Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            ownerId:['']
       })
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
      username: employee.username,
      email: employee.email,
      status: employee.status,
      cin: employee.cin,
      contractDto: {
        contractType: employee.contract.contractType,
        salary: employee.contract.salary,
        startDate: employee.contract.startDate,
        endDate: employee.contract.endDate,
        ownerId: employee.contract.ownerId
      }
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
  
public UpdateInfo():void {
  var  userId = this.selectedEmployee()?.id;
    if (userId) {
    this.userService.UpdateUser(userId,this.editEmployeeForm.value).subscribe({
      next:()=> {
        console.log("user Updated Successfully !")
        window.location.reload();
      },
    });
  } else {
    console.error('No user ID available');
  }
}

  private updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEmployees = this.employees.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.employees.length / this.itemsPerPage);
  }

  public changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  public getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of visible pages
      let start = Math.max(2, this.currentPage - 1);
      let end = Math.min(this.totalPages - 1, this.currentPage + 1);
      
      // Adjust if at the start
      if (this.currentPage <= 2) {
        end = 4;
      }
      // Adjust if at the end
      if (this.currentPage >= this.totalPages - 1) {
        start = this.totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < this.totalPages - 1) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Always show last page
      pages.push(this.totalPages);
    }
    
    return pages;
  }

  public getEmployees() {
    this.userService.getUsers(this.searchEmployee).subscribe({
      next: data => {
        this.employees = data;
        this.currentPage = 1; // Reset to first page when new data arrives
        this.updatePagination();
      }
    });
  }
  
  public fireEmployee() {
  var  userId = this.selectedEmployee()?.id;
  if(userId != null){
this.userService.DeleteEmployee(userId).subscribe({
    next: () => {
      console.log("Deleted Successfully !");
      this.closeFireModal();
      this.getEmployees();
    },
    error:err=> console.error(err)
    
   })
  }
  else{
    console.error("Id is Not found");
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