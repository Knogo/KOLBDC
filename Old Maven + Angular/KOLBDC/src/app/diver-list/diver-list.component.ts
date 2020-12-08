import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Diver } from '../diver';
import { DiverService } from '../diver.service';

@Component({
  selector: 'app-diver-list',
  templateUrl: './diver-list.component.html',
  styleUrls: ['./diver-list.component.css']
})
export class DiverListComponent implements OnInit {

  diver: Diver[];

  constructor(private diverService: DiverService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("List of Divers");
    this.diverService.getAllDivers().subscribe(data => {
      this.diver = data
    });
  }

  
}
