import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Admin } from './admin';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminUrl: string;

  constructor(private http: HttpClient) { 
    this.adminUrl = 'http://localhost:8080/admin/';
  }

  public getAllAdmins(): Observable<any> {
    return this.http.get<Admin[]>(this.adminUrl);
  } 
}