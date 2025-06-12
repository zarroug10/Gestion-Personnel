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
  public filteredRequests: VacationRequests[] = [];
   public currentFilter: 'all' | 'pending' | 'approved' | 'rejected' = 'all';
  
  ngOnInit(): void {
    this.getData();
  }

  public getData(){
    this.vacationService.getVacationRequests().subscribe({
      next:data =>{
         this.vacations = data,
         this.applyFilter(this.currentFilter);
        },
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

  public applyFilter(filter: 'all' | 'pending' | 'approved' | 'rejected') {
    this.currentFilter = filter;
    switch (filter) {
      case 'pending':
        this.filteredRequests = this.vacations.filter(request => request.isPending);
        break;
      case 'approved':
        this.filteredRequests = this.vacations.filter(request => request.isApproved);
        break;
      case 'rejected':
        this.filteredRequests = this.vacations.filter(request => !request.isPending && !request.isApproved);
        break;
      default:
        this.filteredRequests = this.vacations;
    }
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