import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Dungeon } from 'src/app/classes/dungeon';
import { DungeonService } from 'src/app/classes/dungeon.service';

@Component({
  selector: 'app-dungeonlist',
  templateUrl: './dungeonlist.component.html',
  styleUrls: ['./dungeonlist.component.css']
})
export class DungeonlistComponent implements OnInit {
  dungeon: Dungeon[];

  constructor(private dungeonService: DungeonService, private titleService: Title, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle("List of Dungeons");
    this.dungeonService.getAllDungeons().subscribe(data => {
      this.dungeon = data
    });
  }

  sortby(field: string) {
    if (field == "did") {
      this.dungeon.sort((a, b) => (a.did > b.did) ? 1 : ((b.did > a.did) ? -1 : 0));
    } else if (field == "name") {
      this.dungeon.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    } else if (field == "cname") {
      this.dungeon.sort((a, b) => (a.cname > b.cname) ? 1 : ((b.cname > a.cname) ? -1 : 0));
    } else if (field == "highscore") {
      this.dungeon.sort((a, b) => (a.highscore > b.highscore) ? 1 : ((b.highscore > a.highscore) ? -1 : 0));
    } else if (field == "minmoves") {
      this.dungeon.sort((a, b) => (a.minmoves > b.minmoves) ? 1 : ((b.minmoves > a.minmoves) ? -1 : 0));
    } 
  }
}
