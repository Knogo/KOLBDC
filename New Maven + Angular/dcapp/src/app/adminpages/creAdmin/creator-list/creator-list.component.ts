import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Creator } from 'src/app/classes/creator';
import { CreatorService } from 'src/app/classes/creator.service';

@Component({
  selector: 'app-creator-list',
  templateUrl: './creator-list.component.html',
  styleUrls: ['./creator-list.component.css']
})
export class CreatorListComponent implements OnInit {
  creator: Creator[];

  constructor(private creatorService: CreatorService, private titleService: Title, private router: Router) { }

  deleteCreator(id: bigint) {
    this.creatorService.deleteCreator(id).subscribe(
      () => {
        this.ngOnInit(); //Refreshes the page
        this.router.navigateByUrl("/admin/creatorlist");
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.titleService.setTitle("List of Dungeons");
    this.creatorService.getAllCreators().subscribe(data => {
      this.creator = data;
    });
  }

  sortby(field: string) {
    if (field == "id") {
      this.creator.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    } else if (field == "coins") {
      this.creator.sort((a, b) => (a.coins > b.coins) ? 1 : ((b.coins > a.coins) ? -1 : 0));
    } else if (field == "maxdims") {
      this.creator.sort((a, b) => (a.maxdims > b.maxdims) ? 1 : ((b.maxdims > a.maxdims) ? -1 : 0));
    } 
  }
}
