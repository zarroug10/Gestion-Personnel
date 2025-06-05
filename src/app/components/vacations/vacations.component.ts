import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';

import { provideIcons } from '@ng-icons/core';
import { NgIcon } from '@ng-icons/core';
import { featherCalendar, featherCheck, featherClock, featherTrash, featherX } from '@ng-icons/feather-icons';
import { TimeagoModule } from 'ngx-timeago';

import { VacationRequests } from '../../models/VacationRequests';
import { VacationRequestsService } from '../../services/vacation-requests.service';
@Component({
  selector: 'app-vacations',
  imports: [
    NgIcon,
    DatePipe,
    NgClass,
    DatePipe,
    TimeagoModule
  ],
  providers: [
    provideIcons({
      featherCalendar,
      featherX,
      featherClock,
      featherCheck,
      featherTrash
    })
  ],
  templateUrl: './vacations.component.html',
})
export class VacationsComponent implements OnInit{
  
  
  public isOpen: boolean = false;
  public selectedVacation = signal<VacationRequests | undefined >(undefined);
  public vacationService = inject(VacationRequestsService);
  public vacations: VacationRequests [] = [] ;
  
  ngOnInit(): void {
    this.getData();
  }

  public getData(){
    this.vacationService.getVacationRequests().subscribe({
      next:data => this.vacations = data ,
      error: err => console.log("Error:", err)
    })
  }

  public openVacation(vacation: VacationRequests) {
    this.isOpen = true;
    this.selectedVacation.set(vacation);
  }

  public closeVacation() {
    this.isOpen = false;
    this.selectedVacation.set(undefined);
  }

  public approveVacation(id: string) {
    this.vacationService.approveRequest(id).subscribe({
      next: () => {
        console.log("Approved Successfully!");
        this.getData();
        this.closeVacation();
      },
      error: err => console.log(err)
    });
  }

    public rejectedVacation(id: string) {
    this.vacationService.rejectRequest(id).subscribe({
      next: () => {
        console.log("rejected Successfully!");
        this.getData();
        this.closeVacation();
      },
      error: err => console.log(err)
    });
  }
}