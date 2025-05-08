import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AbsenceComponent } from './components/absence/absence.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',loadComponent: () => HomeComponent },
    { path: 'login', loadComponent: () => LoginComponent },
    { path: 'signup', loadComponent: () => SignupComponent },
    { path: 'absence', loadComponent: () => AbsenceComponent },
    { path: 'work-time', loadComponent: () => HomeComponent },
    { path: 'monthly-spent', loadComponent: () => HomeComponent },
];

