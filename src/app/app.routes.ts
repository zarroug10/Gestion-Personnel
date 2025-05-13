import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AbsenceComponent } from './components/absence/absence.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WorkTimeComponent } from './components/work-time/work-time.component';
import { MonthlySpentComponent } from './components/monthly-spent/monthly-spent.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',loadComponent: () => HomeComponent },
    { path: 'login', loadComponent: () => LoginComponent },
    { path: 'signup', loadComponent: () => SignupComponent },
    { path: 'absence', loadComponent: () => AbsenceComponent },
    { path: 'monthly-spent', loadComponent: () => MonthlySpentComponent },
    { path: 'employees', loadComponent: () => EmployeesComponent },
    { path: 'profile', loadComponent: () => ProfileComponent },
    {path: 'work-time', loadComponent: () => WorkTimeComponent},
];

