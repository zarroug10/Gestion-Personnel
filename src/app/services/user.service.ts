import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Updatedform, User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

 public getUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:5021/api/User");
  }

  public UpdateUser(id: string,user:Updatedform): Observable<User> {
    return this.http.patch<User>(`http://localhost:5021/api/User/Update/${id}`,{withCredentials:true});
  }

  public Register(user: User): Observable<User> {
    return this.http.post<User>(`http://localhost:5021/api/Authentication/Register`, user,{withCredentials:true});
  }
} 