import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Dungeon } from '../dungeon';
import { DungeonService } from '../dungeon.service';

@Component({
  selector: 'app-dungeon-list',
  templateUrl: './dungeon-list.component.html',
  styleUrls: ['./dungeon-list.component.css']
})
export class DungeonListComponent implements OnInit {

  dungeon: Dungeon[];

  constructor(private dungeonService: DungeonService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("List of Dungeons");
    this.dungeonService.getAllDungeons().subscribe(data => {
      this.dungeon = data
    });
  }

}
