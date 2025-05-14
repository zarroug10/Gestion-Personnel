import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import { VacationRequests } from '../../models/VacationRequests';
import { NgIcon } from '@ng-icons/core';
import { provideIcons } from '@ng-icons/core';
import { featherCheck, featherClock, featherX } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-vacation-requests',
  imports: [
    DatePipe,
    NgIcon
  ],
  providers: [
    provideIcons({
      featherCheck,
      featherClock,
      featherX,
    })
  ],
  templateUrl: './vacation-requests.component.html',
})
export class VacationRequestsComponent {

  public vacationRequests: VacationRequests[] = [
    //approved
    {
      id: 1,
      employeeId: 1,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-05'),
      reason: 'Vacation', 
      isApproved: true,
      isPending: false,
    },
    //pending
    {
      id: 2,
      employeeId: 2,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-05'),
      reason: 'Vacation',
      isApproved: false,
      isPending: true,
    },
    //rejected
    {
      id: 3,
      employeeId: 3,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-05'),
      reason: 'Vacation',
      isApproved: false,
      isPending: false,
    },
  ];
}
