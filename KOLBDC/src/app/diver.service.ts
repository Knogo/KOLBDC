import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Diver } from './diver';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class DiverService {
  private diverUrl: string;

  constructor(private http: HttpClient) { 
    this.diverUrl = 'http://localhost:8080/diver/';
  }

  public getAllDivers(): Observable<any> {
    return this.http.get<Diver[]>(this.diverUrl);
  } 
}