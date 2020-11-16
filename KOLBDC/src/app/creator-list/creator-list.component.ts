import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Creator } from '../creator';
import { CreatorService } from '../creator.service';

@Component({
  selector: 'app-creator-list',
  templateUrl: './creator-list.component.html',
  styleUrls: ['./creator-list.component.css']
})
export class CreatorListComponent implements OnInit {

  creator: Creator[];

  constructor(private creatorService: CreatorService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("List of Creators");
    this.creatorService.getAllCreators().subscribe(data => {
      this.creator = data
    });
  }

}
