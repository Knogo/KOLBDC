import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dungeon } from './dungeon';

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
