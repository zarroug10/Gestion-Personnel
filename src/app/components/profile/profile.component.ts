import { Component, inject, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/auth/authentifcation.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  public authentication = inject(AuthentificationService);
  public userService = inject(UserService);
  public http = inject(HttpClient);
  public employeeForm: FormGroup = new FormGroup({});
  public employeeInfo!: User;
  public toastr = inject(ToastrService);

  /**
*
*/
  constructor(private fb: FormBuilder) {
    this.initForms();
  }

  ngOnInit(): void {
    this.loadUserData();
    console.log(this.authentication.currentUser());
  }

  private initForms() {
    // Initialize add employee form
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['', Validators.required],
      cin: ['', Validators.required],
      contractDto: this.fb.group({
        contractType: ['', Validators.required],
        salary: [0, Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        ownerId: ['']
      })
    })
  }

  public GetUserbyId(UserId: string): void {
    this.http.get<User>(`http://localhost:5021/api/User/${UserId}`).subscribe({
      next: (data) => {
        this.employeeInfo = data;
        this.employeeForm.patchValue({
          username: data.username,
          email: data.email,
          status: data.status,
          cin: this.cinFormat(data.cin),
          contractDto: {
            contractType: data.contract.contractType,
            salary: data.contract.salary,
            startDate: data.contract.startDate,
            endDate: data.contract.endDate,
            ownerId: data.contract.ownerId
          }
        })
        console.log(data.status)
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l’utilisateur', err);
      }
    }
    )
  }

  public loadUserData(): void {
    var userId = this.authentication.currentUser()?.id;
    if (userId) {
      this.GetUserbyId(userId);
    } else {
      console.error('No user ID available');
    }
  }

  public cinFormat(cin: string) {
    if (cin.length < 8) {
      let result = cin.padStart(8, '0');
      return result;
    }
    return cin
  }

  public UpdateInfo(): void {
    var userId = this.authentication.currentUser()?.id;
    if (userId) {
      this.userService.UpdateUser(userId, this.employeeForm.value).subscribe({
        next: () => {
          console.log("user Updated Successfully !")
          this.toastr.success("user Updated Successfully !")

        },
        error: err => {
          let errorMessage = 'An error occurred while updating the user';

          // Handle validation errors (400)
          if (err.status === 400) {
            if (err.error?.errors) {
              // Get all error messages and join them
              const errorMessages = [];
              for (const key in err.error.errors) {
                errorMessages.push(...err.error.errors[key]);
              }
              errorMessage = errorMessages.join(', ');
            } else if (err.error?.title) {
              errorMessage = err.error.title;
            }
          }
          // Handle other error types
          else if (err.error?.message) {
            errorMessage = err.error.message;
          } else if (err.message) {
            errorMessage = err.message;
          }

          this.toastr.error('Error While Updating the User', errorMessage, {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            enableHtml: true // Optional: allows HTML in messages
          });
        }
      });
    } else {
      this.toastr.warning('No user ID available');
    }
  }

  public cancel(): void {
    //reset the form to it's initial state 
    this.employeeForm.patchValue({
      username: this.employeeInfo.username,
      email: this.employeeInfo.email,
      status: this.employeeInfo.status,
      cin: this.cinFormat(this.employeeInfo.cin),
      contractDto: {
        contractType: this.employeeInfo.contract.contractType,
        salary: this.employeeInfo.contract.salary,
        startDate: this.employeeInfo.contract.startDate,
        endDate: this.employeeInfo.contract.endDate,
        ownerId: this.employeeInfo.contract.ownerId
      }
    })
  }


  // public Update(employee:User):Observable<User>{
  //   return this.http.patch<User>('http://localhost:5021/api/User/Update',employee).subscribe({
  //     next:
  //   })
  // }

}
