import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AbsenceComponent } from './components/absence/absence.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WorkTimeComponent } from './components/work-time/work-time.component';
import { MonthlySpentComponent } from './components/monthly-spent/monthly-spent.component';
import { VacationRequestsComponent } from './components/vacation-requests/vacation-requests.component';
import { VacationsComponent } from './components/vacations/vacations.component';
export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',loadComponent: () => HomeComponent },
    { path: 'login', loadComponent: () => LoginComponent },
    { path: 'absence', loadComponent: () => AbsenceComponent },
    { path: 'monthly-spent', loadComponent: () => MonthlySpentComponent },
    { path: 'employees', loadComponent: () => EmployeesComponent },
    { path: 'profile', loadComponent: () => ProfileComponent },
    {path: 'work-time', loadComponent: () => WorkTimeComponent},
    {path: 'vacation-requests', loadComponent: () => VacationRequestsComponent},
    {path: 'vacations', loadComponent: () => VacationsComponent},
];

