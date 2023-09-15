import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.baseUrl
  constructor(private http: HttpClient) { }

  addUser(data: any): Observable<User> {
    return this.http.post<User>(`${this.url}`, data);
  }
  getUserList(): Observable<User> {
    return this.http.get<User>(`${this.url}`);
  } 
  getSingleUser(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`)
  } 
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
  } 
  editUser(data: any,id: any): Observable<any> {
    return this.http.put(`${this.url}/${id}`, data);
  }
}
