import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dungeon } from './dungeon';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class DungeonService {
  private dungeonUrl: string;

  constructor(private http: HttpClient) { 
    this.dungeonUrl = 'http://localhost:8080/dungeon/';
  }

  public getAllDungeons(): Observable<any> {
    return this.http.get<Dungeon[]>(this.dungeonUrl);
  } 

  public getDungeon(did: string): Observable<any> {
    return this.http.get<Dungeon>(this.dungeonUrl + did);
  } 
}