import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Updatedform, User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:5021/api/User");
  }

  UpdateUser(id: string,user:Updatedform): Observable<User> {
    return this.http.patch<User>(`http://localhost:5021/api/User/Update/${id}`, user,{withCredentials:true});
  }

  rejectRequest(id: number): Observable<User> {
    return this.http.patch<User>(`http://localhost:5021/api/Vacation/${id}/reject`, {});
  }
} 