import { Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { provideIcons } from '@ng-icons/core';
import { NgIcon } from '@ng-icons/core';
import { featherCalendar, featherX } from '@ng-icons/feather-icons';
import { VacationRequests } from '../../models/VacationRequests';
@Component({
  selector: 'app-vacations',
  imports: [
    NgIcon,
    DatePipe,
  ],
  providers: [
    provideIcons({
      featherCalendar,
      featherX
    })
  ],
  templateUrl: './vacations.component.html',
})
export class VacationsComponent {


  public isOpen: boolean = false;
  public selectedVacation = signal<VacationRequests | null >(null);

  public vacations: VacationRequests    [] = [
    {
      id: 1,
      employeeId: 1,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-05'),
      reason: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      isApproved: false,
      isPending: true,
    },
    {
      id: 2,
      employeeId: 2,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-05'),
      reason: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      isApproved: true,
      isPending: false,
    },
    {
      id: 3,
      employeeId: 3,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-05'),
      reason: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
      isApproved: false,
      isPending: false,
    },
  ]

  public openVacation(vacation: VacationRequests) {
    this.isOpen = true;
    this.selectedVacation.set(vacation);
  }

  public closeVacation() {
    this.isOpen = false;
    this.selectedVacation.set(null);
  }

}