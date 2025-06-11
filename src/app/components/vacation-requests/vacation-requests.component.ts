import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { VacationRequests } from '../../models/VacationRequests';
import { NgIcon } from '@ng-icons/core';
import { provideIcons } from '@ng-icons/core';
import { featherCheck, featherClock, featherTrash, featherX } from '@ng-icons/feather-icons';
import { VacationRequestsService } from '../../services/vacation-requests.service';

@Component({
  selector: 'app-vacation-requests',
  imports: [
    DatePipe,
    NgIcon,
  ],
  providers: [
    provideIcons({
      featherCheck,
      featherClock,
      featherX,
      featherTrash
    })
  ],
  templateUrl: './vacation-requests.component.html',
})
export class VacationRequestsComponent implements OnInit {
  
  public vacationService = inject(VacationRequestsService);
  
  public vacationRequests: VacationRequests[] = [];
  
  ngOnInit() {
    this.getRequests();
  }
  
  public getRequests() {
    this.vacationService.getVacationRequestsByUser().subscribe({
      next: data => {
        this.vacationRequests = data; 
      },
      error: err => {
        console.error('Error fetching vacation requests:', err);
      }
    });
  }
}