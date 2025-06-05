import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VacationRequests } from '../models/VacationRequests';
import { vacation } from '../models/vacation';

@Injectable({
  providedIn: 'root'
})
export class VacationRequestsService {
  private readonly API_URL = 'http://localhost:5021/api/Vacation';

  constructor(private http: HttpClient) {}
//getting the list of vactions
  getVacationRequests(): Observable<VacationRequests[]> {
    return this.http.get<VacationRequests[]>("http://localhost:5021/api/Vacation");
  }

  SubmitRequest(vacation:vacation): Observable<vacation> {
    return this.http.post<vacation>(`http://localhost:5021/api/Vacation/create`,vacation,
    { withCredentials: true });
  }

  approveRequest(id: string): Observable<VacationRequests> {
    return this.http.put<VacationRequests>(`http://localhost:5021/api/Vacation/update/approve/${id}`, {});
  }

  rejectRequest(id: string): Observable<VacationRequests> {
    return this.http.put<VacationRequests>(`http://localhost:5021/api/Vacation/update/reject/${id}`, {},
       { withCredentials: true }
    );
  }
} 