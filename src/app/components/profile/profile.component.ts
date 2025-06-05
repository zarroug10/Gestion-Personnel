import { Component, inject, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/auth/authentifcation.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';

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
  public employeeInfo!:User ;

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
      cin: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

public GetUserbyId(UserId: string): void {
  this.http.get<User>(`http://localhost:5021/api/User/${UserId}`).subscribe({
    next: (data) => {
      this.employeeInfo = data;
      this.employeeForm.patchValue({
         username: data.username,
         email: data.email,
         cin: data.cin,
         status:data.status
      });
      console.log(data.status)
    },
    error: (err) => {
      console.error('Erreur lors de la récupération de l’utilisateur', err);
    }
  });
}

public loadUserData(): void {
  var  userId = this.authentication.currentUser()?.id;
  if (userId) {
    this.GetUserbyId(userId);
  } else {
    console.error('No user ID available');
  }
}

public UpdateInfo():void {
  var  userId = this.authentication.currentUser()?.id;
    if (userId) {
    this.userService.UpdateUser(userId,this.employeeForm.value).subscribe({
      next:()=> {
        console.log("user Updated Successfully !")
        window.location.reload();
      },
    });
  } else {
    console.error('No user ID available');
  }
}


  // public Update(employee:User):Observable<User>{
  //   return this.http.patch<User>('http://localhost:5021/api/User/Update',employee).subscribe({
  //     next:
  //   })
  // }

}
