import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Dungeon } from '../dungeon';
import { DungeonService } from '../dungeon.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dungeonlist',
  templateUrl: './dungeonlist.component.html',
  styleUrls: ['./dungeonlist.component.css']
})
export class DungeonlistComponent implements OnInit {
  
  dungeon: Dungeon[];

  constructor(private userService: UserService, private dungeonService: DungeonService, private titleService: Title, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("List of Dungeons");
    console.log(sessionStorage.getItem("name"));
    this.dungeonService.getAllDungeons().subscribe(data => {
      this.dungeon = data
    });
  }
}