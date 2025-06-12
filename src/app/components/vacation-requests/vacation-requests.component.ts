import { Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
    }),
    ToastrService
  ],
  templateUrl: './vacation-requests.component.html',
})
export class VacationRequestsComponent implements OnInit {
  private toastr = inject(ToastrService);
  public vacationService = inject(VacationRequestsService);
  
  public vacationRequests: VacationRequests[] = [];
  public filteredRequests: VacationRequests[] = [];
  public currentFilter: 'all' | 'pending' | 'approved' | 'rejected' = 'all';
  public Math = Math;

  
  // Pagination properties
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public totalPages: number = 1;
  public paginatedRequests: VacationRequests[] = [];
  
  ngOnInit() {
    this.getRequests();
  }
  
  public getRequests() {
    this.vacationService.getVacationRequestsByUser().subscribe({
      next: data => {
        this.vacationRequests = data;
        this.applyFilter(this.currentFilter);
      },
      error: err => {
        this.toastr.error('Error fetching vacation requests', 'Error');
        console.error('Error fetching vacation requests:', err);
      }
    });
  }

  public applyFilter(filter: 'all' | 'pending' | 'approved' | 'rejected') {
    this.currentFilter = filter;
    switch (filter) {
      case 'pending':
        this.filteredRequests = this.vacationRequests.filter(request => request.isPending);
        break;
      case 'approved':
        this.filteredRequests = this.vacationRequests.filter(request => request.isApproved);
        break;
      case 'rejected':
        this.filteredRequests = this.vacationRequests.filter(request => !request.isPending && !request.isApproved);
        break;
      default:
        this.filteredRequests = this.vacationRequests;
    }
    this.currentPage = 1; // Reset to first page when filter changes
    this.updatePagination();
  }

  // Pagination methods
  public updatePagination() {
    this.totalPages = Math.ceil(this.filteredRequests.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedRequests = this.filteredRequests.slice(startIndex, startIndex + this.itemsPerPage);
  }

  public changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  public getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    
    if (this.totalPages <= maxPagesToShow) {
      // If total pages is less than max pages to show, show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of page range
      let start = Math.max(2, this.currentPage - 1);
      let end = Math.min(this.totalPages - 1, this.currentPage + 1);
      
      // Adjust if at the start
      if (this.currentPage <= 2) {
        end = 4;
      }
      // Adjust if at the end
      if (this.currentPage >= this.totalPages - 1) {
        start = this.totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < this.totalPages - 1) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Always show last page
      pages.push(this.totalPages);
    }
    
    return pages;
  }
}