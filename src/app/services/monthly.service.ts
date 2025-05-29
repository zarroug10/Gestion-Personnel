import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { monthlySpent } from '../models/mothlySpent';


@Injectable({
  providedIn: 'root'
})
export class MonthService {

  constructor(private http: HttpClient) {}

  getMonthsSpents(): Observable<monthlySpent[]> {
    return this.http.get<monthlySpent[]>("http://localhost:5021/api/Month");
  }

  approveRequest(id: number): Observable<monthlySpent> {
    return this.http.patch<monthlySpent>(`http://localhost:5021/api/Vacation/${id}/approve`, {});
  }

  rejectRequest(id: number): Observable<monthlySpent> {
    return this.http.patch<monthlySpent>(`http://localhost:5021/api/Vacation/${id}/reject`, {});
  }
} 