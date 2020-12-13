import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Diver } from 'src/app/classes/diver';
import { DiverService } from 'src/app/classes/diver.service';

@Component({
  selector: 'app-diver-list',
  templateUrl: './diver-list.component.html',
  styleUrls: ['./diver-list.component.css']
})
export class DiverListComponent implements OnInit {
  diver: Diver[];

  constructor(private diverService: DiverService, private titleService: Title, private router: Router) { }

  deleteDiver(id: number) {
    this.diverService.deleteDiver(id).subscribe(
      () => {
        this.ngOnInit(); //Refreshes the page
        this.router.navigateByUrl("/admin/diverlist");
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.titleService.setTitle("List of Divers");
    this.diverService.getAllDivers().subscribe(data => {
      this.diver = data;
    });
  }

  sortby(field: string) {
    if (field == "id") {
      this.diver.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    } else if (field == "coins") {
      this.diver.sort((a, b) => (a.coins > b.coins) ? 1 : ((b.coins > a.coins) ? -1 : 0));
    } else if (field == "vision") {
      this.diver.sort((a, b) => (a.vision > b.vision) ? 1 : ((b.vision > a.vision) ? -1 : 0));
    } else if (field == "keys") {
      this.diver.sort((a, b) => (a.keys > b.keys) ? 1 : ((b.keys > a.keys) ? -1 : 0));
    }
  }
}
