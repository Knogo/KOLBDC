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

  //Creator/Admin
  public addDungeon(dungeon: Dungeon) {
    return this.http.post<Dungeon>(this.dungeonUrl, dungeon);
  }

  //Diver/Admin -- setting highscores/minmoves for divers only
  public editDungeon(dungeon: Dungeon) {
    return this.http.put<Dungeon>(this.dungeonUrl, dungeon);
  }

  //Admin only
  public deleteDungeon(did: number): Observable<any> {
    return this.http.delete<Dungeon>(this.dungeonUrl + did);
  }
}
