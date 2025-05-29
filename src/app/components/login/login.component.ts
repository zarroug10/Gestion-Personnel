import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { AuthentificationService } from '../../services/auth/authentifcation.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIcon, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
})
export class LoginComponent  {
  public loginForm: FormGroup;
  public isLoading = false;
  public authentificationService = inject(AuthentificationService);
  public isGood = true ;

  constructor(
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

onSubmit(): void {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;
  const { email, password } = this.loginForm.value;

  this.authentificationService.login({ email, password }).subscribe({
    next: () => {
      this.isLoading = false;
    },
    error: () => {
      this.isLoading = false;
    }
  });
}
}