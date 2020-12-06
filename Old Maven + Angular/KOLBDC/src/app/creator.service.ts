import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Creator } from './creator';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class CreatorService {
  private creatorUrl: string;

  constructor(private http: HttpClient) { 
    this.creatorUrl = 'http://localhost:8080/creator/';
  }

  public getAllCreators(): Observable<any> {
    return this.http.get<Creator[]>(this.creatorUrl);
  } 
}