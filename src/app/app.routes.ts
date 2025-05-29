import { Routes } from '@angular/router';
import { AuthorizationGuard } from './guards/authorization.guard';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AbsenceComponent } from './components/absence/absence.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WorkTimeComponent } from './components/work-time/work-time.component';
import { MonthlySpentComponent } from './components/monthly-spent/monthly-spent.component';
import { VacationRequestsComponent } from './components/vacation-requests/vacation-requests.component';
import { VacationsComponent } from './components/vacations/vacations.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'login', loadComponent: () => LoginComponent },

  { path: 'home', loadComponent: () => HomeComponent, canActivate: [AuthorizationGuard] },
  { path: 'absence', loadComponent: () => AbsenceComponent, canActivate: [AuthorizationGuard] },
  { path: 'employees', loadComponent: () => EmployeesComponent, canActivate: [AuthorizationGuard] },
  { path: 'profile', loadComponent: () => ProfileComponent, canActivate: [AuthorizationGuard] },
  { path: 'work-time', loadComponent: () => WorkTimeComponent, canActivate: [AuthorizationGuard] },
  { path: 'monthly-spent', loadComponent: () => MonthlySpentComponent, canActivate: [AuthorizationGuard] },
  { path: 'vacation-requests', loadComponent: () => VacationRequestsComponent, canActivate: [AuthorizationGuard] },
  { path: 'vacations', loadComponent: () => VacationsComponent, canActivate: [AuthorizationGuard] },

  { path: '**', loadComponent: () => NotFoundComponent }
];
