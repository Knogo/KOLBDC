import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Dungeon } from 'src/app/classes/dungeon';
import { DungeonService } from 'src/app/classes/dungeon.service';

@Component({
  selector: 'app-ceditor',
  templateUrl: './ceditor.component.html',
  styleUrls: ['./ceditor.component.css']
})
export class CeditorComponent implements OnInit {
  dungeon: Dungeon = new Dungeon();

  constructor(private titleService: Title, private dungeonService: DungeonService, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("New Dungeon");
  }

}
