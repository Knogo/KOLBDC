import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  public login(user: User): Observable<any> {
    return this.http.post<User>('http://localhost:8080/user/login/', user);
  }

  public logout(): Observable<any> {
    sessionStorage.clear();
    return this.http.get('http://localhost:8080/user/logout/');
  }
}
