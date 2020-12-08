import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diver } from './diver';

@Injectable({
  providedIn: 'root'
})
export class DiverService {
  private diverUrl: string;

  constructor(private http: HttpClient) { 
    this.diverUrl = 'http://localhost:8080/diver/';
  }

  //Admin only
  public getAllDivers(): Observable<any> {
    return this.http.get<Diver[]>(this.diverUrl);
  } 

  public getDiver(id: string): Observable<any> {
    return this.http.get<Diver>(this.diverUrl + id);
  } 

  //Admin only -- New user already handles this
  public addDiver(diver: Diver) {
    return this.http.post<Diver>(this.diverUrl, diver);
  }

  //Divers/Admins
  public editDiver(diver: Diver) {
    return this.http.put<Diver>(this.diverUrl, diver);
  }

  //Admins only
  public deleteDiver(id: bigint): Observable<any> {
    return this.http.delete<Diver>(this.diverUrl + id);
  }
}
