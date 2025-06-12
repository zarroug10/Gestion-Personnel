import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { workRequest, WorkTimeEntry, workTimeGroup } from '../models/WorkTimeEntry';
import { AuthentificationService } from './auth/authentifcation.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WorkTimeService {

  constructor(private http: HttpClient, private authService:AuthentificationService,private toastr:ToastrService) {}
//getting the list of vactions
  getWorkLoad(): Observable<workTimeGroup[]> {
    return this.http.get<workTimeGroup[]>("http://localhost:5021/api/WorkTime/All");
  }

  getWorkLoadByUser(userId:string):Observable<WorkTimeEntry[]>{
    return this.http.get<WorkTimeEntry[]>(`http://localhost:5021/api/WorkTime/User/${userId}`);
  }

  SubmitRequest(Work:workRequest): Observable<workRequest> {
    return this.http.post<workRequest>(`http://localhost:5021/api/WorkTime`,Work,
    { withCredentials: true });
  }

  DeleteRecord(id: string):void {
    const userId = this.authService.currentUser()!.id;
     this.http.delete<WorkTimeEntry>(`http://localhost:5021/api/WorkTime/Delete/${id}`).subscribe({
      next:()=>{
       this.toastr.success('Work time entry deleted successfully', 'Success');
        this.getWorkLoadByUser(userId);
      },
      error:err => {
        this.toastr.error(err, 'Error');
      }
     });
  }

  rejectRequest(id: string): Observable<WorkTimeEntry> {
    return this.http.put<WorkTimeEntry>(`http://localhost:5021/api/WorkTime/update/reject/${id}`, {}
    );
  }

   approveRequest(id: string): Observable<WorkTimeEntry> {
    return this.http.put<WorkTimeEntry>(`http://localhost:5021/api/WorkTime/update/approve/${id}`, {}
    );
  }
} 