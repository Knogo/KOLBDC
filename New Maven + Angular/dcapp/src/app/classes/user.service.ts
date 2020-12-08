import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) { }

  public login(user: User): Observable<any> {
    return this.http.post<User>('http://localhost:8080/user/login/', user);
  }

  public logout(): Observable<any> {
    localStorage.clear();
    return this.http.get('http://localhost:8080/user/logout/');
  }
}
