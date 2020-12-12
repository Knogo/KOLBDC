import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl: string;
  
  constructor(private http: HttpClient, private router: Router) { 
    this.userUrl = 'http://localhost:8080/users/';
  }

  //Admin only
  public getAllUsers(): Observable<any> {
    return this.http.get<User[]>(this.userUrl);
  } 

  //Admin only -- Login does the work already (Protect other users)
  public getUser(id: number): Observable<any> {
    return this.http.get<User>(this.userUrl + id);
  } 

  //Add/edit user does a lot of work to create matching subtables according to the user roles -- diver == matching diver table entry, creator == matching creator table entry.

  //Admin only -- New user already handles this for general users
  public addUser(user: User) {
    return this.http.post<User>(this.userUrl, user);
  }

  //Username/Password edits -- if Admin, then role promotion allowed
  public editUser(user: User) {
    return this.http.put<User>(this.userUrl, user);
  }

  //Admins only -- Delete cascades to subtables (diver/creator)
  public deleteUser(id: number): Observable<any> {
    return this.http.delete<User>(this.userUrl + id);
  }

  //Login Bundle
  public login(user: User): Observable<any> {
    return this.http.post<User>('http://localhost:8080/user/login/', user);
  }

  public logout(): Observable<any> {
    localStorage.clear();
    return this.http.get('http://localhost:8080/user/logout/');
  }

  public newUser(user: User): Observable<any> {
    return this.http.post<User>('http://localhost:8080/newusers/', user);
  }
}
