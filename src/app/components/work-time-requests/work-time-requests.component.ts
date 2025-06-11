import { Component, inject, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { workRequest, WorkTimeEntry, workTimeGroup } from '../../models/WorkTimeEntry';
import { WorkTimeService } from '../../services/workTime.service';
import { DatePipe, NgClass } from '@angular/common';
import { featherCheck, featherClock, featherTrash, featherX, featherArrowLeft } from '@ng-icons/feather-icons';

interface GroupedEntries {
  key: string;
  value: WorkTimeEntry[];
}

@Component({
  selector: 'app-work-time-requests',
  imports: [
    NgIcon,
    DatePipe,
    NgClass
],
  providers:[provideIcons({
    featherTrash,
    featherX,
    featherClock,
    featherCheck,
    featherArrowLeft
  })],
  templateUrl: './work-time-requests.component.html',
})
export class WorkTimeRequestsComponent implements OnInit {
  public workTimeRequests: workTimeGroup[] = [];
  public workTimeService = inject(WorkTimeService);
  public selectedRequest: workTimeGroup | null = null;
  public isDetailView = false;
  public groupedEntries: GroupedEntries[] = [];

  public monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  ngOnInit(): void {
    this.getWorkTime();
  }

  public getWorkTime() {
    this.workTimeService.getWorkLoad().subscribe({
      next: data => {
        this.workTimeRequests = data;
        console.log(this.workTimeRequests);
      },
      error: err => console.log(err)
    });
  }

  public viewRequestDetails(request: workTimeGroup) {
    this.selectedRequest = request;
    this.isDetailView = true;
    this.groupEntriesByUsername();
  }

  private groupEntriesByUsername() {
    if (!this.selectedRequest) return;
    
    const groups = new Map<string, WorkTimeEntry[]>();
    
    this.selectedRequest.records.forEach(entry => {
      const username = entry.username || 'Unknown User';
      if (!groups.has(username)) {
        groups.set(username, []);
      }
      groups.get(username)?.push(entry);
    });
    
    this.groupedEntries = Array.from(groups.entries()).map(([key, value]) => ({
      key,
      value
    }));
  }

  public goBack() {
    this.isDetailView = false;
    this.selectedRequest = null;
    this.groupedEntries = [];
  }

  public approveRequest(id:string){
    this.workTimeService.approveRequest(id).subscribe({
      next:()=> {
        console.log("Approved Request !"),
        window.location.reload();
      },
      error:err=> console.log(err)
    })
  }
    
  public rejectRequest(id:string){
    this.workTimeService.rejectRequest(id).subscribe({
      next:()=> {
        console.log("Rejected Request !"),
        this.getWorkTime();
      },
      error:err=> console.log(err)
    })
  }
}