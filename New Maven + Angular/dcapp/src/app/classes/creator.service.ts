import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Creator } from './creator';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {
  private creatorUrl: string;

  constructor(private http: HttpClient) { 
    this.creatorUrl = 'http://localhost:8080/creator/';
  }

  //Admin only
  public getAllCreators(): Observable<any> {
    return this.http.get<Creator[]>(this.creatorUrl);
  } 

  public getCreator(id: string): Observable<any> {
    return this.http.get<Creator>(this.creatorUrl + id);
  } 

  //Admin only -- New user already handles this
  public addCreator(creator: Creator) {
    return this.http.post<Creator>(this.creatorUrl, creator);
  }

  //Creators/Admins
  public editCreator(creator: Creator) {
    return this.http.put<Creator>(this.creatorUrl, creator);
  }

  //Admins only
  public deleteCreator(id: bigint): Observable<any> {
    return this.http.delete<Creator>(this.creatorUrl + id);
  }
}
